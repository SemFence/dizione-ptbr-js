# @semfence/dizione-ptbr

Port of the Python `dizione-ptbr` (Brazilian Portuguese, **pt-BR only**) with **identical output**, for in-browser demos and Node. No dependencies.

```ts
import { Dizione } from "@semfence/dizione-ptbr";
const d = await Dizione.fromUrls("/data/lexicon.tsv", "/data/open_table.json");   // browser
// Node: import { loadDizione } from "@semfence/dizione-ptbr/node"; const d = loadDizione();
const r = d.phonemize("Paguei R$ 15,50 às 10h30.");
r.ids; r.stress; String(r);
```

`pnpm test` compares the port with what the Python version produces: 10,675 sentences, edge cases, rules-only output for all 32,990 lexicon words, and numbers up to 10^30. It uses `test/golden.json` (made by `scripts/make_golden.py` in the Python repo, not in git) or, without it, the small committed `test/golden.sample.json`.
The data files in `data/` are copied from the Python package, which is the source of truth (`DIZIONE_PY=../dizione-ptbr pnpm sync-data`).
Differences from Python: `\d` is ASCII-only (Python also accepts other scripts' digits) and there is no `identity()` fingerprint.
Apache-2.0 code, CC BY 4.0 lexicon. Credit **SemFence (Gustavo Toledo)** and the MFA dictionary.
