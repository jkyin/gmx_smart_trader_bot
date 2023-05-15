import { ConsoleLogger } from '@nestjs/common';
import { dayjs } from 'src/common/day';

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    console.log(dayjs.tz.guess());

    return dayjs.tz(Date.now()).format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}
