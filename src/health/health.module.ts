import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { BNModule } from 'src/binance/binance.module';

@Module({
  imports: [TerminusModule, HttpModule, BNModule],
  controllers: [HealthController],
})
export class HealthModule {}
