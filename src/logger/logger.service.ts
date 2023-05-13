import { ConsoleLogger } from '@nestjs/common';
import { dayjs } from 'src/common/day';

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    return dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
  }
}
