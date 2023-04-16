import { Injectable } from '@nestjs/common';
import { Command, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { GMXWSService } from './gmx.house/gmx.service';

@Update()
@Injectable()
export class AppService {
  constructor(private readonly gmxService: GMXWSService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }

  @Command('status')
  async statusCommand(ctx: Context) {
    const status = this.gmxService.checkStatus();
    await ctx.reply(`status: ${status}`);
  }
}
