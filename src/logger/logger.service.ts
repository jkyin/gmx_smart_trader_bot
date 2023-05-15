import { ConsoleLogger } from '@nestjs/common';
import { dayjs } from 'src/common/day';

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    console.log(dayjs.tz.guess());
    return dayjs('2014-06-01 12:00').tz('America/New_York').format();

    return dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}
