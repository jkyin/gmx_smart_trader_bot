import { AccountTradeListQuery, Status } from '.graphclient';

export interface GMXAccountQueryPayload {
  query: AccountTradeListQuery;
  variable: { account: string; status: Status };
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
