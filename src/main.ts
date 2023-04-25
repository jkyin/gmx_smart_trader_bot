import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './logger/logger.service';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const port = process.env.PORT;
  const webhookPath = process.env.WEBHOOK_PATH;

  if (!port) {
    throw new Error('No port.');
  }

  if (!webhookPath) {
    throw new Error('No webhook path.');
  }

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(webhookPath));

  await app.listen(port).catch((error) => console.error(error));
}

bootstrap();
