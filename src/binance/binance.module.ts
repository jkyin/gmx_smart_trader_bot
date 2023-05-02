import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BNService } from './binance-usdm-trade.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule],
  providers: [BNService],
  exports: [BNService],
})
export class BNModule {}
