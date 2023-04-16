import { Controller, Get } from '@nestjs/common';
import { GMXWSService } from './gmx.service';

@Controller('gmx')
export class GMXWSController {
  constructor(private readonly service: GMXWSService) {}

  @Get('status')
  status() {
    return this.service.checkStatus();
  }
}
