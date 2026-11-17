// Copies the dictionary and the open/close table from a checkout of the Python package (the source of truth):
//   DIZIONE_PY=../dizione-ptbr pnpm sync-data
import { cpSync } from "node:fs";
import { resolve } from "node:path";
const py = process.env.DIZIONE_PY;
if (!py) { console.error("set DIZIONE_PY to the dizione-ptbr (Python) checkout"); process.exit(1); }
const from = resolve(py, "src/dizione_ptbr/data"), to = new URL("../data/", import.meta.url).pathname;
for (const f of ["lexicon.tsv", "open_table.json", "LICENSE.mfa-dictionary.md"]) cpSync(resolve(from, f), resolve(to, f));
console.log("data synced");
