import BigNumber from 'bignumber.js';

export type PositionQuery = {
  collateralTokens: string[];
  indexTokens: string[];
  isLong: boolean[];
};

export type Token = {
  name: string;
  symbol: string;
  baseSymbol?: string;
  decimals: number;
  address: string;
  coingeckoUrl?: string;
  imageUrl?: string;

  isUsdg?: boolean;
  isNative?: boolean;
  isWrapped?: boolean;
  isShortable?: boolean;
  isStable?: boolean;
  isTempHidden?: boolean;
};

export type TokenInfo = Token & {
  hasMaxAvailableLong?: boolean;
  hasMaxAvailableShort?: boolean;

  usdgAmount?: BigNumber;
  maxUsdgAmount?: BigNumber;

  poolAmount?: BigNumber;
  bufferAmount?: BigNumber;
  managedAmount?: BigNumber;
  managedUsd?: BigNumber;
  availableAmount?: BigNumber;
  availableUsd?: BigNumber;
  guaranteedUsd?: BigNumber;
  redemptionAmount?: BigNumber;
  reservedAmount?: BigNumber;

  balance?: BigNumber;

  weight?: BigNumber;

  maxPrice?: BigNumber;
  maxPrimaryPrice?: BigNumber;

  minPrice?: BigNumber;
  minPrimaryPrice?: BigNumber;

  contractMaxPrice?: BigNumber;
  contractMinPrice?: BigNumber;

  spread?: BigNumber;

  cumulativeFundingRate?: BigNumber;
  fundingRate?: BigNumber;

  globalShortSize?: BigNumber;

  maxAvailableLong?: BigNumber;
  maxAvailableShort?: BigNumber;

  maxGlobalLongSize?: BigNumber;
  maxGlobalShortSize?: BigNumber;

  maxLongCapacity?: BigNumber;
};

export type InfoTokens = {
  [key: string]: TokenInfo;
};

export type TradeAction = {
  id: string;
  data: {
    blockNumber: number;
    action: string;
    params: string;
    account: string;
    timestamp: string;
    txhash: string;
  };
};

// 当 action 是 DecreasePosition-Short 或者 DecreasePosition-Long，并且 collateralDelta 为 0 时，为关闭仓位。
export type TradeActionParams = {
  key: string;
  collateralToken: string;
  indexToken: string;
  collateralDelta: string;
  sizeDelta: string;
  isLong: boolean;
  price: string;
  flags: {
    isOrderExecution: boolean;
    isLiquidation: boolean;
  };
  feeBasisPoints: number;
};

export type TradeActionDealStatus = 'Increase' | 'Closed' | 'Decrease' | 'Liquidated';

export type TradeActionDeal = {
  symbol: string;
  isLong: boolean;
  leverage?: BigNumber;
  margin?: BigNumber;
  price: string;
  status: TradeActionDealStatus;
};
