import { Injectable } from '@nestjs/common';
import {
  AccountTradeListQuery,
  Status,
  getBuiltGraphSDK,
} from '../../.graphclient';

import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';
import { POSITION_UPDATED } from 'src/common/constants';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class GMXService {
  private _isRunning: boolean;

  private sdk = getBuiltGraphSDK();
  private lastOpenedPositions: AccountTradeListQuery | undefined;

  private startWatch = false;

  private account: string;
  constructor(
    private readonly logger: Logger,
    private eventEmitter: EventEmitter2,
  ) {}

  get isRunning(): boolean {
    return this._isRunning;
  }

  async currentWatching() {
    return this.account;
  }

  async watchAccountTradeList(account: string, status: Status) {
    this.startWatch = true;

    const result = await this.sdk.AccountTradeList({
      account: account,
      status: status,
    });

    for await (const query of result) {
      if (!this.startWatch) {
        this.logger.warn('🔴已停止');
        return;
      }

      if (
        _.isEqual(this.lastOpenedPositions, query) &&
        this.lastOpenedPositions != undefined
      ) {
        this.logger.log(`监控中... 无变化: ${JSON.stringify(query)}`);
      } else {
        this.lastOpenedPositions = query;
        this.eventEmitter.emit(POSITION_UPDATED, {
          query: query,
          variable: { account: account, status: status },
        });
      }
    }
  }

  stopWatch() {
    this.startWatch = false;
  }
}
