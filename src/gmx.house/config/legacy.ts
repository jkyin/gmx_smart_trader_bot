import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { formatAmount } from '../wallets/numbers';

export const FUNDING_RATE_PRECISION = 1000000;
export const USD_DECIMALS = 30;
export const BASIS_POINTS_DIVISOR = 10000;
export const MARGIN_FEE_BASIS_POINTS = 10;

export function getPositionKey(
  account: string,
  collateralTokenAddress: string,
  indexTokenAddress: string,
  isLong: boolean,
  nativeTokenAddress?: string,
) {
  const tokenAddress0 = collateralTokenAddress === ethers.ZeroAddress ? nativeTokenAddress : collateralTokenAddress;
  const tokenAddress1 = indexTokenAddress === ethers.ZeroAddress ? nativeTokenAddress : indexTokenAddress;
  return account + ':' + tokenAddress0 + ':' + tokenAddress1 + ':' + isLong;
}

export function getFundingFee(data: { size: BigNumber; entryFundingRate?: BigNumber; cumulativeFundingRate?: BigNumber }) {
  const { entryFundingRate, cumulativeFundingRate, size } = data;

  if (entryFundingRate && cumulativeFundingRate) {
    return size.multipliedBy(cumulativeFundingRate.minus(entryFundingRate)).div(FUNDING_RATE_PRECISION).integerValue();
  }

  return;
}

export function getDeltaStr(obj: { delta: BigNumber; deltaPercentage: BigNumber; hasProfit: boolean }) {
  const { delta, deltaPercentage, hasProfit } = obj;

  let deltaStr;
  let deltaPercentageStr;

  if (delta.gt(0)) {
    deltaStr = hasProfit ? '+' : '-';
    deltaPercentageStr = hasProfit ? '+' : '-';
  } else {
    deltaStr = '';
    deltaPercentageStr = '';
  }
  deltaStr += `$${formatAmount(BigInt(delta.integerValue().toFixed()), USD_DECIMALS, 2, true)}`;
  deltaPercentageStr += `${formatAmount(BigInt(deltaPercentage.integerValue().toFixed()), 2, 2)}%`;

  return { deltaStr, deltaPercentageStr };
}

export function getPositionContractKey(account: string, collateralToken: string, indexToken: string, isLong: boolean) {
  return ethers.solidityPackedKeccak256(['address', 'address', 'address', 'bool'], [account, collateralToken, indexToken, isLong]);
}

export function getLeverage(obj: {
  size: BigNumber;
  sizeDelta: BigNumber;
  increaseSize: BigNumber;
  collateral: BigNumber;
  collateralDelta: BigNumber;
  increaseCollateral: BigNumber;
  entryFundingRate: BigNumber;
  cumulativeFundingRate: BigNumber;
  hasProfit: boolean;
  delta: BigNumber;
  includeDelta: boolean;
}) {
  const {
    size,
    sizeDelta,
    increaseSize,
    collateral,
    collateralDelta,
    increaseCollateral,
    entryFundingRate,
    cumulativeFundingRate,
    hasProfit,
    delta,
    includeDelta,
  } = obj;

  if (!size && !sizeDelta) {
    return;
  }
  if (!collateral && !collateralDelta) {
    return;
  }

  let nextSize = size ? size : BigNumber(0);
  if (sizeDelta) {
    if (increaseSize) {
      nextSize = size.plus(sizeDelta);
    } else {
      if (sizeDelta.gte(size)) {
        return;
      }
      nextSize = size.minus(sizeDelta);
    }
  }

  let remainingCollateral = collateral ? collateral : BigNumber(0);
  if (collateralDelta) {
    if (increaseCollateral) {
      remainingCollateral = collateral.plus(collateralDelta);
    } else {
      if (collateralDelta.gte(collateral)) {
        return;
      }
      remainingCollateral = collateral.minus(collateralDelta);
    }
  }

  if (delta && includeDelta) {
    if (hasProfit) {
      remainingCollateral = remainingCollateral.plus(delta);
    } else {
      if (delta.gt(remainingCollateral)) {
        return;
      }

      remainingCollateral = remainingCollateral.minus(delta);
    }
  }

  if (remainingCollateral.eq(0)) {
    return;
  }

  remainingCollateral = sizeDelta
    ? remainingCollateral
        .multipliedBy(BASIS_POINTS_DIVISOR - MARGIN_FEE_BASIS_POINTS)
        .div(BASIS_POINTS_DIVISOR)
        .integerValue()
    : remainingCollateral;
  if (entryFundingRate && cumulativeFundingRate) {
    const fundingFee = size.multipliedBy(cumulativeFundingRate.minus(entryFundingRate)).div(FUNDING_RATE_PRECISION).integerValue();
    remainingCollateral = remainingCollateral.minus(fundingFee);
  }

  return nextSize.multipliedBy(BASIS_POINTS_DIVISOR).div(remainingCollateral).integerValue();
}

export function getLeverageStr(leverage: BigNumber) {
  if (leverage) {
    if (leverage.lt(0)) {
      return '> 100x';
    }
    return `${formatAmount(BigInt(leverage.integerValue().toFixed()), 4, 2, true)}x`;
  }
}
