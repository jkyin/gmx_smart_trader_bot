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
    // console.log(dayjs());
    // console.log(dayjs().tz('Asia/Shanghai'));
    console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const date = dayjs();
    const result = date.tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    console.log(result);
    
    const timestamp = dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    return timestamp;
  }
}
