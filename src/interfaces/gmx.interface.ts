import { TradeAction, TradeActionDeal } from 'src/gmx.house/types';

export interface TradeEvent {
  trade: {
    timestamp: number;
    // BTC
    symbol: string;
    // BTCUSDT
    pair: string;
  };
  deal: TradeActionDeal;
  raw: TradeAction;
}
