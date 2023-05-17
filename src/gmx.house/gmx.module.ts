import { Logger, Module } from '@nestjs/common';
import { GMXController } from './gmx.controller';
import { GMXService } from './gmx.service';
import { ConfigModule } from '@nestjs/config';
import { GMXContractService } from './gmx-contract.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GMXController],
  providers: [Logger, GMXService, GMXContractService],
  exports: [GMXService],
})
export class GMXModule {}
