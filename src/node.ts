// Node helper: loads the bundled data files. In the browser use Dizione.fromUrls() instead.
import { readFileSync } from "node:fs";
import { Dizione } from "./engine.ts";

export function loadDizione(dataDir: string | URL = new URL("../data/", import.meta.url)): Dizione {
  const base = typeof dataDir === "string" ? new URL(`file://${dataDir.replace(/\/?$/, "/")}`) : dataDir;
  return new Dizione(readFileSync(new URL("lexicon.tsv", base), "utf8"), JSON.parse(readFileSync(new URL("open_table.json", base), "utf8")));
}
