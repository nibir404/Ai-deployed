#!/usr/bin/env node
/**
 * fetch-assets.mjs — one-shot image fetcher for the Ai-Deployed landing page.
 *
 * Reads `public/img/SOURCES.md`, parses the `## Source list` block, and
 * downloads each photo from Unsplash at 3 sizes (640 / 1024 / 1920 px wide)
 * as `.webp` into the matching `public/img/<section>/` folder.
 *
 * Usage:
 *   node scripts/fetch-assets.mjs          # fetch all
 *   node scripts/fetch-assets.mjs --dry    # parse only, no network
 *
 * Re-runs are idempotent: existing files in the destination folder are
 * preserved (skipped with a "skipped" log line). To re-download, delete the
 * file first.
 */
import { readFile, mkdir, access, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { constants } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const SOURCES_PATH = join(ROOT, "public", "img", "SOURCES.md");

const SIZES = [640, 1024, 1920];
const DRY = process.argv.includes("--dry");

/**
 * Parse the `## Source list` block of SOURCES.md.
 * Each line of the form `<path> | <id> | <description>` becomes an entry.
 * Section headers (`### Hero`) are tracked so each entry knows its folder.
 */
function parseSources(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sources = [];
  let currentSection = null;
  let inList = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (line === "## Source list") {
      inList = true;
      continue;
    }
    if (!inList) continue;
    if (line.startsWith("## ")) break; // next top-level section ends the list

    if (line.startsWith("### ")) {
      currentSection = line.replace(/^###\s+/, "").trim().toLowerCase();
      continue;
    }
    if (!currentSection) continue;
    if (!line || line.startsWith(">") || line.startsWith("-")) continue;

    const m = line.match(/^([\w-]+)\s*\|\s*([\w-]+)\s*\|\s*(.+)$/);
    if (!m) continue;
    sources.push({
      section: currentSection,
      name: m[1],
      id: m[2],
      description: m[3],
    });
  }
  return sources;
}

function buildUrl(id, width) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&fm=webp&auto=format&fit=crop`;
}

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "ai-deployed-asset-fetcher/1.0" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

async function main() {
  console.log(`[fetch-assets] reading ${SOURCES_PATH}`);
  const md = await readFile(SOURCES_PATH, "utf8");
  const sources = parseSources(md);
  console.log(`[fetch-assets] parsed ${sources.length} source(s)`);

  if (DRY) {
    console.log("[fetch-assets] --dry mode, exiting without downloads");
    for (const s of sources) {
      console.log(
        `  ${s.section}/${s.name} | id=${s.id} | ${s.description}`,
      );
    }
    return;
  }

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const src of sources) {
    const dir = join(ROOT, "public", "img", src.section);
    await mkdir(dir, { recursive: true });

    for (const w of SIZES) {
      const dest = join(dir, `${src.name}-${w}.webp`);
      if (await exists(dest)) {
        skip++;
        process.stdout.write(".");
        continue;
      }
      const url = buildUrl(src.id, w);
      try {
        await download(url, dest);
        ok++;
        process.stdout.write("+");
      } catch (e) {
        fail++;
        process.stdout.write("x");
        console.error(
          `\n[fetch-assets] FAILED: ${src.section}/${src.name}@${w} — ${e.message}`,
        );
      }
    }
  }

  console.log(
    `\n[fetch-assets] done — ${ok} downloaded, ${skip} skipped, ${fail} failed`,
  );
  if (fail > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error("[fetch-assets] fatal:", e);
  process.exit(1);
});
