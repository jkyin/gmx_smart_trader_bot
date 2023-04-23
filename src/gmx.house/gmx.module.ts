import { Module } from '@nestjs/common';
import { GMXController } from './gmx.controller';
import { GMXService } from './gmx.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [GMXController],
  providers: [GMXService],
  exports: [GMXService],
})
export class GMXModule {}
