import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { USDMClient, FuturesPosition, NewFuturesOrderParams, SetLeverageParams, SymbolPrice } from 'binance';
import { SOI } from './binance.constants';
import { Logger } from 'src/logger/logger.service';
import BigNumber from 'bignumber.js';
import { Cron } from '@nestjs/schedule';

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
    const prices = SOI.map((pair) => {
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

  async didOpenPosition(symbol: string) {
    const positions = await this.getFuturesPositions();
    const result = positions.filter((p) => p.symbol.includes(symbol));
    return result.length > 0;
  }

  async getFuturesPositions() {
    const list = await this.usdmClient.getPositions();
    const result = list.filter((p) => SOI.includes(p.symbol));
    this._allPositions = result;
    return result;
  }

  async setLeverage(symbol: string, leverage: number) {
    const params: SetLeverageParams = {
      symbol: symbol,
      leverage: leverage,
    };
    return await this.usdmClient.setLeverage(params);
  }

  async openPosition(symbol: string, quantity: number, isLong: boolean) {
    return this.increasePosition(symbol, quantity, isLong);
  }

  async increasePosition(symbol: string, quantity: number, isLong: boolean) {
    if (symbol.length == 0) {
      return new Error(`参数错误： 没有 symbol ${symbol}`);
    }

    const params: NewFuturesOrderParams = {
      symbol: symbol,
      side: isLong ? 'BUY' : 'SELL',
      quantity: Math.abs(quantity),
      type: 'MARKET',
    };

    this.logger.debug(`加/开仓： ${params}`);

    const result = await this.usdmClient.submitNewOrder(params);
    return result;
  }

  async decreasePosition(symbol: string, quantity: number, isLong: boolean) {
    if (symbol.length == 0) {
      return new Error(`参数错误： 没有 symbol ${symbol}`);
    }

    const position = (await this.getFuturesPositions()).filter((p) => p.symbol === symbol)[0];

    if (!position) {
      this.logger.debug(`没有 ${symbol} 仓位，跳过。`);
      return;
    }

    const params: NewFuturesOrderParams = {
      symbol: symbol,
      side: isLong ? 'SELL' : 'BUY',
      quantity: Math.abs(quantity),
      type: 'MARKET',
    };

    this.logger.debug(`减仓： ${params}`);

    const result = await this.usdmClient.submitNewOrder(params);
    return result;
  }

  async closePosition(symbol: string) {
    if (symbol.length == 0) {
      return new Error(`参数错误： 没有 symbol ${symbol}`);
    }

    const position = (await this.getFuturesPositions()).filter((p) => p.symbol === symbol)[0];

    if (!position) {
      this.logger.debug(`${symbol} 仓位已平仓，跳过。`);
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
    const positions = (await this.getFuturesPositions()).filter((p) => p.positionAmt != 0);

    if (positions.length == 0) {
      this.logger.debug(`仓位已全部平仓，跳过。`);
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
