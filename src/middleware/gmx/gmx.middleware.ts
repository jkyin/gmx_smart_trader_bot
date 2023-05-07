import { IPositionDecrease, IPositionIncrease, ITrade } from 'src/interfaces/gmx.interface';

export function isTradeOpen(trade: ITrade): boolean {
  return trade.updateList.length == 1 && trade.status == 'open';
}

export function isTradeLiquidated(trade: ITrade): boolean {
  return trade.liquidatedPosition != undefined;
}

export function isTradeClosed(trade: ITrade): boolean {
  return trade.closedPosition != undefined;
}

export function getOrderedActionList(trade: ITrade): (IPositionIncrease | IPositionDecrease)[] {
  const activeList: (IPositionIncrease | IPositionDecrease)[] = trade.increaseList.concat(trade.decreaseList);
  activeList.sort((a, b) => b.timestamp - a.timestamp);
  return activeList;
}
