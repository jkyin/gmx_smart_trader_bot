import winston from 'winston';

const { combine, timestamp, json, colorize, align, printf, ms, errors } = winston.format;
const { Console, File } = winston.transports;

export function createWinstonLogger(options?: object): winston.Logger {
  const logger = winston.createLogger(createWinstonOptions());
  return options ? logger.child(options) : logger;
}

function createWinstonOptions(): winston.LoggerOptions {
  const console = new Console({
    level: 'info',
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      ms(),
      align(),
      errors({ stack: true }),
      printf((info) => {
        if (typeof info.service === 'string') {
          const service = info.service;

          if (info.stack) {
            return `[${info.timestamp}] [${service}] ${info.level}: ${info.message} \n ${info.stack}`;
          }

          return `[${info.timestamp}] [${service}] ${info.level}: ${info.message}`;
        } else {
          if (info.stack) {
            return `[${info.timestamp}] ${info.level}: ${info.message} \n ${info.stack}`;
          }

          return `[${info.timestamp}] ${info.level}: ${info.message}`;
        }
      }),
    ),
  });

  const error = new File({
    filename: 'logs/error.log',
    level: 'error',
    format: combine(json()),
  });
  const combined = new File({
    level: 'debug',
    filename: 'logs/combined.log',
    format: combine(json()),
  });

  return {
    format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), json()),
    transports: [console, error, combined],
    exceptionHandlers: [new File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new File({ filename: 'logs/rejections.log' })],
  };
}
