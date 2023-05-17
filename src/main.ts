import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

async function bootstrap() {
  process.env.TZ = 'Asia/Shanghai';

  const logger = configLogger()
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

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

  await app.listen(port).catch((error) => logger.error(error));
}

bootstrap();

function configLogger() {
  const console = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('GMX-Bot', {
        colors: true,
        prettyPrint: true,
      }),
    ),
  });

  const error = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('GMX-Bot', {
        prettyPrint: true,
      }),
    ),
  });
  const combined = new winston.transports.File({
    filename: 'logs/combined.log',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('GMX-Bot', {
        prettyPrint: true,
      }),
    ),
  });
  const logger = WinstonModule.createLogger({
    // options (same as WinstonModule.forRoot() options)
    transports: [console, error, combined],
    exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
  });
  return logger;
}
