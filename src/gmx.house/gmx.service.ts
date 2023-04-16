import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';
import { AccountTradeList } from './interfaces/account.interface';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class GMXWSService implements OnModuleInit {
  private ws: WebSocket;

  constructor(private readonly logger: Logger) {
    this.ws = new WebSocket('wss://www.gmx.house/api-ws', {
      origin: 'https://www.gmx.house',
    });
  }

  onModuleInit() {
    this.ws.on('open', () => {
      this.logger.log('WebSocket 连接已建立');
      //在这里编写任何与连接成功后要执行的代码。

      //   this.requestAccountTradeList();
    });

    this.ws.on('message', (data) => {
      const json: AccountTradeList = JSON.parse(data.toString());
      this.logger.log(`收到消息：${json}`);
      //在这里编写任何要处理的从WebSocket服务器接收到的消息的代码。
    });

    this.ws.on('close', (code, reason) => {
      this.logger.warn('WebSocket 连接已关闭：', code, reason.toString());
      //在这里编写任何处理WebSocket连接已关闭的代码。
    });

    this.ws.on('error', (event) => {
      this.logger.error('WebSocket 连接错误：', event);
      //在这里编写任何处理WebSocket连接错误的代码。
    });
  }

  checkStatus() {
    switch (this.ws.readyState) {
      case 0:
        return 'connecting';
      case 1:
        return 'open';
      case 2:
        return 'closing';
      case 3:
        return 'closed';
    }
  }

  //   @Interval(5000)
  requestAccountTradeList() {
    this.logger.log('requestAccountTradeList');

    this.ws.send(
      '{"topic":"requestAccountTradeList","body":{"account":"0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66","timeInterval":604800,"chain":42161}}',
    );
  }
}
