import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { BNService } from './binance-usdm-trade.service';

@Injectable()
export class BinanceHealthIndicator extends HealthIndicator {
  constructor(private bnService: BNService) {
    super();
  }

  async checkAPIValid(): Promise<HealthIndicatorResult> {
    try {
      await this.bnService.getMultiAssetsMode();
      return this.getStatus('binance-future-api', true, { isProd: process.env.PROD });
    } catch (error) {
      if (error instanceof Error) {
        return this.getStatus('binance-future-api', false, { message: error.message, isProd: process.env.PROD });
      } else {
        return this.getStatus('binance-future-api', false, { message: JSON.stringify(error), isProd: process.env.PROD });
      }
    }
  }
}
