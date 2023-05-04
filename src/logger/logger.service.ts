import { ConsoleLogger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/zh-cn';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    
    const timestamp = dayjs('2013-11-18 11:55:20').tz('America/Toronto').format('YYYY-MM-DD HH:mm:ss');
    return timestamp;
  }
}
