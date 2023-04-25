import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';
import { getBotToken } from 'nestjs-telegraf';
import { WEBHOOK_CALLBACK } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(WEBHOOK_CALLBACK));

  await app.listen(3000).catch((error) => console.error(error));
}

bootstrap();
