import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

/**
 *
 * @param {string} text
 * @returns
 */
export async function In(text) {
  const rl = readline.createInterface({ input, output });
  const out = await rl.question(text);
  rl.close();
  return out;
}
