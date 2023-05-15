import { Controller, Get } from '@nestjs/common';
import { GMXService } from './gmx.service';
import { GMXContractService } from './gmx-contract.service';

@Controller('gmx')
export class GMXController {
  constructor(private readonly service: GMXService, private readonly contract: GMXContractService) {}

  @Get('watchingInfo')
  getCurrentWatching() {
    return this.service.watchingInfo ?? {};
  }

  @Get('livePositions')
  getLivePositions() {
    return this.service.activeTrades ?? {};
  }

  @Get('positions')
  async getPositions() {
    return await this.contract.getAccountPosition('0x7b7736a2c07c4332ffad45a039d2117ae15e3f66');
  }
}
