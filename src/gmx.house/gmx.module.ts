import { Logger, Module } from '@nestjs/common';
import { GMXWSController } from './gmx.controller';
import { GMXWSService } from './gmx.service';

@Module({
  controllers: [GMXWSController],
  providers: [GMXWSService, Logger],
  exports: [GMXWSService],
})
export class GMXWSModule {}
