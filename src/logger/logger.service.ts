import { ConsoleLogger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/zh-cn';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Shanghai');
dayjs.extend(customParseFormat);

export class Logger extends ConsoleLogger {
  protected getTimestamp(): string {
    // console.log(dayjs());
    // console.log(dayjs().tz('Asia/Shanghai'));
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));

    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return timestamp;
  }
}
