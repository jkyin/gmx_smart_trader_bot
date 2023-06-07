import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Command, Hears, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { GMXService } from './gmx.house/gmx.service';
import { formatCurrency, escapeTelegramSpecialChars as escapeTgSpecialChars, formatLeftAlign, markdownV2Example, retry } from './common/utils';
import * as _ from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import { POSITION_CLOSED, POSITION_CLOSED_ALL, POSITION_INCREASE, POSITION_LIQUIDATED } from './common/constants';
import { TradingOrder } from './interfaces/gmx.interface';
import BigNumber from 'bignumber.js';
import { BNService } from './binance/binance-usdm-trade.service';
import { dayjs } from './common/day';
import { createWinstonLogger } from './common/winston-config.service';
import winston from 'winston';

@Update()
@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger: winston.Logger;
  private didStopMonitor = false;
  private chatId: string | number | undefined;

  constructor(private readonly gmxService: GMXService, private readonly bnService: BNService, @InjectBot() private readonly bot: Telegraf<Context>) {
    this.logger = createWinstonLogger({ service: AppService.name });
  }

  onApplicationBootstrap() {
    this.logger.info('程序已启动');
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('We will be rich. WAGMI.');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Tell me.');
  }

  @Hears('testmessageformat')
  async hearsTest(ctx: Context) {
    const reply = markdownV2Example;
    const currency = escapeTgSpecialChars(formatCurrency(BigNumber(12345)));
    const append1 = '\n加仓 $239,352\n\n';
    const bnMarketPrice = (await this.bnService.pairMarketPrice())['BTCUSDT'];
    const quantity = escapeTgSpecialChars((await this.bnService.getQuantity('BTC', BigNumber(200), BigNumber(10), bnMarketPrice)).toString());

    const timestamp = 1683861046000;
    const relativeTimeDisplay = dayjs.utc(timestamp).fromNow();
    const timestampDisplay = dayjs.tz(timestamp, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    const content = `
    ${reply}
    ${currency}
    ${append1}
    ${quantity}
    ${escapeTgSpecialChars(relativeTimeDisplay)}
    ${escapeTgSpecialChars(timestampDisplay)}
    `;

    const result = formatLeftAlign(content);

    await ctx.replyWithMarkdownV2(result, {
      disable_web_page_preview: true,
    });
  }

  @Hears('testlog')
  hearsTestlog(ctx: Context) {
    this.logger.info('Calling getHello()', { botInfo: ctx.botInfo });
    this.logger.debug('Calling getHello()', { botInfo: ctx.botInfo });
    this.logger.verbose('Calling getHello()', { botInfo: ctx.botInfo });
    this.logger.warn('Calling getHello()', { botInfo: ctx.botInfo });

    try {
      throw new Error();
    } catch (e) {
      this.logger.error('Calling getHello()', e, { botInfo: ctx.botInfo });
    }
  }

  @Command('status')
  async onSticker(ctx: Context) {
    const status = this.gmxService.isWatching ? '🟢任务正在进行中。' : '🟡没有运行中的任务';
    await ctx.reply(status);
  }

  @Command('start_watch')
  async handleStartWatch(ctx: Context) {
    if (ctx.from?.username !== 'yinxiaoyu') {
      await ctx.reply(`没有权限开启任务`);
      return;
    }

    if (this.gmxService.isWatching) {
      const msg = '🟢正在监控中，无需重复开启，跳过。';
      this.logger.info(msg);
      await ctx.reply(msg);
      return;
    }

    this.didStopMonitor = false;

    this.chatId = ctx.chat?.id;
    const account = '0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66';

    const worker = async () => {
      await this.gmxService.startMonitor(account);
    };

    retry(
      worker,
      -1,
      5000,
      () => this.didStopMonitor,
      async (error) => {
        await ctx.reply(error, {
          disable_web_page_preview: true,
        });
      },
    ).catch(async (error) => {
      this.gmxService.stopMonitor();

      const msg = `发生了错误, 🔴已停止监控。 ${(error as Error).message}, stack: ${(error as Error).stack}`;
      this.logger.error(msg, error);
      await ctx.reply(msg, {
        disable_web_page_preview: true,
      });
    });

    const msg = '✅启动成功，监控中...';
    await ctx.reply(msg, {
      disable_web_page_preview: true,
    });
    this.logger.info(msg);
  }

  @Command('stop_watch')
  async handleStopWatch(ctx: Context) {
    if (ctx.from?.username !== 'yinxiaoyu') {
      await ctx.reply(`没有权限开启任务`);
      return;
    }

    this.didStopMonitor = true;
    this.gmxService.stopMonitor();
    const msg = '✅已停止监控';
    await ctx.reply(msg);
    this.logger.info(msg);
  }

  @Command('opened_positions')
  async openedPositions(ctx: Context) {
    const positions = await this.gmxService.getActivePositions();

    const status = positions.length == 0 ? '暂无仓位\\.' : `已开仓位：\`${positions.length}\`\\.`;

    const account = this.gmxService.watchingInfo.account;
    const reply = `
      *账号信息*

      地址： ${account}

      [debank](https://debank.com/profile/${account}/history?chain=arb)
      [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
      [gmx\\.io](https://app.gmx.io/#/actions/${account})

      ${status}
    `;

    const output = formatLeftAlign(reply);

    ctx.reply(output, {
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    });
  }

  @OnEvent(POSITION_INCREASE)
  async handlePositionIncreasedOrder(order: TradingOrder) {
    const account = order.raw.data.account;
    const symbol = order.trade.symbol;
    const pair = order.trade.pair;
    const isLong = order.deal.isLong;
    const margin = order.deal.margin;
    const timestamp = order.trade.timestamp;
    const longOrShortText = order.deal.isLong ? `Long` : `Short`;
    const price = order.deal.price;
    const leverage = order.deal.leverage;
    const relationDate = dayjs.unix(timestamp).fromNow();
    const date = dayjs.tz(timestamp * 1000, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    this.logger.info(`${pair} 收到调仓指令`, { event: order });

    if (margin === undefined || isLong === undefined || account === undefined || leverage === undefined) {
      this.logger.warn(`${pair} 参数异常， margin:${margin?.toString()}, isLong:${isLong}, account:${account}, leverage:${leverage?.toString()}`, {
        event: order,
      });
      return;
    }

    const bnMarketPrice = (await this.bnService.pairMarketPrice())[pair];

    try {
      const bnActivePosition = await this.bnService.getFuturePositionInfo(pair, true);
      const bnPositionInfo = await this.bnService.getFuturePositionInfo(pair, false);
      const bnBalance = await this.bnService.usdtBalance();
      const preferLeverage = BigNumber.max(leverage.integerValue(), 1);
      const preferMargin = this.getPreferMargin(margin);

      if (bnBalance?.availableBalance === undefined) {
        this.logger.warn(`${pair} 想要加仓，但是余额数据为 undefined`, { balance: bnBalance });
        return;
      }

      if (BigNumber(bnBalance.availableBalance).isLessThan(preferMargin)) {
        this.logger.warn(`${pair} 想要加仓:${preferMargin}，但是余额不足，当前余额：${bnBalance.availableBalance}`, { balance: bnBalance });
        return;
      }

      const quantity = await this.bnService.getQuantity(symbol, preferMargin, preferLeverage, bnMarketPrice);
      let tradingOrderText = '';

      if (bnActivePosition) {
        tradingOrderText = '加仓';
        this.logger.info(`${pair} 已有仓位，准备加仓`, { bnActivePosition: bnActivePosition });

        this.logger.info(`${pair} 准备调整杠杆为:${preferLeverage.toString()}`);
        const result = await this.bnService.setLeverage(pair, preferLeverage.toNumber());
        this.logger.info(`${pair} 调整杠杆成功`, { result: result });

        this.logger.info(`${pair} 准备加仓， 增加保证金：${preferMargin}， 当前杠杆：${preferLeverage.toString()}`);

        const result2 = await this.bnService.increasePosition(pair, quantity, isLong);
        this.logger.info(`${pair} 加仓成功`, { result: result2 });
        this.logger.info(`========= 结束交易 =========`, { result: result });
      } else {
        tradingOrderText = '开仓';
        this.logger.info(`${pair} 没有仓位，准备开仓， 保证金：${preferMargin}， 当前杠杆：${preferLeverage.toString()}`);

        this.logger.info(`${pair} 准备设置保证金模式为： 全仓模式`);
        if (bnPositionInfo?.marginType !== 'crossed') {
          const result = await this.bnService.setMarginType(pair, 'CROSSED');
          this.logger.info(`${pair} 设置保证金全仓模式成功`, { result: result });
        }

        this.logger.info(`${pair} 准备设置初始杠杆为:${preferLeverage.toString()}`);
        const result = await this.bnService.setLeverage(pair, preferLeverage.toNumber());
        this.logger.info(`${pair} 设置初始杠杆成功`, { result: result });

        const result2 = await this.bnService.openPosition(pair, quantity, isLong);
        this.logger.info(`${pair} 开仓成功`, { result2: result2 });
        this.logger.info(`========= 结束交易 =========`, { result: result });
      }

      // telegram
      if (this.chatId) {
        const positionInfoFormatted = `
    🏦*当前 ${symbol} 仓位* 🏦

    ⏰_${escapeTgSpecialChars(date)}   ${escapeTgSpecialChars(relationDate)}_⏰

    🪙方向：        ${escapeTgSpecialChars(longOrShortText)}
    💰入场价:    ${escapeTgSpecialChars(price)}
    🔥杠杆:       \`${escapeTgSpecialChars(leverage.toString())}x\`
    💵清算价:      \\-\\-

    已${tradingOrderText} ${formatCurrency(margin)}
    `;

        const reply = `
        *账号信息*
  
        地址： ${account}
  
        [debank](https://debank.com/profile/${account}/history?chain=arb)
        [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
        [gmx\\.io](https://app.gmx.io/#/actions/${account})
  
        ${positionInfoFormatted}

        *币安交易信息*

        ${escapeTgSpecialChars(`增加保证金：${formatCurrency(preferMargin)}， 当前杠杆：${preferLeverage.toString()}`)}
      `;

        const output = formatLeftAlign(reply);

        this.replyWithMarkdown(output);
      }
    } catch (error) {
      this.logger.error(error);
      this.replyWithMarkdown(escapeTgSpecialChars((error as Error).message));
    }
  }

  @OnEvent(POSITION_CLOSED)
  async handlePositionClosedOrder(order: TradingOrder) {
    const pair = order.trade.pair;
    this.logger.info(`${pair} 收到平仓指令`, { event: order });
    this.logger.info(`${pair} 开始处理平仓`);

    const result = await this.bnService.closePosition(pair);
    this.logger.info(`${pair} 已平仓`, { result: result });
    this.logger.info(`========= 结束交易 =========`, { result: result });

    await this.replyWithMarkdown(`🏦已平仓 ${pair}🏦`);
  }

  @OnEvent(POSITION_LIQUIDATED)
  async handlePositionLiquidatedOrder(order: TradingOrder) {
    const pair = order.trade.pair;
    this.logger.info(`${pair} 收到清仓指令`, { event: order });
    this.logger.info(`${pair} 开始处理平仓`);

    const result = await this.bnService.closePosition(pair);
    this.logger.info(`${pair} 已平仓`, { result: result });
    this.logger.info(`========= 结束交易 =========`, { result: result });

    await this.replyWithMarkdown(`🏦已平仓 ${pair}🏦`);
  }

  @OnEvent(POSITION_CLOSED_ALL)
  async handlePositionClosedAllOrder(order: TradingOrder) {
    this.logger.info('收到全部平仓信号', { event: order });
    this.logger.info('开始处理全部平仓');

    const result = await this.bnService.closeAllPosition();

    if (result === undefined) {
      this.logger.info('不需要全部平仓，跳过', { result: result });
    } else {
      this.logger.info(`已全部平仓`, { result: result });
      this.logger.info(`========= 结束交易 =========`, { result: result });

      await this.replyWithMarkdown('🏦已全部平仓🏦');
    }
  }

  async replyWithMarkdown(text: string) {
    const output = formatLeftAlign(text);
    try {
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error(text, error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, (error as Error).message);
      }
    }
  }

  // 每次加仓数量。
  getPreferMargin(collateral: BigNumber) {
    if (collateral.lte(100)) {
      return collateral;
    } else if (collateral.lte(4000)) {
      return collateral.div(10).integerValue(BigNumber.ROUND_CEIL);
    } else if (collateral.lte(10000)) {
      return BigNumber(400);
    } else {
      return BigNumber(500);
    }
  }

  getPreferLeverage(leverage: BigNumber) {
    return BigNumber.minimum(20, leverage.plus(1));
  }
}
