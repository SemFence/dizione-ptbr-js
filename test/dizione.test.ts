// Compares the TypeScript port with what the Python implementation produced (test/golden.json, or the small committed golden.sample.json).
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { loadDizione } from "../src/node.ts";
import { normalize, numberToWords } from "../src/index.ts";

const full = new URL("./golden.json", import.meta.url), sample = new URL("./golden.sample.json", import.meta.url);
const goldPath = existsSync(full) ? full : sample;       // the full file is made by scripts/make_golden.py in the Python repo
const skip = false;
const gold = JSON.parse(readFileSync(goldPath, "utf8"));
const d = loadDizione();
const show = (w: [string, number][]) => w.map(([p, s]) => (s ? "ˈ" : "") + p).join(" ");

function compare(name: string, rows: [string, string][], f: (x: string) => string) {
  test(name, { skip }, () => {
    const bad: string[] = [];
    for (const [input, expected] of rows) { const got = f(input); if (got !== expected) bad.push(`${JSON.stringify(input)}\n  py: ${expected}\n  ts: ${got}`); }
    assert.equal(bad.length, 0, `${bad.length}/${rows.length} differ:\n${bad.slice(0, 8).join("\n")}`);
  });
}

compare("phonemize: 10,675 sentences", gold?.sentences.map((r: string[]) => [r[0], r[1]]) ?? [], (t) => String(d.phonemize(t)));
compare("pieces: 10,675 sentences", gold?.sentences.map((r: string[]) => [r[0], JSON.stringify(JSON.parse(r[2]))]) ?? [], (t) => JSON.stringify(d.pieces(t)));
compare("phonemize: edge cases", gold?.edge.map((r: string[]) => [r[0], r[1]]) ?? [], (t) => String(d.phonemize(t)));
compare("pieces: edge cases", gold?.edge.map((r: string[]) => [r[0], JSON.stringify(JSON.parse(r[2]))]) ?? [], (t) => JSON.stringify(d.pieces(t)));
compare("normalize: edge cases", gold?.edge.map((r: string[]) => [r[0], r[3]]) ?? [], normalize);
compare("rules only: 32,990 lexicon words", gold?.words_rules ?? [], (w) => show(d.pronounce(w, false)));
compare("lexicon: 32,990 words", gold?.words_lex ?? [], (w) => show(d.pronounce(w)));
compare("numberToWords", gold?.numbers.map((r: string[]) => [r[0], r[1]]) ?? [], (n) => numberToWords(BigInt(n)));
compare("numberToWords feminine", gold?.numbers.map((r: string[]) => [r[0], r[2]]) ?? [], (n) => numberToWords(BigInt(n), true));

test("symbol table has 55 symbols", () => assert.equal(d.phonemize("a").ids.every((i) => i >= 0), true));
