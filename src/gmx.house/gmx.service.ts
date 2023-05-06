import { Injectable } from '@nestjs/common';
import { Status, Trade, getBuiltGraphSDK } from '../../.graphclient';

import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';
import { POSITION_CLOSED, POSITION_CLOSED_ALL, POSITION_OPEN, POSITION_UPDATED, TOKEN_SYMBOL } from 'src/common/constants';
import { Logger } from 'src/logger/logger.service';
import { CEXTrade, GMXTrade, ITrade, TradeEvent } from 'src/interfaces/gmx.interface';
import { getOrderedActionList, isTradeClosed, isTradeOpen } from 'src/middleware/gmx/gmx.middleware';

@Injectable()
export class GMXService {
  // binance 交易所仓位
  private cexTradeList: CEXTrade[] = [];
  private _isWatching = false;

  private sdk = getBuiltGraphSDK();

  private _activeTrades: GMXTrade[] | undefined;

  private startWatch = false;

  private _watchingInfo: {
    account: string | undefined;
    status: string | undefined;
  } = {
    account: undefined,
    status: undefined,
  };

  constructor(private readonly logger: Logger, private eventEmitter: EventEmitter2) {}

  get activeTrades() {
    return this._activeTrades;
  }

  get isWatching() {
    return this._isWatching;
  }

  get watchingInfo() {
    return this._watchingInfo;
  }

  async watchAccountTradeList(account: string, status: Status) {
    this._watchingInfo = { account: account, status: status };
    this.startWatch = true;
    this._isWatching = true;

    const result = await this.sdk.AccountTradeList({
      account: account,
      status: status,
    });

    for await (const query of result) {
      if (!this.startWatch) {
        this.logger.warn('🔴已停止');
        return;
      }

      if (_.isEqual(this._activeTrades, query.trades) == false) {
        this._activeTrades = query.trades;

        if (query.trades.length == 0 && this.cexTradeList.length > 0) {
          this.closeAllTrade();
        } else {
          query.trades.forEach((trade) => this.diffTrade(trade));
        }
      }
    }
  }

  // 所有仓位平仓
  closeAllTrade() {
    this.eventEmitter.emit(POSITION_CLOSED_ALL);
    this.cexTradeList = [];
    this.logger.log('发出 POSITION_CLOSED_ALL 事件');
  }

  private diffTrade(trade: ITrade) {
    const symbol = TOKEN_SYMBOL.get(trade.indexToken);
    if (!symbol) {
      this.logger.warn(`参数异常， 没有 symbol，当前 trade 为 ${JSON.stringify(trade)}`);
      return;
    }

    const pair = symbol + 'USDT';
    const cexTrade = _.find(this.cexTradeList, { symbol: symbol });
    const actionList = getOrderedActionList(trade);

    if (!actionList) {
      if (trade.updateList.length > 0) {
        this.logger.warn(`actionList 不应该为空，当前 trade 数据为: ${JSON.stringify(trade)}`);
      }
      return;
    }

    if (isTradeOpen(trade)) {
      const action = _.head(actionList);

      if (cexTrade) {
        this.logger.warn(`特殊情况， binance 已包含已包含 ${pair} 仓位.`);
        return;
      }

      if (!action) {
        this.logger.warn('异常情况，应该有 action，但是没有。');
        return;
      }

      const newTrade = { symbol: symbol, openTimestamp: trade.timestamp, actions: actionList, pair: pair };
      const event: TradeEvent = {
        trade: newTrade,
        updateAction: action,
        raw: trade,
      };

      this.eventEmitter.emit(POSITION_OPEN, event);
      this.logger.log('发出 POSITION_OPEN 事件');

      this.cexTradeList.push(newTrade);
    } else if (isTradeClosed(trade)) {
      if (!trade.closedPosition) {
        this.logger.warn('异常情况，应该有 closedPosition.');
        return;
      }

      const event: TradeEvent = {
        trade: {
          openTimestamp: trade.timestamp,
          symbol: symbol,
          pair: pair,
          actions: [],
        },
        closeAction: trade.closedPosition,
        raw: trade,
      };

      this.eventEmitter.emit(POSITION_CLOSED, event);

      _.remove(this.cexTradeList, { symbol: symbol });
    } else {
      if (!cexTrade) {
        this.logger.warn('监控到被观察 trader 仓位存在， 但服务器没有记录，请手动酌情开启自己的仓位。');
        return;
      }

      // 调仓
      const lastActionList = cexTrade?.actions;
      const changes = _.differenceBy(lastActionList, actionList, 'id');
      const action = _.head(changes);

      if (!action) {
        this.logger.warn('监控到被观察 trader 仓位存在， 但服务器没有记录，请手动酌情开启自己的仓位。');
        return;
      }

      const event: TradeEvent = {
        trade: cexTrade,
        updateAction: action,
        raw: trade,
      };

      this.eventEmitter.emit(POSITION_UPDATED, event);
      this.logger.log('发出 POSITION_UPDATED 事件');

      const index = this.cexTradeList.indexOf(cexTrade);
      this.cexTradeList[index].actions = actionList;
    }
  }

  private emitTradeAction(trade: Trade) {
    // changes.forEach(change => {
    //   switch (change) {
    //     case value:
    //       break;
    //     default:
    //       break;
    //   }
    // });
  }

  private testChanges() {
    // const xyz: (IncreasePosition | DecreasePosition)[] = [
    //   {
    //     id: 'IncreasePosition:51:0xa47d1a82b187afac4bf1323a3cce08f2cc2f8ed595671f93fb5d96b05af53e1c',
    //     timestamp: 1682558917,
    //     account: '0x7b7736a2c07c4332ffad45a039d2117ae15e3f66',
    //     collateralToken: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    //     indexToken: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    //     isLong: false,
    //     key: '0x8a3c36d2963dc0eb9244a0d711500e35701618b5dc4b2931ec4109afc1859e43',
    //     collateralDelta: '5000000000000000000000000000000000',
    //     sizeDelta: '49504950321389881500000000000000000',
    //     fee: '49504950321389881500000000000000',
    //     price: '28837641000000000000000000000000000',
    //   },
    // ];
    // const trade = this._activeTrades?.filter((t) => t.indexToken === '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f')[0];
    // const activeList: (IncreasePosition | DecreasePosition)[] = trade?.increaseList;
    // const result2 = _.differenceBy(activeList, xyz, 'id');
    // result.forEach((diff) => {
    //   switch (diff.type) {
    //     case 'CREATE':
    //       break;
    //     case
    //     default:
    //       break;
    //   }
    // })
  }

  stopWatch() {
    this.startWatch = false;
    this._isWatching = false;
    this._activeTrades = [];
    this._watchingInfo = { account: undefined, status: undefined };
  }
}
