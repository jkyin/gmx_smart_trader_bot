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
      return this.getStatus('binance-future-api', false, { message: (error as Error).message, isProd: process.env.PROD });
    }
  }
}
