import { Injectable } from '@nestjs/common';
import {
  Command,
  Hears,
  Help,
  InjectBot,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { GMXService } from './gmx.house/gmx.service';
import {
  formatCurrency,
  escapeTelegramSpecialChars as escapeTgSpecialChars,
  formatLeftAlign,
  markdownV2Example,
  retry,
} from './common/utils';
import * as _ from 'lodash';
import { OnEvent } from '@nestjs/event-emitter';
import {
  TOKEN_SYMBOL,
  POSITION_UPDATED,
  GMX_DECIMALS,
} from './common/constants';
import {
  GMXAccountQueryPayload,
  TGBotPositionDisplayInfo,
} from './interfaces/gmx.interface';
import { Logger } from './logger/logger.service';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import BigNumber from 'bignumber.js';

dayjs.extend(relativeTime);

@Update()
@Injectable()
export class AppService {
  private chatId: string | number | undefined;

  constructor(
    private readonly gmxService: GMXService,
    private readonly logger: Logger,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('We will be rich. WAGMI.');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @Command('status')
  async onSticker(ctx: Context) {
    const status = this.gmxService.isRunning
      ? '🟢 任务正在进行中。'
      : '⏳ 任务尚未开始';
    await ctx.reply(status);
  }

  @Hears('test')
  async hearsTest(ctx: Context) {
    const reply = markdownV2Example;
    const currency = escapeTgSpecialChars(formatCurrency(BigNumber(12345)));
    await ctx.replyWithMarkdownV2(formatLeftAlign(reply + currency));
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
      const msg = `发生了错误： ${error}， 🔴已停止监控。`;
      this.logger.error(msg);
      await ctx.reply(msg);
    });

    await ctx.reply('🕓监控中...');
  }

  @Command('stop_watch')
  async handleStopWatch(ctx: Context) {
    this.gmxService.stopWatch();
    await ctx.reply('✅已停止');
  }

  @Command('opened_positions')
  async openedPositions(ctx: Context) {
    await ctx.reply('👍 LFG!');
  }

  @Command('watching')
  async statusCommand(ctx: Context) {
    this.gmxService.currentWatching().then(async (account) => {
      const reply = `*Watching:* ${account}

      *Test*

      debank:
      ${escapeTgSpecialChars(
        'https://debank.com/profile/0x7b7736a2c07c4332ffad45a039d2117ae15e3f66/history?chain=arb',
      )}
      gmx\\.house:
      ${escapeTgSpecialChars(
        'https://www.gmx.house/arbitrum/account/0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66',
      )}
    `;

      await ctx.replyWithMarkdownV2(formatLeftAlign(reply), {
        disable_web_page_preview: true,
      });
    });
  }

  @OnEvent(POSITION_UPDATED)
  async handlePositionUpdatedEvent(payload: GMXAccountQueryPayload) {
    const json = JSON.stringify(payload);

    const query = payload.query;
    const account = payload.variable.account;
    const trades = query.trades ?? [];
    const factory = 10 ** GMX_DECIMALS;

    const positions: TGBotPositionDisplayInfo[] = trades.map((trade) => {
      const timestamp = trade.timestamp;
      const token = TOKEN_SYMBOL.get(trade.indexToken.toLowerCase());
      const collateral = BigNumber(trade.collateral).div(factory);
      const size = BigNumber(trade.size).div(factory);
      const entryPrice = BigNumber(trade.averagePrice).div(factory);
      const leverage = size.div(collateral);

      // 可读文本
      const relativeTimeDisplay = dayjs.unix(trade.timestamp).fromNow();
      const timestampDisplay = dayjs
        .unix(timestamp)
        .format('YYYY-MM-DD HH:mm:ss');
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
    });

    const positionInfoFormattedList = positions.map((position) => {
      return `
        🏦*当前 ${position.token} 仓位* 🏦

        ⏰_${escapeTgSpecialChars(position.date)}   ${escapeTgSpecialChars(
        position.relationDate,
      )}_⏰

        🪙*${position.token}:*       ${escapeTgSpecialChars(position.isLong)}
        💰入场价:    ${position.entryPrice}
        🔥杠杆:       \`${position.leverage}\`
        💰本金:       ${position.collateralValue}
        💰仓位:       ${position.sizeValue}
        💵清算价:      \\-\\-

        `;
    });

    const positionInfoFormatted = positionInfoFormattedList.join('\n\n');
    const status =
      trades.length == 0 ? '暂无仓位\\.' : `已开仓位：\`${trades.length}\`\\.`;

    const reply = `
      *账号信息*

      地址： ${account}

      [debank](https://debank.com/profile/0x7b7736a2c07c4332ffad45a039d2117ae15e3f66/history?chain=arb)
      [gmx\\.house](https://www.gmx.house/arbitrum/account/0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66)

      ${status}

      ${positionInfoFormatted}
    `;

    const output = formatLeftAlign(reply);
    console.log(JSON.stringify(reply));

    try {
      if (this.chatId) {
        await this.bot.telegram.sendMessage(this.chatId, output, {
          parse_mode: 'MarkdownV2',
          disable_web_page_preview: true,
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
