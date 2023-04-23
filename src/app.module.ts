import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GMXModule } from './gmx.house/gmx.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Telegraf } from 'telegraf';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: `${process.env.TELEGRAM_BOT_TOKEN}`,
    }),
    GMXModule,
  ],
  controllers: [AppController],
  providers: [AppService, Telegraf],
})
export class AppModule {}
