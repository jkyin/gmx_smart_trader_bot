import { ConsoleLogger } from '@nestjs/common';
import * as moment from 'moment-timezone';

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    return moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}
