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

  @Get('positions')
  async getPositions() {
    return await this.service.getActivePositions();
  }

  @Get('actions')
  async getActions() {
    const actions = await this.contract.getInterestedTradeActions();
    return actions;
  }
}
