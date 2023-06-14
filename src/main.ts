import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from './common/winston-config.service';
import BigNumber from 'bignumber.js';
import axios from 'axios';

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
  axios.defaults.timeout = 6000;
  axios.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      logger.error(error);
      return Promise.reject(error);
    },
  );

  if (localTest) {
    axios.defaults.proxy = {
      protocol: 'http',
      host: '127.0.0.1',
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
