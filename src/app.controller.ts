import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hi')
  getHi(): string {
    return 'We will be rich. WAGMI.';
  }
}
