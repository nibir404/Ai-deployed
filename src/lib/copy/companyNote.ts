/**
 * Shared copy — the "California. Building deliberately." company
 * note. Used on the homepage (CompanyNote) and on /about (the
 * "Where we are" section). Two variants:
 *
 *   - `short` — two paragraphs, homepage-sized.
 *   - `long`  — three paragraphs, about-page-sized.
 */

export const COMPANY_NOTE_SHORT: readonly string[] = [
  "We are a small team based in California. We hire engineers slowly, pay well, and do not run a sales pipeline. Every customer engagement is delivered by named people — not a pool.",
  "If you are reading this and considering us, you will probably talk to one of the founders in the first call. We are not the right fit for every business. We will tell you when we are not.",
] as const;

export const COMPANY_NOTE_LONG: readonly string[] = [
  "We are based in California and we are a small team by design. Every customer engagement is delivered by named engineers, not a pool.",
  "We hire slowly. We pay well. We do not believe in a sales pipeline. If you are reading this and considering us, you will probably talk to one of the founders in the first call.",
  "We are not the right fit for every business. We will tell you when we are not.",
] as const;