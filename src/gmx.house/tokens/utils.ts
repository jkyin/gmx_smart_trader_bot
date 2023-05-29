import { ethers } from 'ethers';
import { InfoTokens } from '../types';

const ZeroAddress = ethers.ZeroAddress;

export function getTokenInfo(infoTokens: InfoTokens, tokenAddress: string, replaceNative?: boolean, nativeTokenAddress?: string) {
  if (replaceNative && tokenAddress === nativeTokenAddress) {
    return infoTokens[ZeroAddress];
  }

  return infoTokens[tokenAddress];
}
