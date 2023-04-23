// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { GmxTypes } from './sources/gmx/types';
import * as importedModule$0 from "./sources/gmx/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Claim: ResolverTypeWrapper<Claim>;
  Claim_filter: Claim_filter;
  Claim_orderBy: Claim_orderBy;
  ClosePosition: ResolverTypeWrapper<ClosePosition>;
  ClosePosition_filter: ClosePosition_filter;
  ClosePosition_orderBy: ClosePosition_orderBy;
  DecreasePosition: ResolverTypeWrapper<DecreasePosition>;
  DecreasePosition_filter: DecreasePosition_filter;
  DecreasePosition_orderBy: DecreasePosition_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IncreasePosition: ResolverTypeWrapper<IncreasePosition>;
  IncreasePosition_filter: IncreasePosition_filter;
  IncreasePosition_orderBy: IncreasePosition_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalTime: IntervalTime;
  LiquidatePosition: ResolverTypeWrapper<LiquidatePosition>;
  LiquidatePosition_filter: LiquidatePosition_filter;
  LiquidatePosition_orderBy: LiquidatePosition_orderBy;
  OrderDirection: OrderDirection;
  PriceLatest: ResolverTypeWrapper<PriceLatest>;
  PriceLatest_filter: PriceLatest_filter;
  PriceLatest_orderBy: PriceLatest_orderBy;
  Pricefeed: ResolverTypeWrapper<Pricefeed>;
  Pricefeed_filter: Pricefeed_filter;
  Pricefeed_orderBy: Pricefeed_orderBy;
  Query: ResolverTypeWrapper<{}>;
  ReferralAdjustment: ResolverTypeWrapper<ReferralAdjustment>;
  ReferralAdjustment_filter: ReferralAdjustment_filter;
  ReferralAdjustment_orderBy: ReferralAdjustment_orderBy;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TokenAddress: TokenAddress;
  Trade: ResolverTypeWrapper<Trade>;
  Trade_filter: Trade_filter;
  Trade_orderBy: Trade_orderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  UpdatePosition: ResolverTypeWrapper<UpdatePosition>;
  UpdatePosition_filter: UpdatePosition_filter;
  UpdatePosition_orderBy: UpdatePosition_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Claim: Claim;
  Claim_filter: Claim_filter;
  ClosePosition: ClosePosition;
  ClosePosition_filter: ClosePosition_filter;
  DecreasePosition: DecreasePosition;
  DecreasePosition_filter: DecreasePosition_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  IncreasePosition: IncreasePosition;
  IncreasePosition_filter: IncreasePosition_filter;
  Int: Scalars['Int'];
  LiquidatePosition: LiquidatePosition;
  LiquidatePosition_filter: LiquidatePosition_filter;
  PriceLatest: PriceLatest;
  PriceLatest_filter: PriceLatest_filter;
  Pricefeed: Pricefeed;
  Pricefeed_filter: Pricefeed_filter;
  Query: {};
  ReferralAdjustment: ReferralAdjustment;
  ReferralAdjustment_filter: ReferralAdjustment_filter;
  String: Scalars['String'];
  Subscription: {};
  Trade: Trade;
  Trade_filter: Trade_filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  UpdatePosition: UpdatePosition;
  UpdatePosition_filter: UpdatePosition_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ClaimResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Claim'] = ResolversParentTypes['Claim']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amountUsd?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClosePositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ClosePosition'] = ResolversParentTypes['ClosePosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserveAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realisedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averagePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  entryFundingRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DecreasePositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DecreasePosition'] = ResolversParentTypes['DecreasePosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isLong?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sizeDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IncreasePositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['IncreasePosition'] = ResolversParentTypes['IncreasePosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isLong?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sizeDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LiquidatePositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LiquidatePosition'] = ResolversParentTypes['LiquidatePosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isLong?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserveAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realisedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  markPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PriceLatestResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PriceLatest'] = ResolversParentTypes['PriceLatest']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PricefeedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pricefeed'] = ResolversParentTypes['Pricefeed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  o?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  h?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  l?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  c?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenAddress?: Resolver<ResolversTypes['TokenAddress'], ParentType, ContextType>;
  interval?: Resolver<ResolversTypes['IntervalTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  pricefeed?: Resolver<Maybe<ResolversTypes['Pricefeed']>, ParentType, ContextType, RequireFields<QuerypricefeedArgs, 'id' | 'subgraphError'>>;
  pricefeeds?: Resolver<Array<ResolversTypes['Pricefeed']>, ParentType, ContextType, RequireFields<QuerypricefeedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  priceLatest?: Resolver<Maybe<ResolversTypes['PriceLatest']>, ParentType, ContextType, RequireFields<QuerypriceLatestArgs, 'id' | 'subgraphError'>>;
  priceLatests?: Resolver<Array<ResolversTypes['PriceLatest']>, ParentType, ContextType, RequireFields<QuerypriceLatestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: Resolver<Maybe<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimArgs, 'id' | 'subgraphError'>>;
  claims?: Resolver<Array<ResolversTypes['Claim']>, ParentType, ContextType, RequireFields<QueryclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  increasePosition?: Resolver<Maybe<ResolversTypes['IncreasePosition']>, ParentType, ContextType, RequireFields<QueryincreasePositionArgs, 'id' | 'subgraphError'>>;
  increasePositions?: Resolver<Array<ResolversTypes['IncreasePosition']>, ParentType, ContextType, RequireFields<QueryincreasePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  decreasePosition?: Resolver<Maybe<ResolversTypes['DecreasePosition']>, ParentType, ContextType, RequireFields<QuerydecreasePositionArgs, 'id' | 'subgraphError'>>;
  decreasePositions?: Resolver<Array<ResolversTypes['DecreasePosition']>, ParentType, ContextType, RequireFields<QuerydecreasePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updatePosition?: Resolver<Maybe<ResolversTypes['UpdatePosition']>, ParentType, ContextType, RequireFields<QueryupdatePositionArgs, 'id' | 'subgraphError'>>;
  updatePositions?: Resolver<Array<ResolversTypes['UpdatePosition']>, ParentType, ContextType, RequireFields<QueryupdatePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  referralAdjustment?: Resolver<Maybe<ResolversTypes['ReferralAdjustment']>, ParentType, ContextType, RequireFields<QueryreferralAdjustmentArgs, 'id' | 'subgraphError'>>;
  referralAdjustments?: Resolver<Array<ResolversTypes['ReferralAdjustment']>, ParentType, ContextType, RequireFields<QueryreferralAdjustmentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  closePosition?: Resolver<Maybe<ResolversTypes['ClosePosition']>, ParentType, ContextType, RequireFields<QueryclosePositionArgs, 'id' | 'subgraphError'>>;
  closePositions?: Resolver<Array<ResolversTypes['ClosePosition']>, ParentType, ContextType, RequireFields<QueryclosePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidatePosition?: Resolver<Maybe<ResolversTypes['LiquidatePosition']>, ParentType, ContextType, RequireFields<QueryliquidatePositionArgs, 'id' | 'subgraphError'>>;
  liquidatePositions?: Resolver<Array<ResolversTypes['LiquidatePosition']>, ParentType, ContextType, RequireFields<QueryliquidatePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  trade?: Resolver<Maybe<ResolversTypes['Trade']>, ParentType, ContextType, RequireFields<QuerytradeArgs, 'id' | 'subgraphError'>>;
  trades?: Resolver<Array<ResolversTypes['Trade']>, ParentType, ContextType, RequireFields<QuerytradesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type ReferralAdjustmentResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ReferralAdjustment'] = ResolversParentTypes['ReferralAdjustment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sizeDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  marginFeeBasisPoints?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  referralCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  referrer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  pricefeed?: SubscriptionResolver<Maybe<ResolversTypes['Pricefeed']>, "pricefeed", ParentType, ContextType, RequireFields<SubscriptionpricefeedArgs, 'id' | 'subgraphError'>>;
  pricefeeds?: SubscriptionResolver<Array<ResolversTypes['Pricefeed']>, "pricefeeds", ParentType, ContextType, RequireFields<SubscriptionpricefeedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  priceLatest?: SubscriptionResolver<Maybe<ResolversTypes['PriceLatest']>, "priceLatest", ParentType, ContextType, RequireFields<SubscriptionpriceLatestArgs, 'id' | 'subgraphError'>>;
  priceLatests?: SubscriptionResolver<Array<ResolversTypes['PriceLatest']>, "priceLatests", ParentType, ContextType, RequireFields<SubscriptionpriceLatestsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  claim?: SubscriptionResolver<Maybe<ResolversTypes['Claim']>, "claim", ParentType, ContextType, RequireFields<SubscriptionclaimArgs, 'id' | 'subgraphError'>>;
  claims?: SubscriptionResolver<Array<ResolversTypes['Claim']>, "claims", ParentType, ContextType, RequireFields<SubscriptionclaimsArgs, 'skip' | 'first' | 'subgraphError'>>;
  increasePosition?: SubscriptionResolver<Maybe<ResolversTypes['IncreasePosition']>, "increasePosition", ParentType, ContextType, RequireFields<SubscriptionincreasePositionArgs, 'id' | 'subgraphError'>>;
  increasePositions?: SubscriptionResolver<Array<ResolversTypes['IncreasePosition']>, "increasePositions", ParentType, ContextType, RequireFields<SubscriptionincreasePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  decreasePosition?: SubscriptionResolver<Maybe<ResolversTypes['DecreasePosition']>, "decreasePosition", ParentType, ContextType, RequireFields<SubscriptiondecreasePositionArgs, 'id' | 'subgraphError'>>;
  decreasePositions?: SubscriptionResolver<Array<ResolversTypes['DecreasePosition']>, "decreasePositions", ParentType, ContextType, RequireFields<SubscriptiondecreasePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updatePosition?: SubscriptionResolver<Maybe<ResolversTypes['UpdatePosition']>, "updatePosition", ParentType, ContextType, RequireFields<SubscriptionupdatePositionArgs, 'id' | 'subgraphError'>>;
  updatePositions?: SubscriptionResolver<Array<ResolversTypes['UpdatePosition']>, "updatePositions", ParentType, ContextType, RequireFields<SubscriptionupdatePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  referralAdjustment?: SubscriptionResolver<Maybe<ResolversTypes['ReferralAdjustment']>, "referralAdjustment", ParentType, ContextType, RequireFields<SubscriptionreferralAdjustmentArgs, 'id' | 'subgraphError'>>;
  referralAdjustments?: SubscriptionResolver<Array<ResolversTypes['ReferralAdjustment']>, "referralAdjustments", ParentType, ContextType, RequireFields<SubscriptionreferralAdjustmentsArgs, 'skip' | 'first' | 'subgraphError'>>;
  closePosition?: SubscriptionResolver<Maybe<ResolversTypes['ClosePosition']>, "closePosition", ParentType, ContextType, RequireFields<SubscriptionclosePositionArgs, 'id' | 'subgraphError'>>;
  closePositions?: SubscriptionResolver<Array<ResolversTypes['ClosePosition']>, "closePositions", ParentType, ContextType, RequireFields<SubscriptionclosePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidatePosition?: SubscriptionResolver<Maybe<ResolversTypes['LiquidatePosition']>, "liquidatePosition", ParentType, ContextType, RequireFields<SubscriptionliquidatePositionArgs, 'id' | 'subgraphError'>>;
  liquidatePositions?: SubscriptionResolver<Array<ResolversTypes['LiquidatePosition']>, "liquidatePositions", ParentType, ContextType, RequireFields<SubscriptionliquidatePositionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  trade?: SubscriptionResolver<Maybe<ResolversTypes['Trade']>, "trade", ParentType, ContextType, RequireFields<SubscriptiontradeArgs, 'id' | 'subgraphError'>>;
  trades?: SubscriptionResolver<Array<ResolversTypes['Trade']>, "trades", ParentType, ContextType, RequireFields<SubscriptiontradesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TradeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Trade'] = ResolversParentTypes['Trade']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  collateralToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  indexToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isLong?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  increaseList?: Resolver<Array<ResolversTypes['IncreasePosition']>, ParentType, ContextType, RequireFields<TradeincreaseListArgs, 'skip' | 'first'>>;
  decreaseList?: Resolver<Array<ResolversTypes['DecreasePosition']>, ParentType, ContextType, RequireFields<TradedecreaseListArgs, 'skip' | 'first'>>;
  updateList?: Resolver<Array<ResolversTypes['UpdatePosition']>, ParentType, ContextType, RequireFields<TradeupdateListArgs, 'skip' | 'first'>>;
  sizeDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateralDelta?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averagePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realisedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realisedPnlPercentage?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  entryFundingRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  entryReferralCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  entryReferrer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settledTimestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  closedPosition?: Resolver<Maybe<ResolversTypes['ClosePosition']>, ParentType, ContextType>;
  liquidatedPosition?: Resolver<Maybe<ResolversTypes['LiquidatePosition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amountUsd?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdatePositionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdatePosition'] = ResolversParentTypes['UpdatePosition']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collateral?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserveAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  realisedPnl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  averagePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  entryFundingRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  markPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Claim?: ClaimResolvers<ContextType>;
  ClosePosition?: ClosePositionResolvers<ContextType>;
  DecreasePosition?: DecreasePositionResolvers<ContextType>;
  IncreasePosition?: IncreasePositionResolvers<ContextType>;
  LiquidatePosition?: LiquidatePositionResolvers<ContextType>;
  PriceLatest?: PriceLatestResolvers<ContextType>;
  Pricefeed?: PricefeedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReferralAdjustment?: ReferralAdjustmentResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Trade?: TradeResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  UpdatePosition?: UpdatePositionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = GmxTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/gmx/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const gmxTransforms = [];
const additionalTypeDefs = [] as any[];
const gmxHandler = new GraphqlHandler({
              name: "gmx",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum","retry":2,"timeout":10000},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("gmx"),
              logger: logger.child("gmx"),
              importFn,
            });
sources[0] = {
          name: 'gmx',
          handler: gmxHandler,
          transforms: gmxTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 10000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: AccountTradeListDocument,
        get rawSDL() {
          return printWithCache(AccountTradeListDocument);
        },
        location: 'AccountTradeListDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type AccountTradeListQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']>;
  account?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
}>;


export type AccountTradeListQuery = { trades: Array<(
    Pick<Trade, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'status' | 'sizeDelta' | 'collateralDelta' | 'fee' | 'size' | 'collateral' | 'averagePrice' | 'realisedPnl' | 'realisedPnlPercentage' | 'settledTimestamp'>
    & { increaseList: Array<Pick<IncreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>>, decreaseList: Array<Pick<DecreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>>, updateList: Array<Pick<UpdatePosition, 'id' | 'timestamp' | 'key' | 'size' | 'markPrice' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>>, closedPosition?: Maybe<Pick<ClosePosition, 'id' | 'timestamp' | 'key' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>>, liquidatedPosition?: Maybe<Pick<LiquidatePosition, 'id' | 'timestamp' | 'key' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'markPrice'>> }
  )> };

export type increasePositionFieldsFragment = Pick<IncreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>;

export type decreasePositionFieldsFragment = Pick<DecreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>;

export type updatePositionFieldsFragment = Pick<UpdatePosition, 'id' | 'timestamp' | 'key' | 'size' | 'markPrice' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>;

export type closePositionFieldsFragment = Pick<ClosePosition, 'id' | 'timestamp' | 'key' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>;

export type liquidatePositionFieldsFragment = Pick<LiquidatePosition, 'id' | 'timestamp' | 'key' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'markPrice'>;

export type tradeFieldsFragment = (
  Pick<Trade, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'status' | 'sizeDelta' | 'collateralDelta' | 'fee' | 'size' | 'collateral' | 'averagePrice' | 'realisedPnl' | 'realisedPnlPercentage' | 'settledTimestamp'>
  & { increaseList: Array<Pick<IncreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>>, decreaseList: Array<Pick<DecreasePosition, 'id' | 'timestamp' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'key' | 'collateralDelta' | 'sizeDelta' | 'fee' | 'price'>>, updateList: Array<Pick<UpdatePosition, 'id' | 'timestamp' | 'key' | 'size' | 'markPrice' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>>, closedPosition?: Maybe<Pick<ClosePosition, 'id' | 'timestamp' | 'key' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'averagePrice' | 'entryFundingRate'>>, liquidatedPosition?: Maybe<Pick<LiquidatePosition, 'id' | 'timestamp' | 'key' | 'account' | 'collateralToken' | 'indexToken' | 'isLong' | 'size' | 'collateral' | 'reserveAmount' | 'realisedPnl' | 'markPrice'>> }
);

export const increasePositionFieldsFragmentDoc = gql`
    fragment increasePositionFields on IncreasePosition {
  id
  timestamp
  account
  collateralToken
  indexToken
  isLong
  key
  collateralDelta
  sizeDelta
  fee
  price
}
    ` as unknown as DocumentNode<increasePositionFieldsFragment, unknown>;
export const decreasePositionFieldsFragmentDoc = gql`
    fragment decreasePositionFields on DecreasePosition {
  id
  timestamp
  account
  collateralToken
  indexToken
  isLong
  key
  collateralDelta
  sizeDelta
  fee
  price
}
    ` as unknown as DocumentNode<decreasePositionFieldsFragment, unknown>;
export const updatePositionFieldsFragmentDoc = gql`
    fragment updatePositionFields on UpdatePosition {
  id
  timestamp
  key
  size
  markPrice
  collateral
  reserveAmount
  realisedPnl
  averagePrice
  entryFundingRate
}
    ` as unknown as DocumentNode<updatePositionFieldsFragment, unknown>;
export const closePositionFieldsFragmentDoc = gql`
    fragment closePositionFields on ClosePosition {
  id
  timestamp
  key
  size
  collateral
  reserveAmount
  realisedPnl
  averagePrice
  entryFundingRate
}
    ` as unknown as DocumentNode<closePositionFieldsFragment, unknown>;
export const liquidatePositionFieldsFragmentDoc = gql`
    fragment liquidatePositionFields on LiquidatePosition {
  id
  timestamp
  key
  account
  collateralToken
  indexToken
  isLong
  size
  collateral
  reserveAmount
  realisedPnl
  markPrice
}
    ` as unknown as DocumentNode<liquidatePositionFieldsFragment, unknown>;
export const tradeFieldsFragmentDoc = gql`
    fragment tradeFields on Trade {
  id
  timestamp
  account
  collateralToken
  indexToken
  isLong
  key
  status
  increaseList(first: $pageSize) {
    ...increasePositionFields
  }
  decreaseList(first: $pageSize) {
    ...decreasePositionFields
  }
  updateList(first: $pageSize) {
    ...updatePositionFields
  }
  sizeDelta
  collateralDelta
  fee
  size
  collateral
  averagePrice
  realisedPnl
  realisedPnlPercentage
  settledTimestamp
  closedPosition {
    ...closePositionFields
  }
  liquidatedPosition {
    ...liquidatePositionFields
  }
}
    ${increasePositionFieldsFragmentDoc}
${decreasePositionFieldsFragmentDoc}
${updatePositionFieldsFragmentDoc}
${closePositionFieldsFragmentDoc}
${liquidatePositionFieldsFragmentDoc}` as unknown as DocumentNode<tradeFieldsFragment, unknown>;
export const AccountTradeListDocument = gql`
    query AccountTradeList($pageSize: Int = 10, $account: String, $status: Status) @live {
  trades(first: $pageSize, skip: 0, where: {account: $account, status: $status}) {
    ...tradeFields
  }
}
    ${tradeFieldsFragmentDoc}` as unknown as DocumentNode<AccountTradeListQuery, AccountTradeListQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    AccountTradeList(variables?: AccountTradeListQueryVariables, options?: C): AsyncIterable<AccountTradeListQuery> {
      return requester<AccountTradeListQuery, AccountTradeListQueryVariables>(AccountTradeListDocument, variables, options) as AsyncIterable<AccountTradeListQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;