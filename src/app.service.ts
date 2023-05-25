import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Command, Hears, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { GMXService } from './gmx.house/gmx.service';
import { formatCurrency, escapeTelegramSpecialChars as escapeTgSpecialChars, formatLeftAlign, markdownV2Example, retry } from './common/utils';
import * as _ from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import { TOKEN_SYMBOL, POSITION_UPDATED, GMX_DECIMALS, POSITION_OPEN, POSITION_CLOSED, POSITION_CLOSED_ALL } from './common/constants';
import { TradeEvent, TGBotPositionDisplayInfo, ITrade } from './interfaces/gmx.interface';
import BigNumber from 'bignumber.js';
import { BNService } from './binance/binance-usdm-trade.service';
import { dayjs } from './common/day';
import { createWinstonLogger } from './common/winston-config.service';
import winston from 'winston';

@Update()
@Injectable()
export class AppService implements OnApplicationBootstrap {
  private logger: winston.Logger;
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
    if (this.gmxService.isWatching) {
      const msg = '🟢正在监控中，无需重复开启，跳过。';
      this.logger.info(msg);
      await ctx.reply(msg);
      return;
    }

    this.chatId = ctx.chat?.id;
    const account = '0x7b7736a2c07c4332ffad45a039d2117ae15e3f66';
    const positionStatus = 'open';

    retry(
      () => {
        return this.gmxService.watchAccountTradeList(account, positionStatus);
      },
      50,
      3000,
    ).catch(async (error) => {
      this.gmxService.stopWatch();

      const msg = `发生了错误： ${error.message}， 🔴已停止监控。`;
      this.logger.error(msg, error);
      await ctx.reply(msg);
    });

    const msg = '✅启动成功，监控中...';
    await ctx.reply(msg);
    this.logger.info(msg);
  }

  @Command('stop_watch')
  async handleStopWatch(ctx: Context) {
    this.gmxService.stopWatch();
    const msg = '✅已停止监控';
    await ctx.reply(msg);
    this.logger.info(msg);
  }

  @Command('opened_positions')
  async openedPositions(ctx: Context) {
    const trades = this.gmxService.activeTrades;
    if (trades === undefined) {
      const msg = '🟡 没有运行中的任务，所以没有自动开启的仓位';
      this.logger.info(msg);
      await ctx.reply(msg);
      return;
    }

    const status = trades.length == 0 ? '暂无仓位\\.' : `已开仓位：\`${trades.length}\`\\.`;

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
    // console.log(reply);

    try {
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error('开仓发生错误', error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, (error as Error).message);
      }
    }
  }

  @OnEvent(POSITION_UPDATED)
  async handlePositionUpdatedEvent(event: TradeEvent) {
    const rawTrade = event.raw;
    const account = rawTrade.account;
    const symbol = event.trade.symbol;
    const pair = event.trade.pair;
    const action = event.updateAction;

    this.logger.info(`收到 ${symbol} 调仓信号`, { event: event });

    if (!action) {
      this.logger.warn('需要有 event.updateAction, 但是没有值。', { event: event });
      return;
    }

    const isIncreaseAction = action.__typename === 'IncreasePosition';
    const bnMarketPrice = (await this.bnService.pairMarketPrice())[pair];
    const isLong = rawTrade.isLong;
    const power = BigNumber(10).pow(GMX_DECIMALS);

    const collateralDelta = BigNumber(action.collateralDelta).div(power);
    const updateInfo = isIncreaseAction ? `已加仓 ${formatCurrency(collateralDelta)}` : `已减仓 ${formatCurrency(collateralDelta)}`;
    const position = this.displayInfo(rawTrade);

    const relationDate = dayjs.unix(action.timestamp).fromNow();
    const date = dayjs.tz(action.timestamp * 1000, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    const positionInfoFormatted = `
    🏦*当前 ${position.token} 仓位* 🏦

    ⏰_${escapeTgSpecialChars(date)}   ${escapeTgSpecialChars(relationDate)}_⏰

    🪙*${position.token}:*       ${escapeTgSpecialChars(position.isLong)}
    💰入场价:    ${position.entryPrice}
    🔥杠杆:       \`${position.leverage}\`
    💰本金:       ${position.collateralValue}
    💰仓位:       ${position.sizeValue}
    💵清算价:      \\-\\-

    ${updateInfo}
    `;

    try {
      const leverage = (await this.bnService.getActiveFuturePositionInfo(pair))?.leverage;
      if (!leverage) {
        this.logger.warn(`想要调仓，但是 leverage 结果为 ${leverage}`, { pair: pair });
        return;
      }

      const preferLeverage = BigNumber(leverage);
      const preferMargin = this.getPreferMargin(collateralDelta);

      const quantity = await this.bnService.getQuantity(symbol, preferMargin, preferLeverage, bnMarketPrice);

      if (isIncreaseAction) {
        const balance = await this.bnService.usdtBalance();

        if (balance?.availableBalance === undefined) {
          this.logger.warn('想要加仓，但是余额不足', { balance: balance });
          return;
        }

        if (BigNumber(balance.availableBalance).isLessThan(preferMargin)) {
          this.logger.warn('想要加仓，但是余额不足', { balance: balance });
          return;
        }

        this.logger.info(`准备加仓， 增加保证金：${preferMargin}， 当前杠杆：${preferLeverage.toString()}`);
        const result = await this.bnService.increasePosition(pair, quantity, isLong);
        this.logger.info(`加仓成功`, { result: result });
      } else {
        this.logger.info(`准备减仓仓， 减少保证金：${preferMargin}， 当前杠杆：${preferLeverage.toString()}`);
        const result = await this.bnService.decreasePosition(pair, quantity, isLong);
        this.logger.info(`减仓成功`, { result: result });
      }

      const binanceMsg = isIncreaseAction
        ? `增加保证金：${formatCurrency(preferMargin)}， 当前杠杆：${preferLeverage.toString()}`
        : `减少保证金：${formatCurrency(preferMargin)}， 当前杠杆：${preferLeverage.toString()}`;

      // telegram
      if (this.chatId) {
        const reply = `
        *账号信息*
  
        地址： ${account}
  
        [debank](https://debank.com/profile/${account}/history?chain=arb)
        [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
        [gmx\\.io](https://app.gmx.io/#/actions/${account})
  
        ${positionInfoFormatted}

        *币安交易信息*

        ${escapeTgSpecialChars(binanceMsg)}
      `;

        const output = formatLeftAlign(reply);

        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });

        this.logger.info('成功调仓');
      }
    } catch (error) {
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, (error as Error).message);
      }
    }
  }

  @OnEvent(POSITION_OPEN)
  async handlePositionOpenEvent(event: TradeEvent) {
    const rawTrade = event.raw;
    const account = rawTrade.account;
    const symbol = event.trade.symbol;
    const pair = event.trade.pair;
    const bnMarketPrice = (await this.bnService.pairMarketPrice())[pair];
    const isLong = rawTrade.isLong;
    const power = BigNumber(10).pow(GMX_DECIMALS);
    const collateral = BigNumber(rawTrade.collateral).div(power);
    const size = BigNumber(rawTrade.size).div(power);
    const leverage = size.div(collateral);
    const position = this.displayInfo(rawTrade);

    this.logger.info(`收到 ${symbol} 开仓信号`, { event: event });

    const positionInfoFormatted = `
    🏦*当前 ${position.token} 仓位* 🏦

    ⏰_${escapeTgSpecialChars(position.date)}   ${escapeTgSpecialChars(position.relationDate)}_⏰

    🪙*${position.token}:*       ${escapeTgSpecialChars(position.isLong)}
    💰入场价:    ${position.entryPrice}
    🔥杠杆:       \`${position.leverage}\`
    💰本金:       ${position.collateralValue}
    💰仓位:       ${position.sizeValue}
    💵清算价:      \\-\\-

    `;

    try {
      const preferLeverage = this.getPreferLeverage(leverage.integerValue(BigNumber.ROUND_CEIL));
      const preferMargin = this.getPreferMargin(collateral);
      const quantity = await this.bnService.getQuantity(symbol, preferMargin, preferLeverage, bnMarketPrice);
      const activePosition = await this.bnService.getActiveFuturePositionInfo(pair);

      if (activePosition) {
        this.logger.info(`已有 ${pair} 仓位，跳过开仓`, { activePosition: activePosition });
      } else {
        this.logger.info(`准备设置 ${pair} 初始杠杆为:${preferLeverage.toString()}`);
        const result = await this.bnService.setLeverage(pair, preferLeverage.toNumber());
        this.logger.info('设置初始杠杆成功', { result: result });
        this.logger.info(`准备开仓， 保证金：${preferMargin}， 当前杠杆：${preferLeverage.toString()}`);
        const result2 = await this.bnService.openPosition(pair, quantity, isLong);
        this.logger.info(`开仓成功`, { result2: result2 });
      }

      const reply = `
      *账号信息*

      地址： ${account}

      [debank](https://debank.com/profile/${account}/history?chain=arb)
      [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
      [gmx\\.io](https://app.gmx.io/#/actions/${account})

      ${positionInfoFormatted}

      *币安交易信息*

      开仓成功，保证金:${formatCurrency(preferMargin)}, 杠杆：${preferLeverage.toString()}x
    `;

      const output = formatLeftAlign(reply);

      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, (error as Error).message);
      }
    }
  }

  @OnEvent(POSITION_CLOSED)
  async handlePositionClosedEvent(event: TradeEvent) {
    const pair = event.trade.pair;
    this.logger.info(`收到 ${pair} 平仓信号`, { event: event });
    this.logger.info(`开始处理 ${pair} 平仓`);

    const result = await this.bnService.closePosition(pair);
    this.logger.info(`已平仓`, { result: result });

    await this.replyWithMarkdown(`🏦已平仓 ${pair}🏦`);
  }

  @OnEvent(POSITION_CLOSED_ALL)
  async handlePositionClosedAllEvent(event: TradeEvent) {
    this.logger.info('收到全部平仓信号', { event: event });
    this.logger.info('开始处理全部平仓');

    const result = await this.bnService.closeAllPosition();

    if (result === undefined) {
      this.logger.info('不需要全部平仓，跳过', { result: result });
    } else {
      this.logger.info(`已全部平仓`, { result: result });

      await this.replyWithMarkdown('🏦已全部平仓🏦');
    }
  }

  private displayInfo(trade: ITrade): TGBotPositionDisplayInfo {
    const factory = BigNumber(10).pow(GMX_DECIMALS);

    const timestamp = trade.timestamp * 1000;
    const token = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
    const collateral = BigNumber(trade.collateral).div(factory);
    const size = BigNumber(trade.size).div(factory);
    const entryPrice = BigNumber(trade.averagePrice).div(factory);
    const leverage = size.div(collateral);

    // 可读文本
    const relativeTimeDisplay = dayjs.utc(timestamp).fromNow();
    const timestampDisplay = dayjs.tz(timestamp, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    const tokenDisplay = token ?? '??';
    const isLongDisplay = trade.isLong ? 'Long (做多)' : 'Short (做空)';
    const entryPriceDisplay = formatCurrency(entryPrice);
    const leverageDisplay = leverage.toFormat(2) + 'x';
    const sizeValueDisplay = formatCurrency(size);
    const collateralValueDisplay = formatCurrency(collateral);

    return {
      date: timestampDisplay,
      relationDate: relativeTimeDisplay,
      token: tokenDisplay,
      isLong: isLongDisplay,
      entryPrice: entryPriceDisplay,
      leverage: leverageDisplay,
      sizeValue: sizeValueDisplay,
      collateral: collateral,
      collateralValue: collateralValueDisplay,
      pnl: '',
      liquidationPrice: '',
    };
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
    if (collateral.lte(7000)) {
      return collateral.div(10).integerValue(BigNumber.ROUND_CEIL);
    } else if (collateral.lte(10000)) {
      return BigNumber(800);
    } else {
      return BigNumber(1000);
    }
  }

  getPreferLeverage(leverage: BigNumber) {
    return BigNumber.minimum(21, leverage.plus(1));
  }
}
