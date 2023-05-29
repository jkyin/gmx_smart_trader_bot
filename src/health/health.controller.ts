import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { BinanceHealthIndicator } from '../binance/binance.health';
import winston from 'winston';
import { createWinstonLogger } from 'src/common/winston-config.service';

@Controller('health')
export class HealthController {
  private logger: winston.Logger;

  constructor(private health: HealthCheckService, private http: HttpHealthIndicator, private binance: BinanceHealthIndicator) {
    this.logger = createWinstonLogger({ service: HealthController.name });
  }

  @Get()
  @HealthCheck()
  check() {
    try {
      return this.health.check([() => this.binance.checkAPIValid()]);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
