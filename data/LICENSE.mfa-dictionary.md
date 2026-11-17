# Lexicon license

`lexicon.tsv` is derived from the **Portuguese (Brazil) MFA dictionary v2.0.0a**
by Michael McAuliffe and Morgan Sonderegger (Montreal Forced Aligner), released under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Source: https://github.com/MontrealCorpusTools/mfa-models (release `dictionary-portuguese_brazil_mfa-v2.0.0a`)

Changes made by SemFence (Gustavo Toledo):
- one pronunciation per word: the variant with the highest probability;
- `c` -> `k` and `ɟ` -> `ɡ`; `ʎ` -> `l` and `ɲ` -> `n` in words without "lh"/"nh" (the dictionary palatalizes them before "i"; the voices we target do not);
- the lexical stress mark `ˈ` was added with the rules in `g2p.py` (the dictionary has no stress).

```bibtex
@techreport{mfa_portuguese_brazil_mfa_dictionary_2022,
  author = {McAuliffe, Michael and Sonderegger, Morgan},
  title  = {Portuguese (Brazil) MFA dictionary v2.0.0a},
  year   = {2022},
  month  = {May}
}
```

The code of this package is Apache-2.0 (see `LICENSE` at the root). The lexicon keeps CC BY 4.0.
`open_table.json` (open/close vowel decisions) was estimated from the same dictionary.
