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
import { BNModule } from './binance/binance.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';

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
            domain: `${configService.get<string>('WEBHOOK_DOMAIN')}`,
            hookPath: `${configService.get<string>('WEBHOOK_PATH')}`,
          },
        },
      }),
      inject: [ConfigService],
    }),
    GMXModule,
    BNModule,
    TerminusModule,
    HealthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, Telegraf],
})
export class AppModule {}
