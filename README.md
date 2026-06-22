# AI Deployed

> **Custom AI agents. Built and run for you.**
> We design, build, and operate AI agents for businesses that need a real, governed system in production.

**AI Deployed** is the marketing site for an enterprise AI deployment consultancy. It introduces the company, its platform, governance model, and contact flow, and is built as a fast, content-dense, editorial-style Next.js application with a Dispatch-inspired visual language: oversized display headlines, monochromatic platinum-on-charcoal accents, an interactive cursor-reactive ASCII field with a hidden logo reveal, GSAP-driven micro-interactions, and a built-in AI CLI assistant for site-aware Q&A.

Live site: **https://ai-deployed.example.com** *(placeholder — update before launch)*

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Content & Assets](#content--assets)
- [Design System](#design-system)
- [AI CLI Assistant](#ai-cli-assistant)
- [Deployment](#deployment)
- [Performance & Accessibility](#performance--accessibility)
- [Roadmap](#roadmap)
- [License](#license)

---

## About the Project

Most AI projects stall after the demo. **AI Deployed** solves the last-mile problem — the part between "the model works" and "the business depends on it" — by designing, building, and operating custom AI agents in production against the customer's existing systems. Each agent has a goal, a tool allowlist, a set of guardrails, and an approval gate the customer controls.

This repository contains the company's public website. It is built as a server-rendered, statically optimizable Next.js 15 app with a deliberately editorial visual language: long-form sections, monochrome photography, hairline rules, GSAP-driven micro-interactions, an interactive cursor-reactive ASCII field, and a built-in CLI assistant.

### What the site covers

- **Home** (`/`) — Hero (interactive ASCII dot field + cursor-following "AI DEPLOYED" logo reveal), Live Demo (a six-phase engagement walkthrough with play / pause / reset and a "Our People / Our Stack" capability grid), Use Cases (six labeled cards), Differentiators (three stacked editorial blocks), Engagement Steps (four-step timeline with the operating capability map), Commitments (three operational guarantees), Company Note, and a closing CTA.
- **Platform** (`/platform`) — Build, approve, govern, audit, integrate, operate, measure — seven anchored sections with mock interfaces, plus a closing CTA.
- **Governance** (`/governance`) — What gets checked, how checks fail closed, where policies live, and the audit trail.
- **How it works** (`/how-we-work`) — The four-phase engagement model.
- **About** (`/about`) — Why we exist, what we believe, our products, where we are.
- **FAQ** (`/faq`) — Common questions and answers.
- **Contact** (`/contact`) — Senior-engineer intake form.
- **Legal** (`/legal/privacy`, `/legal/terms`) — Privacy and terms summaries.

---

## Features

- **Editorial-grade design system** — bespoke typography (Inter / IBM Plex Mono / Geist), hairline rules, corner crosshairs, and section-level eyebrow captions. A consistent 4px radius across every card and button.
- **Dispatch-style visual language** — every section gets a distinct layout (centered hero, six-phase live demo, six-up use-case grid, stacked editorial blocks, four-step timeline with operating map, two-column capability grid, closing CTA) so no two adjacent sections read as the same template.
- **Monochromatic palette** — Platinum `#e7e7e7` / Charcoal `#323131` / Dark Silver `#707070` / White Smoke `#efefef`. No chromatic accent — every "highlight" is a tonal shift. The accent slot flips direction in light mode (Platinum → Charcoal) so every token-driven consumer stays readable on paper.
- **Glossy black primary CTA** — squared (4px) pill with a vertical gradient and a white icon-tile inset. Hover inverts body and text color in both light and dark modes with a smooth cross-fade, anchored to theme tokens.
- **Frosted-glass header** — permanent backdrop-blur with progressive enhancement (`@supports [backdrop-filter]`) and a fall-back dark-tint linear-gradient for browsers without backdrop-filter.
- **Interactive ASCII dot field** — full-bleed `<canvas>` grid in the hero. Rest state is a quiet `·` field; near the cursor, dots animate through ASCII glyphs (`·` → `●` → `█`) and shift to ink. Theme-aware via `getComputedStyle` — readable in both dark and light modes.
- **Cursor-following logo reveal** — the "AI DEPLOYED" wordmark sits behind the dot field and is only visible inside a soft circular "flashlight" that follows the pointer. The mask center is driven by two CSS custom properties (`--mx` / `--my`) written directly on the wrapper from `pointermove` — no React re-renders, no per-frame JS. The wordmark uses `mix-blend-mode: screen` in dark mode and `multiply` in light mode so it sits *within* the field rather than punching a hard hole. Disabled when `prefers-reduced-motion: reduce` is active. Toggleable via the `showLogo` prop on `<InteractiveDotGrid />`.
- **Live engagement walkthrough** — single card with the active phase, a circular progress ring, a six-dot phase stepper, and a "Run the engagement" button. Hit play and the card auto-advances through the six phases on a 3.5s timer. Pause, reset, and manual step-jump are exposed.
- **Equal-height capability grid** — "Our People" / "Our Stack" cards align row-by-row across both columns. Cards have a shared `min-h` baseline so longer card copy in one column does not push its rows out of alignment with the other.
- **Operating capability map** — a two-grid (2×2 left, 2×2 right) flanking a tall central engine tile. Eight modules with hover/click interactions, focus-aware edges, and a data-flow pulse animation.
- **GSAP smooth scroll** — anchor-link scrolling is animated via the ScrollToPlugin with `power3.inOut` ease, replacing the browser's native jump and the CSS `scroll-behavior: smooth` baseline.
- **AI CLI assistant** — a floating terminal-style panel that answers site-aware questions using a tokenized keyword matcher over a structured knowledge base. Streams character-by-character for an "AI typing" feel. Persists open/closed state in `localStorage`.
- **Pointer-driven parallax** — Hero headline and trust strip drift on cursor movement via CSS custom properties — no `requestAnimationFrame`, no WebGL.
- **GSAP-powered motion** — scroll-triggered reveals and section transitions.
- **Light & dark themes** — controlled via a no-flash inline script and persisted in `localStorage`. The accent system flips direction in light mode so every token-driven consumer stays readable.
- **Static asset pipeline** — a Node script (`scripts/fetch-assets.mjs`) downloads responsive WebP variants from Unsplash based on a `SOURCES.md` manifest.
- **Accessibility-first** — skip link, semantic landmarks, focus rings, `prefers-reduced-motion` respected everywhere, scroll progress indicator, and color-contrast-tested tokens.
- **SEO-ready** — per-page metadata via the Next App Router, OpenGraph + Twitter cards, canonical URLs, and a sitemap-friendly route structure.
- **Type-safe** — strict TypeScript across the entire codebase.

---

## Tech Stack

| Layer            | Tooling                                                                 |
|------------------|-------------------------------------------------------------------------|
| Framework        | [Next.js 15](https://nextjs.org/) (App Router, RSC)                     |
| Language         | TypeScript 5.6 (strict mode)                                            |
| UI runtime       | React 19 RC                                                             |
| Styling          | [Tailwind CSS 4](https://tailwindcss.org/) via PostCSS                  |
| Animation        | [GSAP 3.12](https://gsap.com/) + ScrollTrigger + ScrollToPlugin         |
| 3D (hero)        | [three.js](https://threejs.org/) (declared in `package.json`)           |
| Class merging    | `clsx`                                                                  |
| Lint             | ESLint 9 + `eslint-config-next`                                         |
| Asset pipeline   | Custom Node script (`scripts/fetch-assets.mjs`)                         |

---

## Getting Started

### Prerequisites

- **Node.js 20+** (Node 22 recommended — matches `devDependencies`)
- **npm 10+** (or pnpm/yarn if you prefer; lockfiles are npm-only)

### Installation

```bash
git clone https://github.com/nibir404/Ai-deployed.git
cd Ai-deployed
npm install
```

### Run the dev server

```bash
npm run dev
```

The site will be available at **http://localhost:3000**.

### Optional — fetch responsive image assets

Hero and section photography are referenced from `public/img/<section>/`. To populate them locally:

```bash
npm run fetch:assets        # download .webp at 640 / 1024 / 1920 widths
npm run fetch:assets:dry    # parse SOURCES.md only, no network
```

Re-runs are idempotent — existing files are skipped. Delete a file to re-download it.

---

## Available Scripts

| Command                      | What it does                                                                                  |
|------------------------------|-----------------------------------------------------------------------------------------------|
| `npm run dev`                | Start the Next.js dev server with HMR at `http://localhost:3000`.                             |
| `npm run build`              | Production build (`.next/`).                                                                  |
| `npm run start`              | Serve the production build.                                                                   |
| `npm run lint`               | Run ESLint with `next/core-web-vitals`.                                                       |
| `npm run typecheck`          | Run `tsc --noEmit` across the project.                                                        |
| `npm run fetch:assets`       | Download responsive image assets from Unsplash based on `public/img/SOURCES.md`.              |
| `npm run fetch:assets:dry`   | Same as above, but only parses and prints — no network calls.                                 |

---

## Project Structure

```
.
├── public/
│   ├── img/                       # Section imagery (downloaded via fetch:assets)
│   ├── *.png, *.svg               # Static brand assets
│   └── README.md                  # Notes for /public
├── scripts/
│   └── fetch-assets.mjs           # One-shot responsive image fetcher
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (fonts, metadata, header, footer, CLI)
│   │   ├── page.tsx               # Home — composes 8 home sections
│   │   ├── globals.css            # Tailwind layer + design tokens + light/dark themes
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── governance/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   ├── legal/{privacy,terms}/page.tsx
│   │   └── platform/page.tsx
│   ├── components/
│   │   ├── home/                  # Home page sections (Hero, LiveDemo, UseCases, …)
│   │   ├── site/                  # Chrome — Header, Footer, Cli, SmoothScroll, primitives, icons
│   │   └── forms/                 # ContactForm
│   └── lib/
│       ├── cn.ts                  # className join helper
│       ├── site-data.ts           # Knowledge base for the AI CLI assistant
│       ├── motion.ts              # GSAP helpers
│       ├── useGsapCountUp.ts      # Number-tweening hook
│       ├── countUp.ts             # countUp math
│       ├── gridFill.ts            # CSS helpers for closing odd-count card grids
│       ├── assets.ts              # Asset path helpers
│       └── copy/                  # Per-section long-form copy (commitments, companyNote, engagementSteps)
├── next.config.ts
├── tailwind / postcss configs
├── tsconfig.json
└── package.json
```

### Adding a new section to the home page

1. Create a component in `src/components/home/MySection.tsx`.
2. Import and place it in `src/app/page.tsx`.
3. Add any new typography or layout primitives in `src/components/site/primitives/`.
4. If it needs imagery, add entries to `public/img/SOURCES.md` and run `npm run fetch:assets`.
5. If the section's copy is more than a paragraph or two, add a typed copy file in `src/lib/copy/` and import it.

### Adding a new topic to the AI CLI

1. Open `src/lib/site-data.ts`.
2. Add a new entry to `SITE_DATA` with a unique `id`, an array of `keywords` (aliases), a `title`, a `summary`, a list of `facts`, and optional `links`.
3. The matcher (`findTopic`) updates automatically — no other changes needed.

---

## Content & Assets

- **Copy** is split between inline JSX (short strings — headlines, CTAs, eyebrows) and `src/lib/copy/` (long-form per-section content like `commitments.ts`, `companyNote.ts`, `engagementSteps.ts`). When copy stabilizes further, consider moving everything to MDX or a structured content source (Sanity, Contentful, MDX in `content/`).
- **Imagery** is sourced from Unsplash and downloaded by `scripts/fetch-assets.mjs`. The source list lives in `public/img/SOURCES.md` and is the single source of truth for which images to fetch and at which sizes.
- **Brand assets** (`public/*.png`, `*.svg`) are static.

---

## Design System

- **Type scale**: `Inter` (body), `IBM Plex Mono` (mono labels & metrics), `Geist` (display headings).
- **Spacing**: section padding anchored at `py-[100px] md:py-[120px]`, content in a centered `Container` (max width `var(--container-max)` = 1280px) with gutter padding driven by `--space-gutter`.
- **Color**: tokens exposed as CSS variables (`--color-bg`, `--color-ink`, `--color-ink-muted`, `--color-ink-dim`, `--color-line`, `--color-accent`, `--color-platinum`, `--color-charcoal`, …) so light/dark themes are theme-script toggled without rebuilds.
- **Hairline rules**: 1px borders on `var(--color-line)` keep visual weight consistent across themes.
- **Radius**: 4px on every card and button across the site.
- **Editorial primitives** (`src/components/site/primitives/`): `Eyebrow`, `DisplayHeading`, `Container`, `Button`, `Reveal`, `TextReveal`, `EditorialRule`, `AccentGlow`, `CornerCrosshairs`, `StatBlock`, `NumberedCard`, `Accordion`, `Tabs`, `Marquee`, `StackReveal`, `JpgBadge`, `BillingToggle`, `RangeSlider`, `Section`, `GridLines` *(retained for future use; not currently rendered)*, `InteractiveDotGrid`.

To retheme, override the CSS variables in `src/app/globals.css`.

---

## AI CLI Assistant

The site ships with a built-in AI-style terminal assistant (the `Cli` component, bottom-right floating launcher).

**Knowledge source:** `src/lib/site-data.ts` — a structured array of topics (what we do, agents, governance, platform, engagement, use cases, differentiators, about, contact, FAQ) with keyword aliases, summaries, facts, and outbound links.

**Matcher:** `findTopic(query)` tokenizes the input, scores every topic by alias hits + title-word matches + phrase bonuses ("how much", "how long", "what is", "who are"), and returns the top-scoring topic.

**Output:** the matched topic is composed into a streaming response that reads as if synthesized by an AI — `> Topic` heading, summary, bulleted facts, outbound links. The response streams character-by-character via `requestAnimationFrame` for an "AI typing" feel.

**Try it:** open the site, click the `▸_ Ask the CLI · ~ai-deployed` pill in the bottom-right, then try:
- *"What does AI Deployed do?"*
- *"How does governance work?"*
- *"Where do agents work?"*
- *"How does an engagement start?"*

The panel persists its open/closed state in `localStorage` and respects `prefers-reduced-motion`.

---

## Deployment

The app is a standard Next.js project and deploys anywhere Next runs:

- **Vercel** (recommended) — zero config: import the repo, framework auto-detected.
- **Self-hosted** — `npm run build && npm run start` behind a reverse proxy (Caddy / Nginx).
- **Static export** — add `output: 'export'` to `next.config.ts` if you need a fully static build (note: contact form will need a third-party endpoint or be replaced with a static mailto).

Set the production metadata URL in `src/app/layout.tsx` (`metadataBase`) and update `https://ai-deployed.example.com` references before launch.

> ⚠️ **Note:** running `next build` and `next dev` against the same `.next/` directory can produce a stale-chunk error (`Cannot find module './935.js'`). If you hit this, stop the dev server, `rm -rf .next`, and start fresh.

---

## Performance & Accessibility

- Server components by default; client components are opted into with `"use client"` only where needed (Hero parallax, GSAP timelines, theme toggle, dot field, CLI panel, walkthrough, forms).
- Images use `next/image` with explicit `sizes` and `priority` on the hero.
- Fonts use `display: swap` and a single subset (`latin`).
- `reactStrictMode` is on; `poweredByHeader` is off; `compress` is on.
- Accessibility: skip link, semantic `<main>`/`<header>`/`<footer>`, labelled sections, keyboard-focusable CTAs, motion respects `prefers-reduced-motion` (parallax, dot-field drift, and CLI typing are all gated).

---

## Roadmap

- [ ] Replace static `metadataBase` with the real production domain
- [ ] Move all copy into MDX or a structured CMS once it stabilizes
- [ ] Wire the contact form to a real endpoint (Resend, Formspree, or a small serverless function)
- [ ] Wire the AI CLI to a real LLM endpoint while keeping the offline knowledge-base as fallback
- [ ] Add a sitemap (`app/sitemap.ts`) and `robots.txt`
- [ ] Add Vitest + Playwright for component and E2E tests
- [ ] Internationalization (i18n) for non-English markets

---

## License

Source code: **All rights reserved** unless a `LICENSE` file is added. Photography from Unsplash is subject to the [Unsplash License](https://unsplash.com/license).

For licensing inquiries, contact **hello@ai-deployed.com**.
