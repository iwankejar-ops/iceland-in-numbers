// Iceland in Numbers — build entrypoint for the make.fun bounty
// "Make the best national statistics site".
//
// What it does, in order:
//   1. Copies this directory's app/ folder (the static site) to /output/app.
//   2. Copies screenshots/ to /output/screenshots.
//   3. Writes /output/dossier.json with the kit's own buildDossier
//      (vendor/makefun-frontend.ts, unchanged): the summary the judge
//      reads — the screenshots, the first load's files and bytes, and
//      the source. The scorer requires dossier.json to be byte for byte
//      what its own copy writes, so the call below follows the kit's
//      starter exactly.
// Only Node's standard library is used. No network, no dependencies.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse (more than
// 4 screenshots or one over 256 KiB; more than 993 files and directories
// in app/ or 16 MiB of app files: app/ counts beside /output's own
// 1000-entry cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

console.log(`Iceland in Numbers built to ${out}`);
