import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { getTokens, getWhitelistedTokens } from './tokens';
import { getContract } from '../config/contracts';
import { VaultReader__factory } from '../contracts/types';
import { bigNumberify, bigNumberifyArray, expandDecimals } from '../wallets/numbers';
import { getServerUrl } from '../config/backend';
import { InfoTokens, Token, TokenInfo } from '../types';
import { ARBITRUM } from '../config/chains';
import client from 'src/common/http-client';

const DEFAULT_MAX_USDG_AMOUNT = expandDecimals(200 * 1000 * 1000, 18);
const BASIS_POINTS_DIVISOR = 10000;
const MAX_PRICE_DEVIATION_BASIS_POINTS = 750;

export async function useInfoTokens(
  provider: ethers.AlchemyProvider | undefined,
  chainId: number,
  active: boolean,
  tokenBalances?: BigNumber[],
  fundingRateInfo?: BigNumber[],
  vaultPropsLength?: number,
) {
  const tokens = getTokens(chainId);
  const vaultReaderAddress = getContract(chainId, 'VaultReader');
  const vaultAddress = getContract(chainId, 'Vault');
  const positionRouterAddress = getContract(chainId, 'PositionRouter');
  const nativeTokenAddress = getContract(chainId, 'NATIVE_TOKEN');

  const whitelistedTokens = getWhitelistedTokens(chainId);
  const whitelistedTokenAddresses = whitelistedTokens.map((token) => token.address);

  const vaultReader = VaultReader__factory.connect(vaultReaderAddress, provider);
  const vaultTokenInfo = await vaultReader.getVaultTokenInfoV4(
    vaultAddress,
    positionRouterAddress,
    nativeTokenAddress,
    BigInt(expandDecimals(1, 18).toString()),
    whitelistedTokenAddresses,
  );

  const indexPricesUrl = getServerUrl(chainId, '/prices');

  const indexPrices = (await client.get<{ [address: string]: BigNumber }>(indexPricesUrl)).data;

  return {
    infoTokens: getInfoTokens(
      tokens,
      tokenBalances,
      whitelistedTokens,
      bigNumberifyArray(vaultTokenInfo),
      fundingRateInfo,
      vaultPropsLength,
      indexPrices,
      nativeTokenAddress,
    ),
  };
}

function getInfoTokens(
  tokens: Token[],
  tokenBalances: BigNumber[] | undefined,
  whitelistedTokens: Token[],
  vaultTokenInfo: BigNumber[] | undefined,
  fundingRateInfo: BigNumber[] | undefined,
  vaultPropsLength: number | undefined,
  indexPrices: { [address: string]: BigNumber },
  nativeTokenAddress: string,
): InfoTokens {
  if (!vaultPropsLength) {
    vaultPropsLength = 15;
  }
  const fundingRatePropsLength = 2;
  const infoTokens: InfoTokens = {};

  for (let i = 0; i < tokens.length; i++) {
    const token = JSON.parse(JSON.stringify(tokens[i])) as TokenInfo;

    if (tokenBalances) {
      token.balance = tokenBalances[i];
    }

    const CHAIN_ID = ARBITRUM;
    const USDG_ADDRESS = getContract(CHAIN_ID, 'USDG');
    const USD_DECIMALS = 30;

    if (token.address === USDG_ADDRESS) {
      token.minPrice = expandDecimals(1, USD_DECIMALS);
      token.maxPrice = expandDecimals(1, USD_DECIMALS);
    }

    infoTokens[token.address] = token;
  }

  for (let i = 0; i < whitelistedTokens.length; i++) {
    const token = JSON.parse(JSON.stringify(whitelistedTokens[i])) as TokenInfo;

    if (vaultTokenInfo) {
      token.poolAmount = vaultTokenInfo[i * vaultPropsLength];
      token.reservedAmount = vaultTokenInfo[i * vaultPropsLength + 1];
      token.availableAmount = token.poolAmount.minus(token.reservedAmount);
      token.usdgAmount = vaultTokenInfo[i * vaultPropsLength + 2];
      token.redemptionAmount = vaultTokenInfo[i * vaultPropsLength + 3];
      token.weight = vaultTokenInfo[i * vaultPropsLength + 4];
      token.bufferAmount = vaultTokenInfo[i * vaultPropsLength + 5];
      token.maxUsdgAmount = vaultTokenInfo[i * vaultPropsLength + 6];
      token.globalShortSize = vaultTokenInfo[i * vaultPropsLength + 7];
      token.maxGlobalShortSize = vaultTokenInfo[i * vaultPropsLength + 8];
      token.maxGlobalLongSize = vaultTokenInfo[i * vaultPropsLength + 9];
      token.minPrice = vaultTokenInfo[i * vaultPropsLength + 10];
      token.maxPrice = vaultTokenInfo[i * vaultPropsLength + 11];
      token.spread = getSpread({
        minPrice: token.minPrice,
        maxPrice: token.maxPrice,
      });
      token.guaranteedUsd = vaultTokenInfo[i * vaultPropsLength + 12];
      token.maxPrimaryPrice = vaultTokenInfo[i * vaultPropsLength + 13];
      token.minPrimaryPrice = vaultTokenInfo[i * vaultPropsLength + 14];

      // save minPrice and maxPrice as setTokenUsingIndexPrices may override it
      token.contractMinPrice = token.minPrice;
      token.contractMaxPrice = token.maxPrice;

      token.maxAvailableShort = bigNumberify(0);

      token.hasMaxAvailableShort = false;
      if (token.maxGlobalShortSize.gt(0)) {
        token.hasMaxAvailableShort = true;
        if (token.maxGlobalShortSize.gt(token.globalShortSize)) {
          token.maxAvailableShort = token.maxGlobalShortSize.minus(token.globalShortSize);
        }
      }

      if (token.maxUsdgAmount.eq(0)) {
        token.maxUsdgAmount = DEFAULT_MAX_USDG_AMOUNT;
      }

      token.availableUsd = token.isStable
        ? token.poolAmount.multipliedBy(token.minPrice).div(expandDecimals(1, token.decimals))
        : token.availableAmount.multipliedBy(token.minPrice).div(expandDecimals(1, token.decimals));

      token.maxAvailableLong = bigNumberify(0);
      token.hasMaxAvailableLong = false;
      if (token.maxGlobalLongSize.gt(0)) {
        token.hasMaxAvailableLong = true;

        if (token.maxGlobalLongSize.gt(token.guaranteedUsd)) {
          const remainingLongSize = token.maxGlobalLongSize.minus(token.guaranteedUsd);
          token.maxAvailableLong = remainingLongSize.lt(token.availableUsd) ? remainingLongSize : token.availableUsd;
        }
      } else {
        token.maxAvailableLong = token.availableUsd;
      }

      token.maxLongCapacity =
        token.maxGlobalLongSize.gt(0) && token.maxGlobalLongSize.lt(token.availableUsd.plus(token.guaranteedUsd))
          ? token.maxGlobalLongSize
          : token.availableUsd.plus(token.guaranteedUsd);

      token.managedUsd = token.availableUsd.plus(token.guaranteedUsd);
      token.managedAmount = token.managedUsd.multipliedBy(expandDecimals(1, token.decimals)).div(token.minPrice);

      setTokenUsingIndexPrices(token, indexPrices, nativeTokenAddress);
    }

    if (fundingRateInfo) {
      token.fundingRate = fundingRateInfo[i * fundingRatePropsLength];
      token.cumulativeFundingRate = fundingRateInfo[i * fundingRatePropsLength + 1];
    }

    if (infoTokens[token.address]) {
      token.balance = infoTokens[token.address].balance;
    }

    infoTokens[token.address] = token;
  }

  return infoTokens;
}

function setTokenUsingIndexPrices(token: TokenInfo, indexPrices: { [address: string]: BigNumber }, nativeTokenAddress: string) {
  if (!indexPrices) {
    return;
  }

  const tokenAddress = token.isNative ? nativeTokenAddress : token.address;

  const indexPrice = indexPrices[tokenAddress];

  if (!indexPrice) {
    return;
  }

  const indexPriceBn = BigNumber(indexPrice);

  if (indexPriceBn.eq(0)) {
    return;
  }

  if (!token.minPrice || !token.maxPrice) {
    return;
  }

  const spread = token.maxPrice.minus(token.minPrice);
  const spreadBps = spread.multipliedBy(BASIS_POINTS_DIVISOR).div(token.maxPrice.plus(token.minPrice).div(2));

  if (spreadBps.gt(MAX_PRICE_DEVIATION_BASIS_POINTS - 50)) {
    // only set one of the values as there will be a spread between the index price and the Chainlink price
    if (!token.minPrimaryPrice) {
      throw new Error('token.minPrimaryPrice undefined.');
    }

    if (indexPriceBn.gt(token.minPrimaryPrice)) {
      token.maxPrice = indexPriceBn;
    } else {
      token.minPrice = indexPriceBn;
    }
    return;
  }

  const halfSpreadBps = spreadBps.div(2).toNumber();
  token.maxPrice = indexPriceBn.multipliedBy(BASIS_POINTS_DIVISOR + halfSpreadBps).div(BASIS_POINTS_DIVISOR);
  token.minPrice = indexPriceBn.multipliedBy(BASIS_POINTS_DIVISOR - halfSpreadBps).div(BASIS_POINTS_DIVISOR);
}

function getSpread(p: { minPrice: BigNumber; maxPrice: BigNumber }): BigNumber {
  const diff = p.maxPrice.minus(p.minPrice);
  const PRECISION = expandDecimals(1, 30);
  return diff.multipliedBy(PRECISION).dividedBy(p.maxPrice.plus(p.minPrice).dividedBy(2));
}
