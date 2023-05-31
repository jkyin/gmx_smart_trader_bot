import BigNumber from 'bignumber.js';
import currency from 'currency.js';

export const markdownV2Example = `*bold \\*text*
_italic \\*text_
__underline__
~strikethrough~
||spoiler||
*bold _italic bold ~italic bold strikethrough ||italic bold strikethrough spoiler||~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)

${escapeTelegramSpecialChars('1. debank(https://debank.com/profile/0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66/history?chain=arb)')}
2\\. [gmx\\.house](https://www.gmx.house/arbitrum/account/0x7B7736a2C07C4332FfaD45a039d2117aE15e3f66)

这些是 telegram 特殊字符： \`${escapeTelegramSpecialChars('`_*[]()~>#+-=|{}.!')}\`

₿Ξ

🏦*当前 BTC 仓位*🏦

⏰_2023\\-04\\-22 20:01:23 2秒前_

🪙*BTC:*       Long \\(做多\\)
💰入场价:    $1800
🔥杠杆:       \`11x\`
💰本金:       $5,000
💰仓位:       $55,000
💵清算价:      $800

增加保证金： $300， 当前杠杆： 11

\`inline fixed-width code\`
\`\`\`
pre-formatted fixed-width code block
\`\`\`

\`\`\`python
pre-formatted fixed-width code block written in the Python programming language
\`\`\``;

export function escapeTelegramSpecialChars(str: string): string {
  const SPECIAL_CHARS_REGEX = /[\_\*\[\]\(\)\~\`\>\#\+\-\=\|\{\}\.\!]/g;
  return str.replace(SPECIAL_CHARS_REGEX, (match, offset, original) => {
    if (offset > 0 && original[offset - 1] === '\\') {
      // Character is already escaped
      return match;
    } else {
      // Escape the character
      return `\\${match}`;
    }
  });
}

// 文本左对齐
export function formatLeftAlign(str: string): string {
  return str.replace(/ *\n */g, '\n');
}

export async function retry<T>(fn: () => Promise<T>, retryCount: number, delay: number, stopCondition: () => boolean): Promise<T> {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    const stop = stopCondition();

    if (retryCount <= 0 || stop) {
      throw new Error(`All retries failed: ${(error as Error).message}, error: ${(error as Error).stack}`);
    }

    console.warn(`Retry in ${delay}ms, ${retryCount} attempts left`);

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retryCount - 1, delay, stopCondition);
  }
}

export function formatCurrency(amount: BigNumber): string {
  const precision = amount.gt(10) ? 0 : 2;
  return currency(amount.integerValue().toString(), {
    precision: precision,
  }).format();
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
