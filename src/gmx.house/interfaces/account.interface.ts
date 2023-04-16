export interface AccountTradeList {
  trade?: Trade[];
  topic?: string;
}

export interface Trade {
  id?: string;
  timestamp?: number;
  account?: string;
  collateralToken?: string;
  indexToken?: string;
  isLong?: boolean;
  key?: string;
  status?: Status;
  increaseList?: CreaseList[];
  decreaseList?: CreaseList[];
  updateList?: ClosedPosition[];
  sizeDelta?: string;
  collateralDelta?: string;
  fee?: string;
  size?: string;
  collateral?: string;
  averagePrice?: string;
  realisedPnl?: string;
  realisedPnlPercentage?: string;
  settledTimestamp?: number | null;
  closedPosition?: ClosedPosition | null;
  liquidatedPosition?: LiquidatedPosition | null;
  __typename?: string;
}

export interface ClosedPosition {
  id?: string;
  timestamp?: number;
  key?: string;
  size?: string;
  collateral?: string;
  reserveAmount?: string;
  realisedPnl?: string;
  averagePrice?: string;
  entryFundingRate?: string;
  __typename?: ClosedPositionTypename;
  markPrice?: string;
}

export enum ClosedPositionTypename {
  ClosePosition = 'ClosePosition',
  UpdatePosition = 'UpdatePosition',
}

export interface CreaseList {
  id?: string;
  timestamp?: number;
  account?: string;
  collateralToken?: string;
  indexToken?: string;
  isLong?: boolean;
  key?: string;
  collateralDelta?: string;
  sizeDelta?: string;
  fee?: string;
  price?: string;
  __typename?: DecreaseListTypename;
}

export enum DecreaseListTypename {
  DecreasePosition = 'DecreasePosition',
  IncreasePosition = 'IncreasePosition',
}

export interface LiquidatedPosition {
  id?: string;
  timestamp?: number;
  key?: string;
  account?: string;
  collateralToken?: string;
  indexToken?: string;
  isLong?: boolean;
  size?: string;
  collateral?: string;
  reserveAmount?: string;
  realisedPnl?: string;
  markPrice?: string;
  __typename?: string;
}

export enum Status {
  Closed = 'closed',
  Liquidated = 'liquidated',
  Open = 'open',
}
