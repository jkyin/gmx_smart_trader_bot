import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { ReaderV2, ReaderV2__factory } from './contracts/types';
import winston from 'winston';
import { createWinstonLogger } from 'src/common/winston-config.service';

@Injectable()
export class GMXContractService {
  private logger: winston.Logger;

  private readerV2Contract: ReaderV2;

  constructor(private config: ConfigService) {
    this.logger = createWinstonLogger({ service: GMXContractService.name });
    const apiKey = config.get<string>('ALCHEMY_API_KEY');
    if (!apiKey) {
      throw new Error('no ethers alchemy api key.');
    }

    const provider = new ethers.AlchemyProvider(42161, apiKey);

    this.readerV2Contract = ReaderV2__factory.connect('0x22199a49A999c351eF7927602CFB187ec3cae489', provider);
  }

  // 获取目标账户的开仓信息
  async getAccountPosition(account: ethers.AddressLike): Promise<void> {
    try {
      const vault = '0x489ee077994B6658eAfA855C308275EAd8097C4A';
      const collateralTokens = ['0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'];
      const indexTokens = ['0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'];
      const isLong = [true];
      const position = await this.readerV2Contract.getPositions(vault, account, collateralTokens, indexTokens, isLong);
      this.logger.info('开仓信息:', { position: position });
      // 在这里处理返回的开仓信息
    } catch (error) {
      this.logger.error('获取开仓信息时出错:', error);
    }
  }
}
