import { Format } from 'logform';
import { format } from 'winston';
import { inspect } from 'util';
import { NestLikeConsoleFormatOptions } from 'nest-winston';

const clc = {
  bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const nestLikeColorScheme: Record<string, (text: string) => string> = {
  info: clc.green,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

const nestLikeConsoleFormat = (
  appName = 'NestWinston',
  options: NestLikeConsoleFormatOptions = {
    colors: !process.env.NO_COLOR,
    prettyPrint: false,
  },
): Format =>
  format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
    if ('undefined' !== typeof timestamp) {
      // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
      // that is not a valid date string will throw, just ignore it (it will be printed as-is).
      try {
        if (timestamp === new Date(timestamp).toISOString()) {
          timestamp = new Date(timestamp).toLocaleString();
        }
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
    }

    const color = (options.colors && nestLikeColorScheme[level]) || ((text: string): string => text);
    const yellow = options.colors ? clc.yellow : (text: string): string => text;

    const isObject = (value: any) => value !== null && typeof value === 'object';

    let module: string | undefined;
    let stringifiedMeta = JSON.stringify(meta);

    if (typeof context === 'string') {
      module = context;
    } else if (isObject(context)) {
      if ('name' in context) {
        const { name, ...rest } = context;
        module = name;
        stringifiedMeta = JSON.stringify(rest);
      } else {
        try {
          stringifiedMeta = JSON.stringify(context);
        } catch (error) {}
      }
    }

    const formattedMeta = inspect(options.prettyPrint ? JSON.parse(stringifiedMeta) : stringifiedMeta, { colors: options.colors, depth: null });

    return (
      `${color(`[${appName}]`)} ` +
      `${yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
      ('undefined' !== typeof timestamp ? `${timestamp} ` : '') +
      ('undefined' !== typeof module ? `${yellow('[' + module + ']')} ` : '') +
      `${color(message)} - ` +
      `${formattedMeta}` +
      ('undefined' !== typeof ms ? ` ${yellow(ms)}` : '')
    );
  });

export const utilities = {
  format: {
    nestLike: nestLikeConsoleFormat,
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};
