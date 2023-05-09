import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { BinanceHealthIndicator } from '../binance/binance.health';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator, private binance: BinanceHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('gmx-endpoint', 'https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum'),
      () => this.binance.checkAPIValid(),
    ]);
  }
}
