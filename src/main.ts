import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';
import { getBotToken } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const webhookPath = configService.get<string>('WEBHOOK_PATH');
  const port = configService.get<number>('PORT');
  const tg = configService.get<string>('TELEGRAM_BOT_TOKEN');

  if (!webhookPath) {
    throw new Error('no webhookPath env.');
  }

  if (!port) {
    throw new Error('no port env.');
  }

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(webhookPath));

  await app.listen(port).catch((error) => console.error(error));
}

bootstrap();
