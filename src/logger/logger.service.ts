import { ConsoleLogger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/zh-cn';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Shanghai');

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    const timestamp = dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    return timestamp;
  }
}
