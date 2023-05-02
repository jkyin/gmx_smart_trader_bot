import { ClosePosition, DecreasePosition, IncreasePosition, LiquidatePosition, Maybe, Trade, UpdatePosition } from '.graphclient';

export interface TradeEvent {
  trade: CEXTrade;
  raw: ITrade;
  updateAction?: IPositionIncrease | IPositionDecrease;
  closeAction?: IPositionClose;
  liquidateAction?: IPositionLiquidate;
}

export interface TGBotPositionDisplayInfo {
  date: string;
  relationDate: string;
  token: string;
  isLong: string;
  entryPrice: string;
  leverage: string;
  sizeValue: string;
  collateralValue: string;
  pnl: string;
  liquidationPrice: string;
}

export interface CEXTrade {
  openTimestamp: number;
  // BTC
  symbol: string;
  // BTCUSDT
  pair: string;
  // 包含开仓、加减仓、平仓。
  actions: (IPositionIncrease | IPositionDecrease)[];
}

export type ITradeStatus = 'open' | 'closed' | 'liquidated';

export interface ITrade {
  id: string;
  timestamp: number;
  account: string;
  collateralToken: string;
  indexToken: string;
  isLong: boolean;
  key?: string;
  status: ITradeStatus;
  increaseList: IPositionIncrease[];
  decreaseList: IPositionDecrease[];
  updateList: IPositionUpdate[];
  sizeDelta?: string;
  collateralDelta?: string;
  fee: string;
  size: string;
  collateral: string;
  averagePrice: string;
  realisedPnl: string;
  realisedPnlPercentage?: string;
  settledTimestamp?: number | null;
  closedPosition?: IPositionClose | null;
  liquidatedPosition?: IPositionLiquidate | null;
  __typename: string;
}

export interface IPositionIncrease {
  id: string;
  timestamp: number;
  account: string;
  collateralToken: string;
  indexToken: string;
  isLong: boolean;
  key: string;
  collateralDelta: string;
  sizeDelta: string;
  fee: string;
  price: string;
  __typename: string;
}

export interface IPositionDecrease {
  id: string;
  timestamp: number;
  account: string;
  collateralToken: string;
  indexToken: string;
  isLong: boolean;
  key: string;
  collateralDelta: string;
  sizeDelta: string;
  fee: string;
  price: string;
  __typename: string;
}

export interface IPositionUpdate {
  id: string;
  timestamp: number;
  key: string;
  size: string;
  markPrice: string;
  collateral: string;
  reserveAmount: string;
  realisedPnl: string;
  averagePrice: string;
  entryFundingRate: string;
  __typename: string;
}

export interface IPositionClose {
  id: string;
  timestamp: number;
  key: string;
  size: string;
  collateral: string;
  reserveAmount: string;
  realisedPnl: string;
  averagePrice: string;
  entryFundingRate: string;
  __typename: string;
}

export interface IPositionLiquidate {
  id: string;
  timestamp: number;
  key: string;
  account: string;
  collateralToken: string;
  indexToken: string;
  isLong: boolean;
  size: string;
  collateral: string;
  reserveAmount: string;
  realisedPnl: string;
  markPrice: string;
  __typename: string;
}

export type GMXTrade = { __typename: 'Trade' } & Pick<
  Trade,
  | 'id'
  | 'timestamp'
  | 'account'
  | 'collateralToken'
  | 'indexToken'
  | 'isLong'
  | 'key'
  | 'status'
  | 'sizeDelta'
  | 'collateralDelta'
  | 'fee'
  | 'size'
  | 'collateral'
  | 'averagePrice'
  | 'realisedPnl'
  | 'realisedPnlPercentage'
  | 'settledTimestamp'
> & {
    increaseList: Array<
      { __typename: 'IncreasePosition' } & Pick<
        IncreasePosition,
        'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'
      >
    >;
    decreaseList: Array<
      { __typename: 'DecreasePosition' } & Pick<
        DecreasePosition,
        'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'
      >
    >;
    updateList: Array<
      { __typename: 'UpdatePosition' } & Pick<
        UpdatePosition,
        'id' | 'timestamp' | 'key' | 'size' | 'markPrice' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'
      >
    >;
    closedPosition?: Maybe<
      { __typename: 'ClosePosition' } & Pick<
        ClosePosition,
        'id' | 'timestamp' | 'key' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'
      >
    >;
    liquidatedPosition?: Maybe<
      { __typename: 'LiquidatePosition' } & Pick<
        LiquidatePosition,
        | 'id'
        | 'timestamp'
        | 'key'
        | 'account'
        | 'collateralToken'
        | 'indexToken'
        | 'isLong'
        | 'size'
        | 'collateral'
        | 'reserveAmount'
        | 'realisedPnl'
        | 'markPrice'
      >
    >;
  };
