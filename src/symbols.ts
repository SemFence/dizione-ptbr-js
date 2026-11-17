// Symbol table of the front end. APPEND-ONLY: must stay identical to symbols.py (the model embeds ids, not strings).
export const PAD = "<pad>", BOS = "<bos>", EOS = "<eos>", SP = "<sp>", UNK = "<unk>";
export const SPECIALS = [PAD, BOS, EOS, SP, UNK] as const;
export const PUNCTUATION = [",", ".", "?", "!", ";", ":", '"', "'", "(", ")", "—", "…"] as const;
export const PHONES = [
  // consonants
  "p", "b", "t", "d", "k", "ɡ", "f", "v", "s", "z", "ʃ", "ʒ", "x", "m", "n", "ɲ", "l", "ʎ", "ɾ", "tʃ", "dʒ",
  // glides
  "j", "w", "j̃", "w̃",
  // oral vowels
  "a", "ɐ", "e", "ɛ", "i", "o", "ɔ", "u",
  // nasal vowels
  "ɐ̃", "ẽ", "ĩ", "õ", "ũ",
] as const;
export const SYMBOLS: readonly string[] = [...SPECIALS, ...PUNCTUATION, ...PHONES];
export const ID: ReadonlyMap<string, number> = new Map(SYMBOLS.map((s, i) => [s, i]));
if (ID.size !== SYMBOLS.length) throw new Error("duplicated symbol");
export const VOWEL_PHONES: ReadonlySet<string> = new Set("a ɐ e ɛ i o ɔ u ɐ̃ ẽ ĩ õ ũ".split(" "));
