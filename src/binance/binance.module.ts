import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BNService } from './binance-usdm-trade.service';
import { LoggerModule } from 'src/logger/logger.module';
import { BinanceHealthIndicator } from './binance.health';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule],
  providers: [BNService, BinanceHealthIndicator],
  exports: [BNService, BinanceHealthIndicator],
})
export class BNModule {}
