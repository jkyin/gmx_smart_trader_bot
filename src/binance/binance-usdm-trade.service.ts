import { Injectable } from '@nestjs/common';
import {
  USDMClient,
  NewFuturesOrderParams,
  SetLeverageParams,
  SymbolPrice,
  FuturesSymbolExchangeInfo,
  FuturesAccountBalance,
  SetMarginTypeParams,
  MarginType,
} from 'binance';
import { PAIR_OF_INTEREST } from './binance.constants';
import BigNumber from 'bignumber.js';
import { Cron } from '@nestjs/schedule';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import { createWinstonLogger } from 'src/common/winston-config.service';

@Injectable()
export class BNService {
  private logger: winston.Logger;

  private _usdtBalance: FuturesAccountBalance | undefined;
  private _pairMarketPriceStore: { [key: string]: BigNumber } = {};
  private _pairExchangeInfoStore: FuturesSymbolExchangeInfo[] = [];

  private client: USDMClient;

  constructor(private configService: ConfigService) {
    this.logger = createWinstonLogger({ service: BNService.name });

    const apiKey = configService.get<string>('BINANCE_FUTURE_API_KEY');
    const apiSecret = configService.get<string>('BINANCE_FUTURE_API_SCERET');
    const isProd = configService.get<string>('PROD') === 'true';
    const useTestnet = isProd ? false : true;

    this.logger.info(`当前 binance 环境为 ${useTestnet ? 'testnet' : '正式服'}`, { useTestnet });

    if (!apiKey) {
      throw new Error('no binance api key env');
    }

    if (!apiSecret) {
      throw new Error('no binance api secret env');
    }

    this.client = new USDMClient(
      {
        api_key: apiKey,
        api_secret: apiSecret,
        beautifyResponses: true,
      },
      {},
      useTestnet,
    );

    this.getFuturesPositions(true);
  }

  async usdtBalance() {
    if (this._usdtBalance === undefined) {
      await this.fetchUSDTBalance();
    }
    return this._usdtBalance;
  }

  async pairMarketPrice() {
    if (Object.keys(this._pairMarketPriceStore).length === 0) {
      await this.getPairsMarketPrice();
    }

    return this._pairMarketPriceStore;
  }

  // 立马执行，然后每2秒间隔。
  @Cron('2 * * * *')
  private async fetchUSDTBalance() {
    try {
      const result = await this.client.getBalance();
      const balance = _.find(result, { asset: 'USDT' });
      this._usdtBalance = balance;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getMultiAssetsMode() {
    return await this.client.getMultiAssetsMode();
  }

  // 立马执行，然后每秒间隔。
  @Cron('* * * * *')
  private async getPairsMarketPrice() {
    try {
      const prices = PAIR_OF_INTEREST.map((pair) => {
        return this.client.getSymbolPriceTicker({
          symbol: pair,
        }) as Promise<SymbolPrice>;
      });

      const result = await Promise.allSettled(prices);
      result.forEach((settled) => {
        if (settled.status == 'fulfilled') {
          const value = settled.value;
          this._pairMarketPriceStore[value.symbol] = BigNumber(value.price);
        }
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  // 立马执行，然后每小时间隔。
  @Cron('* */1 * * *')
  private async getExchangeInfo() {
    try {
      const exchangeInfo = await this.client.getExchangeInfo();
      this._pairExchangeInfoStore = exchangeInfo.symbols;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getQuantityPrecision(symbol: string, quoteAsset = 'USDT') {
    if (this._pairExchangeInfoStore.length == 0) {
      await this.getExchangeInfo();
    }

    const pair = this.getPairOfInterestFromSymbol(symbol, quoteAsset);
    const info = this._pairExchangeInfoStore.find((item) => item.symbol === pair);
    const precision = info?.quantityPrecision;
    if (precision === undefined) {
      throw new Error(`no ${pair} quantityPrecision found`);
    }

    return precision;
  }

  async getQuotePrecision(symbol: string, quoteAsset = 'USDT') {
    if (this._pairExchangeInfoStore.length == 0) {
      await this.getExchangeInfo();
    }

    const pair = this.getPairOfInterestFromSymbol(symbol, quoteAsset);
    const info = this._pairExchangeInfoStore.find((item) => item.symbol === pair);
    const precision = info?.quotePrecision;
    if (precision === undefined) {
      throw new Error(`no ${pair} quotePrecision found`);
    }

    return precision;
  }

  // Initial Margin = Quantity * Entry Price * IMR
  // IMR = 1 / leverage
  //
  // Quantity *  Entry Price = Initial Margin * leverage
  // 1 * 40000 = 20000 * 2
  // Quantity =  Initial Margin * leverage / Entry Price
  //
  // precision 一般来自 binance api 中的 /fapi/v1/exchangeInfo 中的 quantityPrecision。
  //           表示某个 symbol 最大支持的精度，如果下单时传入的 quantity 精度超过了要求，会报错误码 1111。
  async getQuantity(symbol: string, usdtMagin: BigNumber, leverage: BigNumber, entryPrice: BigNumber) {
    const precision = await this.getQuantityPrecision(symbol);
    return usdtMagin.multipliedBy(leverage).dividedBy(entryPrice).dp(precision);
  }

  // 计算目标杠杆倍数所需的保证金数量。
  // 目前只用于通过增加保证金，降低合约杠杆倍数。
  async getMarginAmount(symbol: string, price: BigNumber, quantity: BigNumber, targetLeverage: BigNumber) {
    const precision = await this.getQuotePrecision(symbol);
    return quantity.multipliedBy(price).dividedBy(targetLeverage).dp(precision);
  }

  getPairOfInterestFromSymbol(symbol: string, quoteAsset = 'USDT') {
    return _.head(PAIR_OF_INTEREST.filter((p) => p.includes(symbol + quoteAsset)));
  }

  // Max (0，min (isolatedWalletBalance, isolatedWalletBalance + size * (Mark Price - Entry Price) - Mark Price * abs(size) * IMR ))
  // isolatedWalletBalance 为逐仓仓位保证金 isolatedMargin
  // getMaxReduceMargin() {
  //   _.max(0， _min(isolatedWalletBalance, isolatedWalletBalance + size * (Mark Price - Entry Price) - Mark Price * abs(size) * IMR ))
  // }

  async getFuturePositionInfo(pair: string, isActive: boolean) {
    const positions = await this.getFuturesPositions(isActive);
    const result = _.head(positions.filter((p) => p.symbol === pair));
    return result;
  }

  async getFuturesPositions(isActive: boolean) {
    const list = await this.client.getPositions();
    const result = list.filter((p) => {
      if (isActive) {
        return PAIR_OF_INTEREST.includes(p.symbol) && p.positionAmt != 0;
      } else {
        return PAIR_OF_INTEREST.includes(p.symbol);
      }
    });

    return result;
  }

  async setLeverage(pair: string, leverage: number) {
    const params: SetLeverageParams = {
      symbol: pair,
      leverage: leverage,
    };
    return await this.client.setLeverage(params);
  }

  async setMarginType(pair: string, marginType: MarginType) {
    const params: SetMarginTypeParams = {
      symbol: pair,
      marginType: marginType,
    };
    return await this.client.setMarginType(params);
  }

  async openPosition(pair: string, quantity: BigNumber, isLong: boolean) {
    return await this.increasePosition(pair, quantity, isLong);
  }

  async increasePosition(pair: string, quantity: BigNumber, isLong: boolean) {
    if (pair.length == 0) {
      throw new Error(`参数错误： 没有 pair ${pair}`);
    }

    const params: NewFuturesOrderParams = {
      symbol: pair,
      side: isLong ? 'BUY' : 'SELL',
      quantity: quantity.absoluteValue().toNumber(),
      type: 'MARKET',
    };

    this.logger.info(`提交 ${pair} ${params.side} 订单`, { params: params });

    const result = await this.client.submitNewOrder(params);
    return result;
  }

  async decreasePosition(pair: string, quantity: BigNumber, isLong: boolean) {
    if (pair.length == 0) {
      throw new Error(`参数错误： 没有 pair ${pair}`);
    }

    const position = await this.getFuturePositionInfo(pair, true);

    if (!position) {
      this.logger.info(`想要减仓 ${pair} ，但没有建仓，跳过。`, { pair: pair });
      return;
    }

    const params: NewFuturesOrderParams = {
      symbol: pair,
      side: isLong ? 'SELL' : 'BUY',
      quantity: quantity.absoluteValue().toNumber(),
      type: 'MARKET',
    };

    this.logger.info(`提交减仓订单`, { params: params });

    const result = await this.client.submitNewOrder(params);
    return result;
  }

  async closePosition(pair: string) {
    if (pair.length == 0) {
      throw new Error(`参数错误： 没有 pair ${pair}`);
    }

    const position = await this.getFuturePositionInfo(pair, true);

    if (!position) {
      this.logger.info(`${pair} 仓位已平仓，跳过。`, { pair: pair });
      return;
    }

    const params: NewFuturesOrderParams = {
      symbol: position.symbol,
      side: Number(position.positionAmt) < 0 ? 'BUY' : 'SELL',
      quantity: BigNumber(position.positionAmt).absoluteValue().toNumber(),
      type: 'MARKET',
    };

    this.logger.info(`提交 ${pair} 平仓新订单`, { params: params });

    return await this.client.submitNewOrder(params);
  }

  async closeAllPosition() {
    const positions = await this.getFuturesPositions(true);

    if (positions.length == 0) {
      this.logger.info(`想要批量平仓，但没有所需仓位，跳过。`);
      return;
    }

    const orders = positions.map((position) => {
      const params: NewFuturesOrderParams<string> = {
        symbol: position.symbol,
        side: Number(position.positionAmt) < 0 ? 'BUY' : 'SELL',
        quantity: BigNumber(position.positionAmt).absoluteValue().toString(),
        type: 'MARKET',
      };
      return params;
    });

    this.logger.info(`提交批量平仓新订单`, { orders: orders });

    return await this.client.submitMultipleOrders(orders);
  }
}
