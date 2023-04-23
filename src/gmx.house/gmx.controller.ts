import { Controller, Get } from '@nestjs/common';
import { GMXService } from './gmx.service';

@Controller('gmx')
export class GMXController {
  constructor(private readonly service: GMXService) {}

  @Get('currentWatching')
  async currentWatching() {
    return JSON.stringify(await this.service.currentWatching());
  }
}
