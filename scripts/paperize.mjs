// Usage: node scripts/paperize.mjs <file.tsx> [...more]
// Converts Paper JSX exports in place: hex colors -> theme CSS vars,
// font stacks -> font vars, Paper file-asset URLs -> local /assets copies.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(ROOT, "public", "assets");

// Light value -> CSS var. Dark values are defined in globals.css.
const COLORS = {
  "#EDEDEA": "--c-bg",
  "#E6E6E2": "--c-bg-alt",
  "#DCDCD7": "--c-line",
  "#111111": "--c-text",
  "#9C9C96": "--c-faint",
  "#5C5C58": "--c-muted",
  "#CFCFCA": "--c-border",
  "#F6F6F3": "--c-surface",
  "#3B43D6": "--c-accent",
  "#BDBDB8": "--c-disabled",
};

const files = process.argv.slice(2);
const downloads = new Map();

for (const file of files) {
  let src = fs.readFileSync(file, "utf8");

  // Colors inside quoted style values / svg attrs. Keep #FFFFFF etc. untouched.
  src = src.replace(/#[0-9A-Fa-f]{6}\b/g, (hex) => {
    const v = COLORS[hex.toUpperCase()];
    return v ? `var(${v})` : hex;
  });

  // Fonts
  src = src
    .replace(/'"Instrument Sans", system-ui, sans-serif'/g, "'var(--font-sans)'")
    .replace(/'"Geist Mono", system-ui, sans-serif'/g, "'var(--font-mono)'")
    .replace(/'"Geist Pixel", system-ui, sans-serif'/g, "'var(--font-mono)'");

  // Assets
  src = src.replace(
    /https:\/\/app\.paper\.design\/file-assets\/[A-Z0-9]+\/([A-Za-z0-9_-]+\.[a-z0-9]+)/g,
    (url, name) => {
      downloads.set(name, url);
      return `/assets/${name}`;
    },
  );

  fs.writeFileSync(file, src);
  console.log("paperized", file);
}

fs.mkdirSync(ASSETS, { recursive: true });
for (const [name, url] of downloads) {
  const dest = path.join(ASSETS, name);
  if (fs.existsSync(dest)) continue;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn("FAILED", url, res.status);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("asset", name);
}
