import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GMXModule } from './gmx.house/gmx.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Telegraf } from 'telegraf';
import { LoggerModule } from './logger/logger.module';
import { WEBHOOK_CALLBACK } from './common/constants';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: `${configService.get<string>('TELEGRAM_BOT_TOKEN')}`,
        launchOptions: {
          webhook: {
            domain: 'domain.tld',
            hookPath: WEBHOOK_CALLBACK,
          },
        },
      }),
      inject: [ConfigService],
    }),
    GMXModule,
  ],
  controllers: [AppController],
  providers: [AppService, Telegraf],
})
export class AppModule {}
