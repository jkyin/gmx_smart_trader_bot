import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GMXModule } from './gmx.house/gmx.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Telegraf } from 'telegraf';
import { BNModule } from './binance/binance.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const launchOptions = Boolean(configService.get<boolean>('LOCAL_TEST'))
          ? undefined
          : {
              webhook: {
                domain: `${configService.get<string>('WEBHOOK_DOMAIN')}`,
                hookPath: `${configService.get<string>('WEBHOOK_PATH')}`,
              },
            };

        return {
          token: `${configService.get<string>('TELEGRAM_BOT_TOKEN')}`,
          launchOptions: launchOptions,
        };
      },
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
