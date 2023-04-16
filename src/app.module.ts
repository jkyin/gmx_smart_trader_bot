import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { GMXWSModule } from './gmx.house/gmx.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: `${process.env.TELEGRAM_BOT_TOKEN}`,
    }),
    GMXWSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
