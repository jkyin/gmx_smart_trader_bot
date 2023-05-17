import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BNService } from './binance-usdm-trade.service';
import { BinanceHealthIndicator } from './binance.health';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [Logger, BNService, BinanceHealthIndicator],
  exports: [BNService, BinanceHealthIndicator],
})
export class BNModule {}
