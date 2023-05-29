import { ethers } from 'ethers';
import { PositionQuery, Token } from '../types';
import BigNumber from 'bignumber.js';
import { getConstant } from './chains';
import { getTokenInfo } from '../tokens/utils';
import { getContract } from './contracts';
import { getDeltaStr, getFundingFee, getLeverage, getLeverageStr, getPositionContractKey, getPositionKey } from './legacy';
import { bigNumberify } from '../wallets/numbers';

const BASIS_POINTS_DIVISOR = 10000;
const MARGIN_FEE_BASIS_POINTS = 10;
const UPDATED_POSITION_VALID_DURATION = 60 * 1000;
const PENDING_POSITION_VALID_DURATION = 600 * 1000;

const AddressZero = ethers.ZeroAddress;

const getTokenAddress = (token, nativeTokenAddress) => {
  if (token.address === AddressZero) {
    return nativeTokenAddress;
  }
  return token.address;
};

export function getPositionQuery(tokens, nativeTokenAddress) {
  const collateralTokens = [];
  const indexTokens = [];
  const isLong = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isStable) {
      continue;
    }
    if (token.isWrapped) {
      continue;
    }
    collateralTokens.push(getTokenAddress(token, nativeTokenAddress));
    indexTokens.push(getTokenAddress(token, nativeTokenAddress));
    isLong.push(true);
  }

  for (let i = 0; i < tokens.length; i++) {
    const stableToken = tokens[i];
    if (!stableToken.isStable) {
      continue;
    }

    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j];
      if (token.isStable) {
        continue;
      }
      if (token.isWrapped) {
        continue;
      }
      collateralTokens.push(stableToken.address);
      indexTokens.push(getTokenAddress(token, nativeTokenAddress));
      isLong.push(false);
    }
  }

  return { collateralTokens, indexTokens, isLong };
}

export function getPositions(
  chainId,
  positionQuery,
  positionData,
  infoTokens,
  includeDelta,
  showPnlAfterFees,
  account,
  pendingPositions,
  updatedPositions,
) {
  const propsLength = getConstant(chainId, 'positionReaderPropsLength');
  const positions = [];
  const positionsMap = {};
  if (!positionData) {
    return { positions, positionsMap };
  }
  const { collateralTokens, indexTokens, isLong } = positionQuery;
  for (let i = 0; i < collateralTokens.length; i++) {
    const collateralToken = getTokenInfo(infoTokens, collateralTokens[i], true, getContract(chainId, 'NATIVE_TOKEN'));
    const indexToken = getTokenInfo(infoTokens, indexTokens[i], true, getContract(chainId, 'NATIVE_TOKEN'));
    const key = getPositionKey(account, collateralTokens[i], indexTokens[i], isLong[i]);
    let contractKey;
    if (account) {
      contractKey = getPositionContractKey(account, collateralTokens[i], indexTokens[i], isLong[i]);
    }

    const size = bigNumberify(positionData[i * propsLength]);
    const collateral = bigNumberify(positionData[i * propsLength + 1]);
    const averagePrice = bigNumberify(positionData[i * propsLength + 2]);
    const entryFundingRate = bigNumberify(positionData[i * propsLength + 3]);
    const cumulativeFundingRate = bigNumberify(collateralToken.cumulativeFundingRate);
    const hasRealisedProfit = positionData[i * propsLength + 4] == 1;
    const realisedPnl = bigNumberify(positionData[i * propsLength + 5]);
    const lastIncreasedTime = ethers.toNumber(positionData[i * propsLength + 6]);
    const markPrice = isLong[i] ? indexToken.minPrice : indexToken.maxPrice;
    const delta = bigNumberify(positionData[i * propsLength + 8]);

    const position = {
      key,
      contractKey,
      collateralToken,
      indexToken,
      isLong: isLong[i],
      size: size,
      collateral: collateral,
      averagePrice: averagePrice,
      entryFundingRate: entryFundingRate,
      cumulativeFundingRate: cumulativeFundingRate,
      hasRealisedProfit: hasRealisedProfit,
      realisedPnl: realisedPnl,
      lastIncreasedTime: lastIncreasedTime,
      hasProfit: positionData[i * propsLength + 7] == 1,
      delta: delta,
      markPrice: markPrice,
    };

    if (
      updatedPositions &&
      updatedPositions[key] &&
      updatedPositions[key].updatedAt &&
      updatedPositions[key].updatedAt + UPDATED_POSITION_VALID_DURATION > Date.now()
    ) {
      const updatedPosition = updatedPositions[key];
      position.size = updatedPosition.size;
      position.collateral = updatedPosition.collateral;
      position.averagePrice = updatedPosition.averagePrice;
      position.entryFundingRate = updatedPosition.entryFundingRate;
    }

    let fundingFee = getFundingFee(position);
    position.fundingFee = fundingFee ? fundingFee : BigNumber(0);
    position.collateralAfterFee = position.collateral.minus(position.fundingFee);

    position.closingFee = position.size.multipliedBy(MARGIN_FEE_BASIS_POINTS).div(BASIS_POINTS_DIVISOR).integerValue();
    position.positionFee = position.size.multipliedBy(MARGIN_FEE_BASIS_POINTS).multipliedBy(2).div(BASIS_POINTS_DIVISOR).integerValue();
    position.totalFees = position.positionFee.plus(position.fundingFee);

    position.pendingDelta = position.delta;

    if (position.collateral.gt(0)) {
      position.hasLowCollateral = position.collateralAfterFee.lt(0) || position.size.div(position.collateralAfterFee.abs()).integerValue().gt(50);

      if (position.averagePrice && position.markPrice) {
        const priceDelta = position.averagePrice.gt(position.markPrice)
          ? position.averagePrice.minus(position.markPrice)
          : position.markPrice.minus(position.averagePrice);
        position.pendingDelta = position.size.multipliedBy(priceDelta).div(position.averagePrice).integerValue();

        position.delta = position.pendingDelta;

        if (position.isLong) {
          position.hasProfit = position.markPrice.gte(position.averagePrice);
        } else {
          position.hasProfit = position.markPrice.lte(position.averagePrice);
        }
      }

      position.deltaPercentage = position.pendingDelta.multipliedBy(BASIS_POINTS_DIVISOR).div(position.collateral).integerValue();

      const { deltaStr, deltaPercentageStr } = getDeltaStr({
        delta: position.pendingDelta,
        deltaPercentage: position.deltaPercentage,
        hasProfit: position.hasProfit,
      });

      position.deltaStr = deltaStr;
      position.deltaPercentageStr = deltaPercentageStr;
      position.deltaBeforeFeesStr = deltaStr;

      let hasProfitAfterFees;
      let pendingDeltaAfterFees;

      if (position.hasProfit) {
        if (position.pendingDelta.gt(position.totalFees)) {
          hasProfitAfterFees = true;
          pendingDeltaAfterFees = position.pendingDelta.minus(position.totalFees);
        } else {
          hasProfitAfterFees = false;
          pendingDeltaAfterFees = position.totalFees.minus(position.pendingDelta);
        }
      } else {
        hasProfitAfterFees = false;
        pendingDeltaAfterFees = position.pendingDelta.plus(position.totalFees);
      }

      position.hasProfitAfterFees = hasProfitAfterFees;
      position.pendingDeltaAfterFees = pendingDeltaAfterFees;
      // while calculating delta percentage after fees, we need to add opening fee (which is equal to closing fee) to collateral
      position.deltaPercentageAfterFees = position.pendingDeltaAfterFees
        .multipliedBy(BASIS_POINTS_DIVISOR)
        .div(position.collateral.plus(position.closingFee))
        .integerValue();

      const { deltaStr: deltaAfterFeesStr, deltaPercentageStr: deltaAfterFeesPercentageStr } = getDeltaStr({
        delta: position.pendingDeltaAfterFees,
        deltaPercentage: position.deltaPercentageAfterFees,
        hasProfit: hasProfitAfterFees,
      });

      position.deltaAfterFeesStr = deltaAfterFeesStr;
      position.deltaAfterFeesPercentageStr = deltaAfterFeesPercentageStr;

      if (showPnlAfterFees) {
        position.deltaStr = position.deltaAfterFeesStr;
        position.deltaPercentageStr = position.deltaAfterFeesPercentageStr;
      }

      let netValue = position.hasProfit ? position.collateral.plus(position.pendingDelta) : position.collateral.minus(position.pendingDelta);

      netValue = netValue.minus(position.fundingFee).minus(position.closingFee);
      position.netValue = netValue;
    }

    position.leverage = getLeverage({
      size: position.size,
      collateral: position.collateral,
      entryFundingRate: position.entryFundingRate,
      cumulativeFundingRate: position.cumulativeFundingRate,
      hasProfit: position.hasProfit,
      delta: position.delta,
      includeDelta,
    });
    position.leverageStr = getLeverageStr(position.leverage);

    positionsMap[key] = position;

    applyPendingChanges(position, pendingPositions);

    if (position.size.gt(0) || position.hasPendingChanges) {
      positions.push(position);
    }
  }

  return { positions, positionsMap };
}

function applyPendingChanges(position, pendingPositions) {
  if (!pendingPositions) {
    return;
  }
  const { key } = position;

  if (
    pendingPositions[key] &&
    pendingPositions[key].updatedAt &&
    pendingPositions[key].pendingChanges &&
    pendingPositions[key].updatedAt + PENDING_POSITION_VALID_DURATION > Date.now()
  ) {
    const { pendingChanges } = pendingPositions[key];
    if (pendingChanges.size && position.size == pendingChanges.size) {
      return;
    }

    if (pendingChanges.expectingCollateralChange && !position.collateral == pendingChanges.collateralSnapshot) {
      return;
    }

    position.hasPendingChanges = true;
    position.pendingChanges = pendingChanges;
  }
}
