import { Injectable } from '@nestjs/common';
import { Command, Hears, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { GMXService } from './gmx.house/gmx.service';
import { formatCurrency, escapeTelegramSpecialChars as escapeTgSpecialChars, formatLeftAlign, markdownV2Example, retry } from './common/utils';
import * as _ from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import { TOKEN_SYMBOL, POSITION_UPDATED, GMX_DECIMALS, POSITION_OPEN, POSITION_CLOSED, POSITION_CLOSED_ALL } from './common/constants';
import { TradeEvent, TGBotPositionDisplayInfo, ITrade } from './interfaces/gmx.interface';
import { Logger } from './logger/logger.service';
import BigNumber from 'bignumber.js';
import { BNService } from './binance/binance-usdm-trade.service';
import * as moment from 'moment-timezone';

@Update()
@Injectable()
export class AppService {
  private chatId: string | number | undefined;

  constructor(
    private readonly gmxService: GMXService,
    private readonly bnService: BNService,

    private readonly logger: Logger,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('We will be rich. WAGMI.');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Tell me.');
  }

  @Hears('test')
  async hearsTest(ctx: Context) {
    const reply = markdownV2Example;
    const currency = escapeTgSpecialChars(formatCurrency(BigNumber(12345)));
    await ctx.replyWithMarkdownV2(formatLeftAlign(reply + currency));
  }

  @Hears('test1')
  hearsTest1(ctx: Context) {
    this.bnService
      .getActiveFuturesPositions()
      .then((value) => this.logger.debug(value))
      .catch((error) => this.logger.error(`getFuturesPositions: ${JSON.stringify(error)}`));
  }

  @Hears('testSellETH')
  async hearsTestSellAll() {
    const result = await this.bnService.closePosition('ETHUSDT');

    this.logger.debug(result);
  }

  @Command('status')
  async onSticker(ctx: Context) {
    const status = this.gmxService.isWatching ? '🟢 任务正在进行中。' : '🟡 没有运行中的任务';
    await ctx.reply(status);
  }

  @Command('start_watch')
  async handleStartWatch(ctx: Context) {
    this.chatId = ctx.chat?.id;
    const account = '0x7b7736a2c07c4332ffad45a039d2117ae15e3f66';
    const positionStatus = 'open';

    retry(
      () => {
        return this.gmxService.watchAccountTradeList(account, positionStatus);
      },
      2,
      1000,
    ).catch(async (error) => {
      this.gmxService.stopWatch();
      const msg = `发生了错误： ${JSON.stringify(error)}， 🔴已停止监控。`;
      this.logger.error(msg);
      await ctx.reply(msg);
    });

    await ctx.reply('🕓监控中...');
  }

  @Command('stop_watch')
  async handleStopWatch(ctx: Context) {
    this.gmxService.stopWatch();
    await ctx.reply('✅已停止监控');
  }

  @Command('opened_positions')
  async openedPositions(ctx: Context) {
    const trades = this.gmxService.activeTrades;
    if (trades === undefined) {
      await ctx.reply('🟡 没有运行中的任务');
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
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, error);
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

    this.logger.log(`收到 ${symbol} 调仓信号`);

    if (!action) {
      this.logger.error('需要有 event.updateAction, 但是没有值。');
      return;
    }

    const isIncreaseAction = action.__typename === 'IncreasePosition';
    const bnMarketPrice = this.bnService.pairMarketPrice[pair];
    const isLong = rawTrade.isLong;
    const factory = 10 ** GMX_DECIMALS;

    const collateralDelta = BigNumber(action.collateralDelta).div(factory);
    const updateInfo = isIncreaseAction ? `加仓 ${formatCurrency(collateralDelta)}` : `减仓 ${formatCurrency(collateralDelta)}`;
    const position = this.displayInfo(rawTrade);

    const positionInfoFormatted = `
    🏦*当前 ${position.token} 仓位* 🏦

    ⏰_${escapeTgSpecialChars(position.date)}   ${escapeTgSpecialChars(position.relationDate)}_⏰

    🪙*${position.token}:*       ${escapeTgSpecialChars(position.isLong)}
    💰入场价:    ${position.entryPrice}
    🔥杠杆:       \`${position.leverage}\`
    💰本金:       ${position.collateralValue}
    💰仓位:       ${position.sizeValue}
    💵清算价:      \\-\\-

    ${updateInfo}
    `;

    const reply = `
      *账号信息*

      地址： ${account}

      [debank](https://debank.com/profile/${account}/history?chain=arb)
      [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
      [gmx\\.io](https://app.gmx.io/#/actions/${account})

      ${positionInfoFormatted}
    `;

    const output = formatLeftAlign(reply);
    // console.log(reply);

    try {
      const leverage = this.bnService.allPositions.filter((p) => p.symbol === pair)[0].leverage;
      const quantity = this.bnService.getQualityFrom(BigNumber(150), BigNumber(leverage), bnMarketPrice);
      const result = await this.bnService.openPosition(pair, quantity.toNumber(), isLong);
      this.logger.debug(result);

      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, error);
      }
    }
  }

  @OnEvent(POSITION_OPEN)
  async handlePositionOpenEvent(event: TradeEvent) {
    const rawTrade = event.raw;
    const account = rawTrade.account;
    const symbol = event.trade.symbol;
    const pair = event.trade.pair;
    const bnMarketPrice = this.bnService.pairMarketPrice[pair];
    const isLong = rawTrade.isLong;
    const factory = 10 ** GMX_DECIMALS;
    const collateral = BigNumber(rawTrade.collateral).div(factory);
    const size = BigNumber(rawTrade.size).div(factory);
    const leverage = size.div(collateral);
    const position = this.displayInfo(rawTrade);

    this.logger.log(`收到 ${symbol} 开仓信号`);

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

    const reply = `
      *账号信息*

      地址： ${account}

      [debank](https://debank.com/profile/${account}/history?chain=arb)
      [gmx\\.house](https://www.gmx.house/arbitrum/account/${account})
      [gmx\\.io](https://app.gmx.io/#/actions/${account})

      ${positionInfoFormatted}
    `;

    const output = formatLeftAlign(reply);

    try {
      const leverageRound = leverage.plus(2).integerValue(BigNumber.ROUND_CEIL);
      const quantity = this.bnService.getQualityFrom(BigNumber(100), leverageRound, bnMarketPrice);
      const activePosition = await this.bnService.getActiveFuturePositionInfo(pair);

      if (activePosition) {
        this.logger.debug(`已有 ${pair} 仓位，跳过开仓。仓位信息： ${JSON.stringify(activePosition)}`);
      } else {
        const result = await this.bnService.setLeverage(pair, leverageRound.toNumber());
        this.logger.debug(result);
        const result2 = await this.bnService.openPosition(pair, quantity.toNumber(), isLong);
        this.logger.debug(result2);
      }

      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, error);
      }
    }
  }

  @OnEvent(POSITION_CLOSED)
  async handlePositionClosedEvent(event: TradeEvent) {
    const pair = event.trade.pair;
    this.logger.log(`收到 ${pair} 平仓信号`);
    const result = await this.bnService.closePosition(pair);
    this.logger.debug(`已平仓 ${JSON.stringify(result)}`);

    await this.replyWithMarkdown(`已平仓 ${pair}`);
  }

  @OnEvent(POSITION_CLOSED_ALL)
  async handlePositionClosedAllEvent(event: TradeEvent) {
    this.logger.log('收到全部平仓信号');
    const result = await this.bnService.closeAllPosition();
    this.logger.debug(`已全部平仓 ${JSON.stringify(result)}`);

    await this.replyWithMarkdown('已全部平仓');
  }

  private displayInfo(trade: ITrade): TGBotPositionDisplayInfo {
    const factory = 10 ** GMX_DECIMALS;

    const timestamp = trade.timestamp;
    const token = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
    const collateral = BigNumber(trade.collateral).div(factory);
    const size = BigNumber(trade.size).div(factory);
    const entryPrice = BigNumber(trade.averagePrice).div(factory);
    const leverage = size.div(collateral);

    // 可读文本

    const relativeTimeDisplay = moment(trade.timestamp).locale('zh-cn').fromNow();
    const timestampDisplay = moment(timestamp).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
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
      this.logger.error(error);
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, error);
      }
    }
  }
}
