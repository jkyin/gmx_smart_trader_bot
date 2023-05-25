import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from './common/winston-config.service';

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';
  const logger = createWinstonLogger();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const webhookPath = configService.get<string>('WEBHOOK_PATH');
  const port = configService.get<number>('PORT');

  if (!webhookPath) {
    throw new Error('no webhookPath env.');
  }

  if (!port) {
    throw new Error('no port env.');
  }

  const bot = app.get(getBotToken());
  app.use(bot.webhookCallback(webhookPath));

  await app.listen(port).catch((error) => logger.error(error));
}

bootstrap();
