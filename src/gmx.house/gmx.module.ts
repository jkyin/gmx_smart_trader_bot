import { Module } from '@nestjs/common';
import { GMXController } from './gmx.controller';
import { GMXService } from './gmx.service';
import { LoggerModule } from 'src/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { GMXContractService } from './gmx-contract.service';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule],
  controllers: [GMXController],
  providers: [GMXService, GMXContractService],
  exports: [GMXService],
})
export class GMXModule {}
