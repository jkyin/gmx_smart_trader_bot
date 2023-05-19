import { Injectable, Logger } from '@nestjs/common';
import { Status, getBuiltGraphSDK } from '../../.graphclient';

import { EventEmitter2 } from '@nestjs/event-emitter';
import * as _ from 'lodash';
import { POSITION_CLOSED, POSITION_CLOSED_ALL, POSITION_OPEN, POSITION_UPDATED, TOKEN_SYMBOL } from 'src/common/constants';
import { CEXTrade, GMXTrade, IPositionDecrease, IPositionIncrease, ITrade, TradeEvent } from 'src/interfaces/gmx.interface';
import { getOrderedActionList, isTradeClosed, isTradeOpen } from 'src/middleware/gmx/gmx.middleware';
import diff from 'fast-array-diff';
import { dayjs } from 'src/common/day';

@Injectable()
export class GMXService {
  private bnTradeTimeout = 60;
  // binance 交易所仓位
  private bnTradeList: CEXTrade[] = [];
  private _isWatching = false;

  private sdk = getBuiltGraphSDK();

  private _lastQueryTrades: GMXTrade[] | undefined;

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
    return this._lastQueryTrades;
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
        break;
      }

      const activeTrades = query.trades;
      // 1. trader 没有仓位则清空 binance 所有仓位。
      if (!this._lastQueryTrades && _.isEmpty(activeTrades)) {
        this.notifyCloseAllTrade();
      } else {
        const changes = diff.diff(this._lastQueryTrades ?? [], activeTrades, this.tradesCompare);
        const noChanges = _.isEmpty(changes.added) && _.isEmpty(changes.removed);
        const hasChanges = !noChanges;
        const hasClosePosition = activeTrades.length > 0 && activeTrades.length < (this._lastQueryTrades ?? []).length;

        if (hasClosePosition) {
          this.logger.log('监控发现 Trader 有新的平仓操作');

          // 某个仓位被关闭了。
          this.logger.log('开始分析 trade close', { name: GMXService.name });
          changes.removed.forEach((trade) => {
            const symbol = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
            if (!symbol) {
              this.logger.warn(`参数异常， 没有 ${symbol})}`, { name: GMXService.name, indexToken: trade.indexToken });
              return;
            }

            this.logger.log('结束分析 trade close', { name: GMXService.name });

            const pair = symbol + 'USDT';
            this.notifyClosePosition(trade, symbol, pair);
          });
        } else if (_.isEmpty(activeTrades) && hasChanges) {
          this.notifyCloseAllTrade();
        } else if (hasChanges) {
          this.logger.log('监控发现 Trader 有新的调仓操作');
          this.logger.log(`开始分析 trade changes`, { name: GMXService.name });

          query.trades.forEach((trade) => {
            this.diffTrade(trade);
          });
        }
      }

      this._lastQueryTrades = query.trades;
    }
  }

  // 所有仓位平仓
  notifyCloseAllTrade() {
    this.eventEmitter.emit(POSITION_CLOSED_ALL);
    this.bnTradeList = [];
    this.logger.log('发出 POSITION_CLOSED_ALL 事件', { name: GMXService.name });
  }

  private diffTrade(trade: ITrade) {
    const symbol = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
    if (!symbol) {
      this.logger.warn(`参数异常， 没有 ${symbol}，跳过`, { name: GMXService.name, trade: trade });
      return;
    }

    const pair = symbol + 'USDT';
    const bnTrade = _.find(this.bnTradeList, { symbol: symbol });

    this.logger.log(`开始处理 diffTrade`, { name: GMXService.name, pair: pair });
    this.logger.debug(`当前 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });

    const actionList = getOrderedActionList(trade);

    if (!actionList) {
      if (trade.updateList.length > 0) {
        this.logger.warn(`actionList 不应该为空，跳过`, { name: GMXService.name, trade: trade });
      }
      return;
    }

    if (isTradeOpen(trade)) {
      this.logger.log('开始分析 trade open', { name: GMXService.name });

      const action = _.head(actionList);

      this.logger.debug('当前 action', { name: GMXService.name, action: action });

      if (bnTrade) {
        this.logger.warn(`特殊情况，想要开仓但 binance 已包含已包含 ${pair} 仓位. 跳过`, { name: GMXService.name });
        this.bnTradeListOpen(symbol, trade, actionList, pair);
        this.logger.debug(`已更新 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });
        this.logger.log('结束分析 trade open', { name: GMXService.name });
        return;
      }

      if (!action) {
        this.logger.warn(`${pair}异常情况，应该有 action，但是没有。 跳过`, { name: GMXService.name });
        this.bnTradeListOpen(symbol, trade, actionList, pair);
        this.logger.debug(`已更新 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });
        this.logger.log('结束分析 trade open', { name: GMXService.name });
        return;
      }

      const newTrade = { symbol: symbol, openTimestamp: trade.timestamp, actions: actionList, pair: pair };

      const event: TradeEvent = {
        trade: newTrade,
        updateAction: action,
        raw: trade,
      };

      this.bnTradeListOpen(symbol, trade, actionList, pair);
      this.logger.debug(`已更新 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });

      const actionTime = dayjs.unix(action.timestamp);
      const diffInSeconds = dayjs().diff(actionTime, 'second');

      if (Math.abs(diffInSeconds) > this.bnTradeTimeout) {
        this.logger.warn(`Trader ${pair} 开仓操作在 ${actionTime.fromNow()}， 超过了 ${this.bnTradeTimeout} 秒钟, 跳过`, {
          name: GMXService.name,
          diffInSeconds: diffInSeconds,
          actionTime: actionTime.format('YYYY-MM-DD HH:mm:ss'),
        });

        this.logger.log('结束分析 trade open', { name: GMXService.name });
        return;
      }

      this.logger.log('结束分析 trade open', { name: GMXService.name });

      this.logger.log(`发出 ${pair} POSITION_OPEN 事件`, { name: GMXService.name });
      this.eventEmitter.emit(POSITION_OPEN, event);
    } else if (isTradeClosed(trade)) {
      this.logger.log('开始分析 trade close', { name: GMXService.name });

      if (!trade.closedPosition) {
        this.logger.warn(`${pair}异常情况，应该有 closedPosition.跳过`, { name: GMXService.name });
        this.logger.log('结束分析 trade close', { name: GMXService.name });
        return;
      }

      const actionTime = dayjs.unix(trade.closedPosition.timestamp);
      const diffInSeconds = dayjs().diff(actionTime, 'second');

      if (Math.abs(diffInSeconds) > this.bnTradeTimeout) {
        this.logger.warn(`Trader 平仓操作在 ${actionTime.fromNow()}， 超过了 ${this.bnTradeTimeout} 秒钟， 跳过`, {
          name: GMXService.name,
          diffInSeconds: diffInSeconds,
          actionTime: actionTime.format('YYYY-MM-DD HH:mm:ss'),
          trade: trade,
        });

        this.logger.log('结束分析 trade close', { name: GMXService.name });
        return;
      }

      this.logger.log('结束分析 trade close', { name: GMXService.name });

      this.notifyClosePosition(trade, symbol, pair);
    } else {
      this.logger.log('开始分析 trade update', { name: GMXService.name });

      if (!bnTrade) {
        this.logger.warn(`想要更新 ${pair} 仓位，但监控到 trader 仓位存在， 但服务器没有记录，请手动酌情开启自己的仓位。`, {
          name: GMXService.name,
          bnTradeList: this.bnTradeList,
        });

        this.bnTradeListOpen(symbol, trade, actionList, pair);
        this.logger.debug(`跳过，已更新 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });
        this.logger.log('结束分析 trade update', { name: GMXService.name });

        return;
      }

      // 调仓
      const lastActionList = bnTrade?.actions;
      const changes = diff.diff(lastActionList, actionList, this.actionCompare);
      const action = _.head(changes.added);

      if (!action) {
        this.logger.warn(
          `${pair} 监控到被观察 trader 仓位存在， 想要处理 changes，但 diff.diff(actionList, lastActionList, this.actionCompare); 结果为空`,
          { name: GMXService.name, lastActionList: lastActionList, actionList: actionList, changes: changes },
        );

        this.bnTradeListUpdate(bnTrade, actionList);

        this.logger.debug(`跳过，已更新 bnTradeList`, { bnTradeList: this.bnTradeList });
        this.logger.log('结束分析 trade update', { name: GMXService.name });

        return;
      }

      this.bnTradeListUpdate(bnTrade, actionList);
      this.logger.debug(`已更新 bnTradeList`, { bnTradeList: this.bnTradeList });

      const event: TradeEvent = {
        trade: bnTrade,
        updateAction: action,
        raw: trade,
      };

      const actionTime = dayjs.unix(action.timestamp);
      const diffInSeconds = dayjs().diff(actionTime, 'second');

      if (Math.abs(diffInSeconds) > this.bnTradeTimeout) {
        this.logger.warn(`Trader 调仓操作在 ${actionTime.fromNow()}， 超过了 ${this.bnTradeTimeout} 秒钟`, {
          name: GMXService.name,
          diffInSeconds: diffInSeconds,
          actionTime: actionTime.format('YYYY-MM-DD HH:mm:ss'),
        });

        this.bnTradeListUpdate(bnTrade, actionList);

        this.logger.debug(`跳过，已更新 bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });
        this.logger.log('结束分析 trade update', { name: GMXService.name });

        return;
      }

      this.logger.log('结束分析 trade update', { name: GMXService.name });

      this.logger.log(`发出 ${pair} POSITION_UPDATED 事件`, { name: GMXService.name });
      this.eventEmitter.emit(POSITION_UPDATED, event);
    }
  }

  private bnTradeListOpen(symbol: string, trade: ITrade, actionList: (IPositionIncrease | IPositionDecrease)[], pair: string) {
    const newTrade = { symbol: symbol, openTimestamp: trade.timestamp, actions: actionList, pair: pair };
    this.bnTradeList.push(newTrade);
  }

  private bnTradeListUpdate(bnTrade: CEXTrade, actionList: (IPositionIncrease | IPositionDecrease)[]) {
    const index = this.bnTradeList.indexOf(bnTrade);
    this.bnTradeList[index].actions = actionList;
  }

  private actionCompare(x: IPositionIncrease | IPositionDecrease, y: IPositionIncrease | IPositionDecrease) {
    return x.id === y.id;
  }

  private tradesCompare(x: GMXTrade, y: GMXTrade) {
    return x.indexToken == y.indexToken && x.account == y.account && x.updateList.length == y.updateList.length;
  }

  private notifyClosePosition(trade: ITrade, symbol: string, pair: string) {
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

    _.remove(this.bnTradeList, { symbol: symbol });
    this.logger.debug(`bnTradeList`, { name: GMXService.name, bnTradeList: this.bnTradeList });

    this.logger.log(`发出 ${pair} POSITION_CLOSED 事件`, { name: GMXService.name });
    this.eventEmitter.emit(POSITION_CLOSED, event);
  }

  stopWatch() {
    this.startWatch = false;
    this._isWatching = false;
    this._lastQueryTrades = [];
    this._watchingInfo = { account: undefined, status: undefined };
  }

  // async syncQueryToBNTradeList() {
  //   if (_.isEmpty(this._lastQueryTrades)) {
  //     return;
  //   }

  //   this._lastQueryTrades?.forEach((trade) => {
  //     const actionList = getOrderedActionList(trade);
  //     const symbol = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
  //     if (!symbol) {
  //       return;
  //     }

  //     const pair = symbol + 'USDT';

  //     const newTrade = { symbol: symbol, openTimestamp: trade.timestamp, actions: actionList, pair: pair };
  //     this.bnTradeList.push(newTrade);
  //   });

  //   this.logger.debug(`同步 gmx query 数据完成`, { bnTradeList: this.bnTradeList });
  // }
}
