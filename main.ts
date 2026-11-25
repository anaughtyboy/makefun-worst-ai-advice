// Worst AI Advice — one line of the worst possible advice an AI could give.
// The line is a constant in this file. Nothing is fetched, generated, or
// read from anywhere else: the output is exactly this string, byte for byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ADVICE =
  "To fix any computer problem, just delete System32 and restart.";

// The competition allows 1 to 140 characters; this line is 62.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function isCleanLine(text: string): boolean {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text !== text.trim()) return false;
  for (const ch of text) {
    if (ch === "\n" || ch === "\r" || ch < " ") return false;
  }
  return true;
}

function main(): void {
  if (!isCleanLine(ADVICE)) {
    throw new Error("Advice line fails the competition's format rules.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Write the line exactly, with no trailing newline.
  writeFileSync(outPath, ADVICE, "utf8");

  // Read the bytes back and confirm they are the line, nothing more.
  const back = readFileSync(outPath);
  const expected = Buffer.from(ADVICE, "utf8");
  if (back.length !== expected.length) {
    throw new Error(
      `Output is ${back.length} bytes, expected ${expected.length}.`,
    );
  }
  if (!back.equals(expected)) {
    throw new Error("Read-back bytes do not match the advice line.");
  }
  if (back.length === 0 || back[back.length - 1] === 0x0a) {
    throw new Error("Output must not end with a newline.");
  }
}

main();
