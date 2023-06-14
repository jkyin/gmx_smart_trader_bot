import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { ReaderV2, ReaderV2__factory } from './contracts/types';
import winston from 'winston';
import { createWinstonLogger } from 'src/common/winston-config.service';
import { getTokens, getWhitelistedTokens } from './tokens/tokens';
import { ARBITRUM } from './config/chains';
import { getContract } from './config/contracts';
import { getPositionQuery, getPositions } from './config/exchange';
import { InfoTokens, PositionQuery, TradeAction, TradeActionDeal, TradeActionParams } from './types';
import { useInfoTokens } from './tokens/useInfoTokens';
import { bigNumberify, bigNumberifyArray, formatAmount } from './wallets/numbers';
import { getServerUrl } from './config/backend';
import axios from 'axios';
import { getTokenInfo } from './tokens/utils';
import { USD_DECIMALS } from './config/legacy';
import { dayjs } from 'src/common/day';

@Injectable()
export class GMXContractService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  positions: any[] | undefined = undefined;

  private chainId = ARBITRUM;
  private logger: winston.Logger;

  private readerV2Contract: ReaderV2;

  private provider: ethers.AlchemyProvider;

  constructor(private config: ConfigService) {
    this.logger = createWinstonLogger({ service: GMXContractService.name });
    const apiKey = config.get<string>('ALCHEMY_API_KEY');
    if (!apiKey) {
      throw new Error('no ethers alchemy api key.');
    }

    this.provider = new ethers.AlchemyProvider(ARBITRUM, apiKey);

    this.readerV2Contract = ReaderV2__factory.connect('0x22199a49A999c351eF7927602CFB187ec3cae489', this.provider);
  }

  async getInterestedTradeActions() {
    const account = '0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66';
    const actionsUrl = getServerUrl(this.chainId, `/actions?account=${account}`);
    const response = await axios.get<TradeAction[]>(actionsUrl);

    if (response.statusText != 'OK') {
      this.logger.error(response);
      return [];
    }

    const result = response.data.filter((trade) => {
      const tradeData = trade.data;
      const timeout = 60;
      const date = dayjs.unix(Number(trade.data.timestamp));
      const diffInSeconds = dayjs().diff(date, 'second');

      const didTimeout = Math.abs(diffInSeconds) > timeout;
      const validAction =
        tradeData.action === 'IncreasePosition-Long' ||
        tradeData.action === 'IncreasePosition-Short' ||
        tradeData.action === 'DecreasePosition-Long' ||
        tradeData.action === 'DecreasePosition-Short' ||
        tradeData.action === 'LiquidatePosition-Long' ||
        tradeData.action === 'LiquidatePosition-Short';
      return !didTimeout && validAction;
    });

    return result;
  }

  async dealTradeAction(trade: TradeAction): Promise<TradeActionDeal | undefined> {
    const account = trade.data.account;
    const chainId = this.chainId;
    const tradeData = trade.data;
    const params = JSON.parse(tradeData.params) as TradeActionParams;
    const longOrShortText = params?.isLong ? `Long` : `Short`;
    const isLong = params?.isLong == true;
    const price = formatAmount(params.price, USD_DECIMALS, 2, false);
    const nativeTokenAddress = getContract(chainId, 'NATIVE_TOKEN');

    const { positions, infoTokens } = await this.getAccountPosition(account);

    const indexToken = getTokenInfo(infoTokens, params.indexToken, true, nativeTokenAddress);

    if (!indexToken) {
      throw new Error(`trade (id: ${trade.id}) data no indexToken`);
    }

    const symbol = indexToken.symbol;

    // 开仓/加仓
    if (tradeData.action === 'IncreasePosition-Long' || tradeData.action === 'IncreasePosition-Short') {
      if (bigNumberify(params.sizeDelta).eq(0)) {
        const msg = `Deposit ${formatAmount(params.collateralDelta, USD_DECIMALS, 2, true)} USD into ${indexToken.symbol} ${longOrShortText}`;
        this.logger.info(msg);
        return;
      }

      const position = positions.find((p) => p.indexToken.symbol === indexToken.symbol);
      const leverage = formatAmount(position.leverage, 4, 2, false);
      const margin = formatAmount(params.collateralDelta, USD_DECIMALS, 0, false);
      const relativeTimeText = dayjs.unix(Number(trade.data.timestamp)).fromNow();
      const timestampText = dayjs.tz(Number(trade.data.timestamp) * 1000, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

      this.logger.info(
        // eslint-disable-next-line max-len
        `${symbol} 开仓/加仓， 保证金: ${margin}, 杠杆: ${leverage}, 方向： ${longOrShortText}， GMX 当前价格： ${price} USD, 交易时间： ${timestampText} (${relativeTimeText})`,
      );

      return {
        symbol: symbol,
        isLong: isLong,
        leverage: bigNumberify(leverage),
        margin: bigNumberify(margin),
        price: price,
        status: 'Increase',
      };
    }

    // 减仓/平仓
    if (tradeData.action === 'DecreasePosition-Long' || tradeData.action === 'DecreasePosition-Short') {
      if (bigNumberify(params.sizeDelta).eq(0)) {
        const msg = `Withdraw ${formatAmount(params.collateralDelta, USD_DECIMALS, 2, true)} USD from ${indexToken.symbol} ${longOrShortText}`;
        this.logger.info(msg);
        return;
      }

      if (bigNumberify(params.collateralDelta).eq(0)) {
        const msg = `${symbol}: ${longOrShortText} 仓位已关闭, GMX 当前价格： ${formatAmount(params.price, USD_DECIMALS, 2, true)} USD`;
        this.logger.info(msg);

        return {
          symbol: symbol,
          isLong: isLong,
          price: price,
          status: 'Closed',
        };
      }

      const isLiquidation = params.flags?.isLiquidation == true;

      const actionDisplay = isLiquidation ? `部分爆仓` : `减仓`;
      const msg = `${actionDisplay} ${indexToken.symbol} ${longOrShortText}, -${formatAmount(params.sizeDelta, USD_DECIMALS, 2, true)} USD, ${
        indexToken.symbol
      } Price: ${formatAmount(params.price, USD_DECIMALS, 2, true)} USD
    `;

      this.logger.info(msg);

      return {
        symbol: symbol,
        isLong: isLong,
        price: price,
        status: 'Decrease',
      };
    }

    // 爆仓清算
    if (tradeData.action === 'LiquidatePosition-Long' || tradeData.action === 'LiquidatePosition-Short') {
      const msg = `${indexToken.symbol} ${longOrShortText} 已爆仓, -${formatAmount(params.sizeDelta, USD_DECIMALS, 2, true)} USD, ${
        indexToken.symbol
      } Price: ${formatAmount(params.price, USD_DECIMALS, 2, true)} USD
    `;

      this.logger.info(msg);

      return {
        symbol: symbol,
        isLong: isLong,
        price: price,
        status: 'Liquidated',
      };
    }
  }

  // 获取目标账户的开仓信息
  async getAccountPosition(account: ethers.AddressLike): Promise<{ positions: any[]; infoTokens: InfoTokens }> {
    try {
      let checkSummedAccount = '';
      if (ethers.isAddress(account)) {
        checkSummedAccount = ethers.getAddress(account);
      }

      const chainId = this.chainId;
      const positionQuery = this.contractGetPositionQuery(chainId);
      const positionData = await this.contractGetPositions(chainId, positionQuery, account);
      const fundingRateInfo = await this.contractGetFundingRates(chainId);
      const tokenBalances = await this.contractGetTokenBalances(chainId, account);
      const { infoTokens } = await useInfoTokens(this.provider, chainId, false, bigNumberifyArray(tokenBalances), bigNumberifyArray(fundingRateInfo));

      const savedIsPnlInLeverage = false;
      const savedShowPnlAfterFees = true;

      const { positions, positionsMap } = getPositions(
        chainId,
        positionQuery,
        positionData,
        infoTokens,
        savedIsPnlInLeverage,
        savedShowPnlAfterFees,
        checkSummedAccount,
        undefined,
        undefined,
      );

      this.positions = positions;

      this.logger.info(`Trader GMX 仓位数量: ${positions.length}`, positions);
      return { positions: positions, infoTokens: infoTokens };
      // 在这里处理返回的开仓信息
    } catch (error) {
      this.logger.error('获取开仓信息时出错:', error);
      throw error;
    }
  }

  private async contractGetTokenBalances(chainId: number, account: ethers.AddressLike) {
    const tokens = getTokens(chainId);
    const tokenAddresses = tokens.map((token) => token.address);
    const tokenBalances = await this.readerV2Contract.getTokenBalances(account, tokenAddresses);
    return tokenBalances;
  }

  private contractGetPositionQuery(chainId: number) {
    const nativeTokenAddress = getContract(chainId, 'NATIVE_TOKEN');
    const whitelistedTokens = getWhitelistedTokens(chainId);
    const positionQuery = getPositionQuery(whitelistedTokens, nativeTokenAddress);
    return positionQuery;
  }

  private async contractGetFundingRates(chainId: number) {
    const vaultAddress = getContract(chainId, 'Vault');
    const nativeTokenAddress = getContract(chainId, 'NATIVE_TOKEN');
    const whitelistedTokens = getWhitelistedTokens(chainId);
    const whitelistedTokenAddresses = whitelistedTokens.map((token) => token.address);
    const fundingRateInfo = await this.readerV2Contract.getFundingRates(vaultAddress, nativeTokenAddress, whitelistedTokenAddresses);
    return fundingRateInfo;
  }

  private async contractGetPositions(chainId: number, positionQuery: PositionQuery, account: ethers.AddressLike) {
    const vaultAddress = getContract(chainId, 'Vault');
    const collateralTokens = positionQuery.collateralTokens;
    const indexTokens = positionQuery.indexTokens;
    const isLong = positionQuery.isLong;
    const positionData = await this.readerV2Contract.getPositions(vaultAddress, account, collateralTokens, indexTokens, isLong);
    return positionData;
  }
}
