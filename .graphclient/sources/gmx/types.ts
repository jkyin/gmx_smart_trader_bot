// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace GmxTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Claim = {
  id: Scalars['ID'];
  receiver: Scalars['String'];
  amount: Scalars['BigInt'];
  amountUsd: Scalars['BigInt'];
};

export type Claim_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  receiver?: InputMaybe<Scalars['String']>;
  receiver_not?: InputMaybe<Scalars['String']>;
  receiver_gt?: InputMaybe<Scalars['String']>;
  receiver_lt?: InputMaybe<Scalars['String']>;
  receiver_gte?: InputMaybe<Scalars['String']>;
  receiver_lte?: InputMaybe<Scalars['String']>;
  receiver_in?: InputMaybe<Array<Scalars['String']>>;
  receiver_not_in?: InputMaybe<Array<Scalars['String']>>;
  receiver_contains?: InputMaybe<Scalars['String']>;
  receiver_contains_nocase?: InputMaybe<Scalars['String']>;
  receiver_not_contains?: InputMaybe<Scalars['String']>;
  receiver_not_contains_nocase?: InputMaybe<Scalars['String']>;
  receiver_starts_with?: InputMaybe<Scalars['String']>;
  receiver_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiver_not_starts_with?: InputMaybe<Scalars['String']>;
  receiver_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  receiver_ends_with?: InputMaybe<Scalars['String']>;
  receiver_ends_with_nocase?: InputMaybe<Scalars['String']>;
  receiver_not_ends_with?: InputMaybe<Scalars['String']>;
  receiver_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUsd?: InputMaybe<Scalars['BigInt']>;
  amountUsd_not?: InputMaybe<Scalars['BigInt']>;
  amountUsd_gt?: InputMaybe<Scalars['BigInt']>;
  amountUsd_lt?: InputMaybe<Scalars['BigInt']>;
  amountUsd_gte?: InputMaybe<Scalars['BigInt']>;
  amountUsd_lte?: InputMaybe<Scalars['BigInt']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Claim_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Claim_filter>>>;
};

export type Claim_orderBy =
  | 'id'
  | 'receiver'
  | 'amount'
  | 'amountUsd';

export type ClosePosition = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  key: Scalars['String'];
  size: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  reserveAmount: Scalars['BigInt'];
  realisedPnl: Scalars['BigInt'];
  averagePrice: Scalars['BigInt'];
  entryFundingRate: Scalars['BigInt'];
};

export type ClosePosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_not?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice?: InputMaybe<Scalars['BigInt']>;
  averagePrice_not?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_not?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClosePosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClosePosition_filter>>>;
};

export type ClosePosition_orderBy =
  | 'id'
  | 'timestamp'
  | 'key'
  | 'size'
  | 'collateral'
  | 'reserveAmount'
  | 'realisedPnl'
  | 'averagePrice'
  | 'entryFundingRate';

export type DecreasePosition = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  account: Scalars['String'];
  collateralToken: Scalars['String'];
  indexToken: Scalars['String'];
  isLong: Scalars['Boolean'];
  key: Scalars['String'];
  collateralDelta: Scalars['BigInt'];
  sizeDelta: Scalars['BigInt'];
  price: Scalars['BigInt'];
  fee: Scalars['BigInt'];
};

export type DecreasePosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken?: InputMaybe<Scalars['String']>;
  collateralToken_not?: InputMaybe<Scalars['String']>;
  collateralToken_gt?: InputMaybe<Scalars['String']>;
  collateralToken_lt?: InputMaybe<Scalars['String']>;
  collateralToken_gte?: InputMaybe<Scalars['String']>;
  collateralToken_lte?: InputMaybe<Scalars['String']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_contains?: InputMaybe<Scalars['String']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken?: InputMaybe<Scalars['String']>;
  indexToken_not?: InputMaybe<Scalars['String']>;
  indexToken_gt?: InputMaybe<Scalars['String']>;
  indexToken_lt?: InputMaybe<Scalars['String']>;
  indexToken_gte?: InputMaybe<Scalars['String']>;
  indexToken_lte?: InputMaybe<Scalars['String']>;
  indexToken_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_contains?: InputMaybe<Scalars['String']>;
  indexToken_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_contains?: InputMaybe<Scalars['String']>;
  indexToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isLong?: InputMaybe<Scalars['Boolean']>;
  isLong_not?: InputMaybe<Scalars['Boolean']>;
  isLong_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralDelta?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_not?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_not?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DecreasePosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DecreasePosition_filter>>>;
};

export type DecreasePosition_orderBy =
  | 'id'
  | 'timestamp'
  | 'account'
  | 'collateralToken'
  | 'indexToken'
  | 'isLong'
  | 'key'
  | 'collateralDelta'
  | 'sizeDelta'
  | 'price'
  | 'fee';

export type IncreasePosition = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  account: Scalars['String'];
  collateralToken: Scalars['String'];
  indexToken: Scalars['String'];
  isLong: Scalars['Boolean'];
  key: Scalars['String'];
  collateralDelta: Scalars['BigInt'];
  sizeDelta: Scalars['BigInt'];
  price: Scalars['BigInt'];
  fee: Scalars['BigInt'];
};

export type IncreasePosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken?: InputMaybe<Scalars['String']>;
  collateralToken_not?: InputMaybe<Scalars['String']>;
  collateralToken_gt?: InputMaybe<Scalars['String']>;
  collateralToken_lt?: InputMaybe<Scalars['String']>;
  collateralToken_gte?: InputMaybe<Scalars['String']>;
  collateralToken_lte?: InputMaybe<Scalars['String']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_contains?: InputMaybe<Scalars['String']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken?: InputMaybe<Scalars['String']>;
  indexToken_not?: InputMaybe<Scalars['String']>;
  indexToken_gt?: InputMaybe<Scalars['String']>;
  indexToken_lt?: InputMaybe<Scalars['String']>;
  indexToken_gte?: InputMaybe<Scalars['String']>;
  indexToken_lte?: InputMaybe<Scalars['String']>;
  indexToken_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_contains?: InputMaybe<Scalars['String']>;
  indexToken_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_contains?: InputMaybe<Scalars['String']>;
  indexToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isLong?: InputMaybe<Scalars['Boolean']>;
  isLong_not?: InputMaybe<Scalars['Boolean']>;
  isLong_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralDelta?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_not?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_not?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<IncreasePosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<IncreasePosition_filter>>>;
};

export type IncreasePosition_orderBy =
  | 'id'
  | 'timestamp'
  | 'account'
  | 'collateralToken'
  | 'indexToken'
  | 'isLong'
  | 'key'
  | 'collateralDelta'
  | 'sizeDelta'
  | 'price'
  | 'fee';

export type IntervalTime =
  | '_300'
  | '_900'
  | '_3600'
  | '_14400'
  | '_86400'
  | '_604800';

export type LiquidatePosition = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  key: Scalars['String'];
  account: Scalars['String'];
  collateralToken: Scalars['String'];
  indexToken: Scalars['String'];
  isLong: Scalars['Boolean'];
  size: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  reserveAmount: Scalars['BigInt'];
  realisedPnl: Scalars['BigInt'];
  markPrice: Scalars['BigInt'];
};

export type LiquidatePosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken?: InputMaybe<Scalars['String']>;
  collateralToken_not?: InputMaybe<Scalars['String']>;
  collateralToken_gt?: InputMaybe<Scalars['String']>;
  collateralToken_lt?: InputMaybe<Scalars['String']>;
  collateralToken_gte?: InputMaybe<Scalars['String']>;
  collateralToken_lte?: InputMaybe<Scalars['String']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_contains?: InputMaybe<Scalars['String']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken?: InputMaybe<Scalars['String']>;
  indexToken_not?: InputMaybe<Scalars['String']>;
  indexToken_gt?: InputMaybe<Scalars['String']>;
  indexToken_lt?: InputMaybe<Scalars['String']>;
  indexToken_gte?: InputMaybe<Scalars['String']>;
  indexToken_lte?: InputMaybe<Scalars['String']>;
  indexToken_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_contains?: InputMaybe<Scalars['String']>;
  indexToken_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_contains?: InputMaybe<Scalars['String']>;
  indexToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isLong?: InputMaybe<Scalars['Boolean']>;
  isLong_not?: InputMaybe<Scalars['Boolean']>;
  isLong_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_not?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice?: InputMaybe<Scalars['BigInt']>;
  markPrice_not?: InputMaybe<Scalars['BigInt']>;
  markPrice_gt?: InputMaybe<Scalars['BigInt']>;
  markPrice_lt?: InputMaybe<Scalars['BigInt']>;
  markPrice_gte?: InputMaybe<Scalars['BigInt']>;
  markPrice_lte?: InputMaybe<Scalars['BigInt']>;
  markPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidatePosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LiquidatePosition_filter>>>;
};

export type LiquidatePosition_orderBy =
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
  | 'markPrice';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PriceLatest = {
  id: Scalars['ID'];
  value: Scalars['BigInt'];
  timestamp: Scalars['Int'];
};

export type PriceLatest_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PriceLatest_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PriceLatest_filter>>>;
};

export type PriceLatest_orderBy =
  | 'id'
  | 'value'
  | 'timestamp';

export type Pricefeed = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  o: Scalars['BigInt'];
  h: Scalars['BigInt'];
  l: Scalars['BigInt'];
  c: Scalars['BigInt'];
  tokenAddress: TokenAddress;
  interval: IntervalTime;
};

export type Pricefeed_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  o?: InputMaybe<Scalars['BigInt']>;
  o_not?: InputMaybe<Scalars['BigInt']>;
  o_gt?: InputMaybe<Scalars['BigInt']>;
  o_lt?: InputMaybe<Scalars['BigInt']>;
  o_gte?: InputMaybe<Scalars['BigInt']>;
  o_lte?: InputMaybe<Scalars['BigInt']>;
  o_in?: InputMaybe<Array<Scalars['BigInt']>>;
  o_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  h?: InputMaybe<Scalars['BigInt']>;
  h_not?: InputMaybe<Scalars['BigInt']>;
  h_gt?: InputMaybe<Scalars['BigInt']>;
  h_lt?: InputMaybe<Scalars['BigInt']>;
  h_gte?: InputMaybe<Scalars['BigInt']>;
  h_lte?: InputMaybe<Scalars['BigInt']>;
  h_in?: InputMaybe<Array<Scalars['BigInt']>>;
  h_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  l?: InputMaybe<Scalars['BigInt']>;
  l_not?: InputMaybe<Scalars['BigInt']>;
  l_gt?: InputMaybe<Scalars['BigInt']>;
  l_lt?: InputMaybe<Scalars['BigInt']>;
  l_gte?: InputMaybe<Scalars['BigInt']>;
  l_lte?: InputMaybe<Scalars['BigInt']>;
  l_in?: InputMaybe<Array<Scalars['BigInt']>>;
  l_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  c?: InputMaybe<Scalars['BigInt']>;
  c_not?: InputMaybe<Scalars['BigInt']>;
  c_gt?: InputMaybe<Scalars['BigInt']>;
  c_lt?: InputMaybe<Scalars['BigInt']>;
  c_gte?: InputMaybe<Scalars['BigInt']>;
  c_lte?: InputMaybe<Scalars['BigInt']>;
  c_in?: InputMaybe<Array<Scalars['BigInt']>>;
  c_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAddress?: InputMaybe<TokenAddress>;
  tokenAddress_not?: InputMaybe<TokenAddress>;
  tokenAddress_in?: InputMaybe<Array<TokenAddress>>;
  tokenAddress_not_in?: InputMaybe<Array<TokenAddress>>;
  interval?: InputMaybe<IntervalTime>;
  interval_not?: InputMaybe<IntervalTime>;
  interval_in?: InputMaybe<Array<IntervalTime>>;
  interval_not_in?: InputMaybe<Array<IntervalTime>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pricefeed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Pricefeed_filter>>>;
};

export type Pricefeed_orderBy =
  | 'id'
  | 'timestamp'
  | 'o'
  | 'h'
  | 'l'
  | 'c'
  | 'tokenAddress'
  | 'interval';

export type Query = {
  pricefeed?: Maybe<Pricefeed>;
  pricefeeds: Array<Pricefeed>;
  priceLatest?: Maybe<PriceLatest>;
  priceLatests: Array<PriceLatest>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  increasePosition?: Maybe<IncreasePosition>;
  increasePositions: Array<IncreasePosition>;
  decreasePosition?: Maybe<DecreasePosition>;
  decreasePositions: Array<DecreasePosition>;
  updatePosition?: Maybe<UpdatePosition>;
  updatePositions: Array<UpdatePosition>;
  referralAdjustment?: Maybe<ReferralAdjustment>;
  referralAdjustments: Array<ReferralAdjustment>;
  closePosition?: Maybe<ClosePosition>;
  closePositions: Array<ClosePosition>;
  liquidatePosition?: Maybe<LiquidatePosition>;
  liquidatePositions: Array<LiquidatePosition>;
  trade?: Maybe<Trade>;
  trades: Array<Trade>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerypricefeedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypricefeedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pricefeed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pricefeed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypriceLatestArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypriceLatestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PriceLatest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PriceLatest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryincreasePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryincreasePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IncreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IncreasePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydecreasePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydecreasePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DecreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DecreasePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdatePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdatePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdatePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdatePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreferralAdjustmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreferralAdjustmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReferralAdjustment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReferralAdjustment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclosePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidatePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidatePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidatePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidatePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytradeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytradesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trade_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trade_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type ReferralAdjustment = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  account: Scalars['String'];
  sizeDelta: Scalars['BigInt'];
  marginFeeBasisPoints: Scalars['BigInt'];
  referralCode: Scalars['String'];
  referrer: Scalars['String'];
};

export type ReferralAdjustment_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sizeDelta?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_not?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginFeeBasisPoints?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_not?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_gt?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_lt?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_gte?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_lte?: InputMaybe<Scalars['BigInt']>;
  marginFeeBasisPoints_in?: InputMaybe<Array<Scalars['BigInt']>>;
  marginFeeBasisPoints_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  referralCode?: InputMaybe<Scalars['String']>;
  referralCode_not?: InputMaybe<Scalars['String']>;
  referralCode_gt?: InputMaybe<Scalars['String']>;
  referralCode_lt?: InputMaybe<Scalars['String']>;
  referralCode_gte?: InputMaybe<Scalars['String']>;
  referralCode_lte?: InputMaybe<Scalars['String']>;
  referralCode_in?: InputMaybe<Array<Scalars['String']>>;
  referralCode_not_in?: InputMaybe<Array<Scalars['String']>>;
  referralCode_contains?: InputMaybe<Scalars['String']>;
  referralCode_contains_nocase?: InputMaybe<Scalars['String']>;
  referralCode_not_contains?: InputMaybe<Scalars['String']>;
  referralCode_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referralCode_starts_with?: InputMaybe<Scalars['String']>;
  referralCode_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralCode_not_starts_with?: InputMaybe<Scalars['String']>;
  referralCode_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralCode_ends_with?: InputMaybe<Scalars['String']>;
  referralCode_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referralCode_not_ends_with?: InputMaybe<Scalars['String']>;
  referralCode_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referrer?: InputMaybe<Scalars['String']>;
  referrer_not?: InputMaybe<Scalars['String']>;
  referrer_gt?: InputMaybe<Scalars['String']>;
  referrer_lt?: InputMaybe<Scalars['String']>;
  referrer_gte?: InputMaybe<Scalars['String']>;
  referrer_lte?: InputMaybe<Scalars['String']>;
  referrer_in?: InputMaybe<Array<Scalars['String']>>;
  referrer_not_in?: InputMaybe<Array<Scalars['String']>>;
  referrer_contains?: InputMaybe<Scalars['String']>;
  referrer_contains_nocase?: InputMaybe<Scalars['String']>;
  referrer_not_contains?: InputMaybe<Scalars['String']>;
  referrer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referrer_starts_with?: InputMaybe<Scalars['String']>;
  referrer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_not_starts_with?: InputMaybe<Scalars['String']>;
  referrer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_ends_with?: InputMaybe<Scalars['String']>;
  referrer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referrer_not_ends_with?: InputMaybe<Scalars['String']>;
  referrer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ReferralAdjustment_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ReferralAdjustment_filter>>>;
};

export type ReferralAdjustment_orderBy =
  | 'id'
  | 'timestamp'
  | 'account'
  | 'sizeDelta'
  | 'marginFeeBasisPoints'
  | 'referralCode'
  | 'referrer';

export type Status =
  | 'open'
  | 'closed'
  | 'liquidated';

export type Subscription = {
  pricefeed?: Maybe<Pricefeed>;
  pricefeeds: Array<Pricefeed>;
  priceLatest?: Maybe<PriceLatest>;
  priceLatests: Array<PriceLatest>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  claim?: Maybe<Claim>;
  claims: Array<Claim>;
  increasePosition?: Maybe<IncreasePosition>;
  increasePositions: Array<IncreasePosition>;
  decreasePosition?: Maybe<DecreasePosition>;
  decreasePositions: Array<DecreasePosition>;
  updatePosition?: Maybe<UpdatePosition>;
  updatePositions: Array<UpdatePosition>;
  referralAdjustment?: Maybe<ReferralAdjustment>;
  referralAdjustments: Array<ReferralAdjustment>;
  closePosition?: Maybe<ClosePosition>;
  closePositions: Array<ClosePosition>;
  liquidatePosition?: Maybe<LiquidatePosition>;
  liquidatePositions: Array<LiquidatePosition>;
  trade?: Maybe<Trade>;
  trades: Array<Trade>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionpricefeedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpricefeedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pricefeed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pricefeed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpriceLatestArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpriceLatestsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PriceLatest_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PriceLatest_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Claim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Claim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionincreasePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionincreasePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IncreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IncreasePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondecreasePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondecreasePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DecreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DecreasePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdatePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdatePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdatePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdatePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreferralAdjustmentArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreferralAdjustmentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReferralAdjustment_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReferralAdjustment_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclosePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClosePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClosePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidatePositionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidatePositionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidatePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidatePosition_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontradeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontradesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Trade_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Trade_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokenAddress =
  | '_0x82af49447d8a07e3bd95bd0d56f35241523fbab1'
  | '_0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f'
  | '_0xf97f4df75117a78c1a5a0dbb814af92458539fb4'
  | '_0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0'
  | '_0x4277f8f2c384827b5273592ff7cebd9f2c1ac258'
  | '_0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a'
  | '_0xf42ae1d54fd613c9bb14810b0588faaa09a426ca'
  | '_0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
  | '_0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab'
  | '_0x50b7545627a5162f82a992c33b87adc75187b218'
  | '_0x152b9d0fdc40c096757f570a51e494bd4b943e50'
  | '_0x01234181085565ed162a948b6a5e88758cd7c7b8'
  | '_0x62edc0692bd897d2295872a9ffcac5425011c661'
  | '_0xff1489227bbaac61a9209a08929e4c2a526ddd17';

export type Trade = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  account: Scalars['String'];
  collateralToken: Scalars['String'];
  indexToken: Scalars['String'];
  isLong: Scalars['Boolean'];
  key: Scalars['String'];
  status: Status;
  increaseList: Array<IncreasePosition>;
  decreaseList: Array<DecreasePosition>;
  updateList: Array<UpdatePosition>;
  sizeDelta: Scalars['BigInt'];
  collateralDelta: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  size: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  averagePrice: Scalars['BigInt'];
  realisedPnl: Scalars['BigInt'];
  realisedPnlPercentage?: Maybe<Scalars['BigInt']>;
  entryFundingRate: Scalars['BigInt'];
  entryReferralCode: Scalars['String'];
  entryReferrer: Scalars['String'];
  settledTimestamp?: Maybe<Scalars['Int']>;
  closedPosition?: Maybe<ClosePosition>;
  liquidatedPosition?: Maybe<LiquidatePosition>;
};


export type TradeincreaseListArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IncreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<IncreasePosition_filter>;
};


export type TradedecreaseListArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DecreasePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DecreasePosition_filter>;
};


export type TradeupdateListArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdatePosition_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdatePosition_filter>;
};

export type Trade_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  account?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken?: InputMaybe<Scalars['String']>;
  collateralToken_not?: InputMaybe<Scalars['String']>;
  collateralToken_gt?: InputMaybe<Scalars['String']>;
  collateralToken_lt?: InputMaybe<Scalars['String']>;
  collateralToken_gte?: InputMaybe<Scalars['String']>;
  collateralToken_lte?: InputMaybe<Scalars['String']>;
  collateralToken_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  collateralToken_contains?: InputMaybe<Scalars['String']>;
  collateralToken_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains?: InputMaybe<Scalars['String']>;
  collateralToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with?: InputMaybe<Scalars['String']>;
  collateralToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken?: InputMaybe<Scalars['String']>;
  indexToken_not?: InputMaybe<Scalars['String']>;
  indexToken_gt?: InputMaybe<Scalars['String']>;
  indexToken_lt?: InputMaybe<Scalars['String']>;
  indexToken_gte?: InputMaybe<Scalars['String']>;
  indexToken_lte?: InputMaybe<Scalars['String']>;
  indexToken_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexToken_contains?: InputMaybe<Scalars['String']>;
  indexToken_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_contains?: InputMaybe<Scalars['String']>;
  indexToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexToken_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with?: InputMaybe<Scalars['String']>;
  indexToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with?: InputMaybe<Scalars['String']>;
  indexToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  isLong?: InputMaybe<Scalars['Boolean']>;
  isLong_not?: InputMaybe<Scalars['Boolean']>;
  isLong_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  status_not?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not_in?: InputMaybe<Array<Status>>;
  increaseList?: InputMaybe<Array<Scalars['String']>>;
  increaseList_not?: InputMaybe<Array<Scalars['String']>>;
  increaseList_contains?: InputMaybe<Array<Scalars['String']>>;
  increaseList_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  increaseList_not_contains?: InputMaybe<Array<Scalars['String']>>;
  increaseList_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  increaseList_?: InputMaybe<IncreasePosition_filter>;
  decreaseList?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_not?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_contains?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_not_contains?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  decreaseList_?: InputMaybe<DecreasePosition_filter>;
  updateList?: InputMaybe<Array<Scalars['String']>>;
  updateList_not?: InputMaybe<Array<Scalars['String']>>;
  updateList_contains?: InputMaybe<Array<Scalars['String']>>;
  updateList_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  updateList_not_contains?: InputMaybe<Array<Scalars['String']>>;
  updateList_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  updateList_?: InputMaybe<UpdatePosition_filter>;
  sizeDelta?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_not?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lt?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_gte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_lte?: InputMaybe<Scalars['BigInt']>;
  sizeDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sizeDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralDelta?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_not?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lt?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_gte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_lte?: InputMaybe<Scalars['BigInt']>;
  collateralDelta_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateralDelta_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice?: InputMaybe<Scalars['BigInt']>;
  averagePrice_not?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnlPercentage?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_not?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  realisedPnlPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnlPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_not?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryReferralCode?: InputMaybe<Scalars['String']>;
  entryReferralCode_not?: InputMaybe<Scalars['String']>;
  entryReferralCode_gt?: InputMaybe<Scalars['String']>;
  entryReferralCode_lt?: InputMaybe<Scalars['String']>;
  entryReferralCode_gte?: InputMaybe<Scalars['String']>;
  entryReferralCode_lte?: InputMaybe<Scalars['String']>;
  entryReferralCode_in?: InputMaybe<Array<Scalars['String']>>;
  entryReferralCode_not_in?: InputMaybe<Array<Scalars['String']>>;
  entryReferralCode_contains?: InputMaybe<Scalars['String']>;
  entryReferralCode_contains_nocase?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_contains?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_contains_nocase?: InputMaybe<Scalars['String']>;
  entryReferralCode_starts_with?: InputMaybe<Scalars['String']>;
  entryReferralCode_starts_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_starts_with?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferralCode_ends_with?: InputMaybe<Scalars['String']>;
  entryReferralCode_ends_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_ends_with?: InputMaybe<Scalars['String']>;
  entryReferralCode_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer?: InputMaybe<Scalars['String']>;
  entryReferrer_not?: InputMaybe<Scalars['String']>;
  entryReferrer_gt?: InputMaybe<Scalars['String']>;
  entryReferrer_lt?: InputMaybe<Scalars['String']>;
  entryReferrer_gte?: InputMaybe<Scalars['String']>;
  entryReferrer_lte?: InputMaybe<Scalars['String']>;
  entryReferrer_in?: InputMaybe<Array<Scalars['String']>>;
  entryReferrer_not_in?: InputMaybe<Array<Scalars['String']>>;
  entryReferrer_contains?: InputMaybe<Scalars['String']>;
  entryReferrer_contains_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer_not_contains?: InputMaybe<Scalars['String']>;
  entryReferrer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer_starts_with?: InputMaybe<Scalars['String']>;
  entryReferrer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer_not_starts_with?: InputMaybe<Scalars['String']>;
  entryReferrer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer_ends_with?: InputMaybe<Scalars['String']>;
  entryReferrer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  entryReferrer_not_ends_with?: InputMaybe<Scalars['String']>;
  entryReferrer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  settledTimestamp?: InputMaybe<Scalars['Int']>;
  settledTimestamp_not?: InputMaybe<Scalars['Int']>;
  settledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  settledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  settledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  settledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  settledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  settledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  closedPosition?: InputMaybe<Scalars['String']>;
  closedPosition_not?: InputMaybe<Scalars['String']>;
  closedPosition_gt?: InputMaybe<Scalars['String']>;
  closedPosition_lt?: InputMaybe<Scalars['String']>;
  closedPosition_gte?: InputMaybe<Scalars['String']>;
  closedPosition_lte?: InputMaybe<Scalars['String']>;
  closedPosition_in?: InputMaybe<Array<Scalars['String']>>;
  closedPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  closedPosition_contains?: InputMaybe<Scalars['String']>;
  closedPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_not_contains?: InputMaybe<Scalars['String']>;
  closedPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_starts_with?: InputMaybe<Scalars['String']>;
  closedPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  closedPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_ends_with?: InputMaybe<Scalars['String']>;
  closedPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  closedPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  closedPosition_?: InputMaybe<ClosePosition_filter>;
  liquidatedPosition?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not?: InputMaybe<Scalars['String']>;
  liquidatedPosition_gt?: InputMaybe<Scalars['String']>;
  liquidatedPosition_lt?: InputMaybe<Scalars['String']>;
  liquidatedPosition_gte?: InputMaybe<Scalars['String']>;
  liquidatedPosition_lte?: InputMaybe<Scalars['String']>;
  liquidatedPosition_in?: InputMaybe<Array<Scalars['String']>>;
  liquidatedPosition_not_in?: InputMaybe<Array<Scalars['String']>>;
  liquidatedPosition_contains?: InputMaybe<Scalars['String']>;
  liquidatedPosition_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_contains?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_contains_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_starts_with?: InputMaybe<Scalars['String']>;
  liquidatedPosition_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_starts_with?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_ends_with?: InputMaybe<Scalars['String']>;
  liquidatedPosition_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_ends_with?: InputMaybe<Scalars['String']>;
  liquidatedPosition_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  liquidatedPosition_?: InputMaybe<LiquidatePosition_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Trade_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Trade_filter>>>;
};

export type Trade_orderBy =
  | 'id'
  | 'timestamp'
  | 'account'
  | 'collateralToken'
  | 'indexToken'
  | 'isLong'
  | 'key'
  | 'status'
  | 'increaseList'
  | 'decreaseList'
  | 'updateList'
  | 'sizeDelta'
  | 'collateralDelta'
  | 'fee'
  | 'size'
  | 'collateral'
  | 'averagePrice'
  | 'realisedPnl'
  | 'realisedPnlPercentage'
  | 'entryFundingRate'
  | 'entryReferralCode'
  | 'entryReferrer'
  | 'settledTimestamp'
  | 'closedPosition'
  | 'closedPosition__id'
  | 'closedPosition__timestamp'
  | 'closedPosition__key'
  | 'closedPosition__size'
  | 'closedPosition__collateral'
  | 'closedPosition__reserveAmount'
  | 'closedPosition__realisedPnl'
  | 'closedPosition__averagePrice'
  | 'closedPosition__entryFundingRate'
  | 'liquidatedPosition'
  | 'liquidatedPosition__id'
  | 'liquidatedPosition__timestamp'
  | 'liquidatedPosition__key'
  | 'liquidatedPosition__account'
  | 'liquidatedPosition__collateralToken'
  | 'liquidatedPosition__indexToken'
  | 'liquidatedPosition__isLong'
  | 'liquidatedPosition__size'
  | 'liquidatedPosition__collateral'
  | 'liquidatedPosition__reserveAmount'
  | 'liquidatedPosition__realisedPnl'
  | 'liquidatedPosition__markPrice';

export type Transfer = {
  id: Scalars['ID'];
  token: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
  amount: Scalars['BigInt'];
  amountUsd: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUsd?: InputMaybe<Scalars['BigInt']>;
  amountUsd_not?: InputMaybe<Scalars['BigInt']>;
  amountUsd_gt?: InputMaybe<Scalars['BigInt']>;
  amountUsd_lt?: InputMaybe<Scalars['BigInt']>;
  amountUsd_gte?: InputMaybe<Scalars['BigInt']>;
  amountUsd_lte?: InputMaybe<Scalars['BigInt']>;
  amountUsd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountUsd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'token'
  | 'from'
  | 'to'
  | 'amount'
  | 'amountUsd'
  | 'timestamp';

export type UpdatePosition = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  key: Scalars['String'];
  size: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  reserveAmount: Scalars['BigInt'];
  realisedPnl: Scalars['BigInt'];
  averagePrice: Scalars['BigInt'];
  entryFundingRate: Scalars['BigInt'];
  markPrice: Scalars['BigInt'];
};

export type UpdatePosition_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  key?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_contains_nocase?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_contains_nocase?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_ends_with_nocase?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['BigInt']>;
  size_not?: InputMaybe<Scalars['BigInt']>;
  size_gt?: InputMaybe<Scalars['BigInt']>;
  size_lt?: InputMaybe<Scalars['BigInt']>;
  size_gte?: InputMaybe<Scalars['BigInt']>;
  size_lte?: InputMaybe<Scalars['BigInt']>;
  size_in?: InputMaybe<Array<Scalars['BigInt']>>;
  size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral?: InputMaybe<Scalars['BigInt']>;
  collateral_not?: InputMaybe<Scalars['BigInt']>;
  collateral_gt?: InputMaybe<Scalars['BigInt']>;
  collateral_lt?: InputMaybe<Scalars['BigInt']>;
  collateral_gte?: InputMaybe<Scalars['BigInt']>;
  collateral_lte?: InputMaybe<Scalars['BigInt']>;
  collateral_in?: InputMaybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_not?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lt?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_gte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_lte?: InputMaybe<Scalars['BigInt']>;
  reserveAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserveAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_not?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lt?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_gte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_lte?: InputMaybe<Scalars['BigInt']>;
  realisedPnl_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realisedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice?: InputMaybe<Scalars['BigInt']>;
  averagePrice_not?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lt?: InputMaybe<Scalars['BigInt']>;
  averagePrice_gte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_lte?: InputMaybe<Scalars['BigInt']>;
  averagePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  averagePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_not?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lt?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_gte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_lte?: InputMaybe<Scalars['BigInt']>;
  entryFundingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  entryFundingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice?: InputMaybe<Scalars['BigInt']>;
  markPrice_not?: InputMaybe<Scalars['BigInt']>;
  markPrice_gt?: InputMaybe<Scalars['BigInt']>;
  markPrice_lt?: InputMaybe<Scalars['BigInt']>;
  markPrice_gte?: InputMaybe<Scalars['BigInt']>;
  markPrice_lte?: InputMaybe<Scalars['BigInt']>;
  markPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  markPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdatePosition_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdatePosition_filter>>>;
};

export type UpdatePosition_orderBy =
  | 'id'
  | 'timestamp'
  | 'key'
  | 'size'
  | 'collateral'
  | 'reserveAmount'
  | 'realisedPnl'
  | 'averagePrice'
  | 'entryFundingRate'
  | 'markPrice';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  pricefeed: InContextSdkMethod<Query['pricefeed'], QuerypricefeedArgs, MeshContext>,
  /** null **/
  pricefeeds: InContextSdkMethod<Query['pricefeeds'], QuerypricefeedsArgs, MeshContext>,
  /** null **/
  priceLatest: InContextSdkMethod<Query['priceLatest'], QuerypriceLatestArgs, MeshContext>,
  /** null **/
  priceLatests: InContextSdkMethod<Query['priceLatests'], QuerypriceLatestsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Query['claim'], QueryclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Query['claims'], QueryclaimsArgs, MeshContext>,
  /** null **/
  increasePosition: InContextSdkMethod<Query['increasePosition'], QueryincreasePositionArgs, MeshContext>,
  /** null **/
  increasePositions: InContextSdkMethod<Query['increasePositions'], QueryincreasePositionsArgs, MeshContext>,
  /** null **/
  decreasePosition: InContextSdkMethod<Query['decreasePosition'], QuerydecreasePositionArgs, MeshContext>,
  /** null **/
  decreasePositions: InContextSdkMethod<Query['decreasePositions'], QuerydecreasePositionsArgs, MeshContext>,
  /** null **/
  updatePosition: InContextSdkMethod<Query['updatePosition'], QueryupdatePositionArgs, MeshContext>,
  /** null **/
  updatePositions: InContextSdkMethod<Query['updatePositions'], QueryupdatePositionsArgs, MeshContext>,
  /** null **/
  referralAdjustment: InContextSdkMethod<Query['referralAdjustment'], QueryreferralAdjustmentArgs, MeshContext>,
  /** null **/
  referralAdjustments: InContextSdkMethod<Query['referralAdjustments'], QueryreferralAdjustmentsArgs, MeshContext>,
  /** null **/
  closePosition: InContextSdkMethod<Query['closePosition'], QueryclosePositionArgs, MeshContext>,
  /** null **/
  closePositions: InContextSdkMethod<Query['closePositions'], QueryclosePositionsArgs, MeshContext>,
  /** null **/
  liquidatePosition: InContextSdkMethod<Query['liquidatePosition'], QueryliquidatePositionArgs, MeshContext>,
  /** null **/
  liquidatePositions: InContextSdkMethod<Query['liquidatePositions'], QueryliquidatePositionsArgs, MeshContext>,
  /** null **/
  trade: InContextSdkMethod<Query['trade'], QuerytradeArgs, MeshContext>,
  /** null **/
  trades: InContextSdkMethod<Query['trades'], QuerytradesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  pricefeed: InContextSdkMethod<Subscription['pricefeed'], SubscriptionpricefeedArgs, MeshContext>,
  /** null **/
  pricefeeds: InContextSdkMethod<Subscription['pricefeeds'], SubscriptionpricefeedsArgs, MeshContext>,
  /** null **/
  priceLatest: InContextSdkMethod<Subscription['priceLatest'], SubscriptionpriceLatestArgs, MeshContext>,
  /** null **/
  priceLatests: InContextSdkMethod<Subscription['priceLatests'], SubscriptionpriceLatestsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
  /** null **/
  claim: InContextSdkMethod<Subscription['claim'], SubscriptionclaimArgs, MeshContext>,
  /** null **/
  claims: InContextSdkMethod<Subscription['claims'], SubscriptionclaimsArgs, MeshContext>,
  /** null **/
  increasePosition: InContextSdkMethod<Subscription['increasePosition'], SubscriptionincreasePositionArgs, MeshContext>,
  /** null **/
  increasePositions: InContextSdkMethod<Subscription['increasePositions'], SubscriptionincreasePositionsArgs, MeshContext>,
  /** null **/
  decreasePosition: InContextSdkMethod<Subscription['decreasePosition'], SubscriptiondecreasePositionArgs, MeshContext>,
  /** null **/
  decreasePositions: InContextSdkMethod<Subscription['decreasePositions'], SubscriptiondecreasePositionsArgs, MeshContext>,
  /** null **/
  updatePosition: InContextSdkMethod<Subscription['updatePosition'], SubscriptionupdatePositionArgs, MeshContext>,
  /** null **/
  updatePositions: InContextSdkMethod<Subscription['updatePositions'], SubscriptionupdatePositionsArgs, MeshContext>,
  /** null **/
  referralAdjustment: InContextSdkMethod<Subscription['referralAdjustment'], SubscriptionreferralAdjustmentArgs, MeshContext>,
  /** null **/
  referralAdjustments: InContextSdkMethod<Subscription['referralAdjustments'], SubscriptionreferralAdjustmentsArgs, MeshContext>,
  /** null **/
  closePosition: InContextSdkMethod<Subscription['closePosition'], SubscriptionclosePositionArgs, MeshContext>,
  /** null **/
  closePositions: InContextSdkMethod<Subscription['closePositions'], SubscriptionclosePositionsArgs, MeshContext>,
  /** null **/
  liquidatePosition: InContextSdkMethod<Subscription['liquidatePosition'], SubscriptionliquidatePositionArgs, MeshContext>,
  /** null **/
  liquidatePositions: InContextSdkMethod<Subscription['liquidatePositions'], SubscriptionliquidatePositionsArgs, MeshContext>,
  /** null **/
  trade: InContextSdkMethod<Subscription['trade'], SubscriptiontradeArgs, MeshContext>,
  /** null **/
  trades: InContextSdkMethod<Subscription['trades'], SubscriptiontradesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["gmx"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
