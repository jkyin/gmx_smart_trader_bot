import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { USDMClient, FuturesPosition, NewFuturesOrderParams, SetLeverageParams, SymbolPrice } from 'binance';
import { PAIR_OF_INTEREST } from './binance.constants';
import { Logger } from 'src/logger/logger.service';
import BigNumber from 'bignumber.js';
import { Cron } from '@nestjs/schedule';
import * as _ from 'lodash';

@Injectable()
export class BNService {
  private _pairMarketPrice: { [key: string]: BigNumber } = {};
  private usdmClient: USDMClient;

  private _allPositions: FuturesPosition[];

  constructor(private configService: ConfigService, private logger: Logger) {
    this.usdmClient = new USDMClient(
      {
        api_key: configService.get<string>('TEST_BINANCE_FUTURE_API_KEY'),
        // eslint-disable-next-line prettier/prettier
        api_secret: configService.get<string>('TEST_BINANCE_FUTURE_API_SCERET'),
        beautifyResponses: true,
      },
      {},
      true,
    );
  }

  get pairMarketPrice() {
    return this._pairMarketPrice;
  }

  get allPositions() {
    return this._allPositions;
  }

  @Cron('* * * * * *')
  private async getPairsMarketPrice() {
    const prices = PAIR_OF_INTEREST.map((pair) => {
      return this.usdmClient.getSymbolPriceTicker({
        symbol: pair,
      }) as Promise<SymbolPrice>;
    });

    const result = await Promise.allSettled(prices);
    result.forEach((settled) => {
      if (settled.status == 'fulfilled') {
        const value = settled.value;
        this._pairMarketPrice[value.symbol] = BigNumber(value.price);
      }
    });
  }

  // quality * market = usd * leverage
  // 1 * 40000 = 20000 * 2
  // quality = usd * leverage / market
  getQualityFrom(usdt: BigNumber, leverage: BigNumber, entryPrice: BigNumber) {
    return usdt.multipliedBy(leverage).dividedBy(entryPrice);
  }

  getUSDTPairOfInterestFromSymbol(symbol: string) {
    return PAIR_OF_INTEREST.filter((p) => p.includes(symbol));
  }

  async getActiveFuturePositionInfo(pair: string) {
    const positions = await this.getActiveFuturesPositions();
    const result = _.head(positions.filter((p) => p.symbol === pair));
    return result;
  }

  async getActiveFuturesPositions() {
    const list = await this.usdmClient.getPositions();
    const result = list.filter((p) => PAIR_OF_INTEREST.includes(p.symbol) && p.positionAmt != 0);
    this._allPositions = result;
    return result;
  }

  async setLeverage(pair: string, leverage: number) {
    const params: SetLeverageParams = {
      symbol: pair,
      leverage: leverage,
    };
    return await this.usdmClient.setLeverage(params);
  }

  async openPosition(pair: string, quantity: number, isLong: boolean) {
    return this.increasePosition(pair, quantity, isLong);
  }

  async increasePosition(pair: string, quantity: number, isLong: boolean) {
    if (pair.length == 0) {
      return new Error(`参数错误： 没有 pair ${pair}`);
    }

    const params: NewFuturesOrderParams = {
      symbol: pair,
      side: isLong ? 'BUY' : 'SELL',
      quantity: Math.abs(quantity),
      type: 'MARKET',
    };

    this.logger.debug(`加/开仓： ${params}`);

    const result = await this.usdmClient.submitNewOrder(params);
    return result;
  }

  async decreasePosition(pair: string, quantity: number, isLong: boolean) {
    if (pair.length == 0) {
      return new Error(`参数错误： 没有 pair ${pair}`);
    }

    const position = await this.getActiveFuturePositionInfo(pair);

    if (!position) {
      this.logger.debug(`没有 ${pair} 仓位，跳过。`);
      return;
    }

    const params: NewFuturesOrderParams = {
      symbol: pair,
      side: isLong ? 'SELL' : 'BUY',
      quantity: Math.abs(quantity),
      type: 'MARKET',
    };

    this.logger.debug(`减仓： ${params}`);

    const result = await this.usdmClient.submitNewOrder(params);
    return result;
  }

  async closePosition(pair: string) {
    if (pair.length == 0) {
      return new Error(`参数错误： 没有 pair ${pair}`);
    }

    const position = await this.getActiveFuturePositionInfo(pair);

    if (!position) {
      this.logger.debug(`${pair} 仓位已平仓，跳过。`);
      return;
    }

    const params: NewFuturesOrderParams = {
      symbol: position.symbol,
      side: Number(position.positionAmt) < 0 ? 'BUY' : 'SELL',
      quantity: Math.abs(Number(position.positionAmt)),
      type: 'MARKET',
    };
    const result = await this.usdmClient.submitNewOrder(params);
    return result;
  }

  async closeAllPosition() {
    const positions = await this.getActiveFuturesPositions();

    if (positions.length == 0) {
      this.logger.debug(`没有仓位，跳过。`);
      return;
    }

    const orders = positions.map((position) => {
      const params: NewFuturesOrderParams = {
        symbol: position.symbol,
        side: Number(position.positionAmt) < 0 ? 'BUY' : 'SELL',
        quantity: Math.abs(Number(position.positionAmt)),
        type: 'MARKET',
      };

      return this.usdmClient.submitNewOrder(params);
    });

    return Promise.allSettled(orders);
  }
}
