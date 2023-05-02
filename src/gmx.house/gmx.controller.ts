import { Controller, Get } from '@nestjs/common';
import { GMXService } from './gmx.service';

@Controller('gmx')
export class GMXController {
  constructor(private readonly service: GMXService) {}

  @Get('watchingInfo')
  getCurrentWatching() {
    return this.service.watchingInfo ?? {};
  }

  @Get('livePositions')
  getLivePositions() {
    return this.service.activeTrades ?? {};
  }
}
