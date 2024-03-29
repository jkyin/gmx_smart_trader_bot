import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from './common/winston-config.service';
import BigNumber from 'bignumber.js';
import client from './common/http-client';

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';
  const logger = createWinstonLogger();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const webhookPath = configService.get<string>('WEBHOOK_PATH');
  const port = configService.get<number>('PORT');
  const localTest = Boolean(configService.get<boolean>('LOCAL_TEST'));

  if (!webhookPath) {
    throw new Error('no webhookPath env.');
  }

  if (!port) {
    throw new Error('no port env.');
  }

  BigNumber.set({ EXPONENTIAL_AT: 1e9 });

  if (localTest) {
    client.defaults.proxy = {
      protocol: 'http',
      host: '0.0.0.0',
      port: 9091,
    };
  }

  const bot = app.get(getBotToken());

  if (!localTest) {
    app.use(bot.webhookCallback(webhookPath));
  }

  await app.listen(port).catch((error) => logger.error(error));
}

bootstrap();
