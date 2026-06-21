# AI Deployed

> **Technology is easy. Operational adoption is hard.**
> We deploy, integrate, and operate AI systems inside enterprise environments — through embedded engineering.

**AI Deployed** is the marketing site for an enterprise AI deployment consultancy. It introduces the company, its capabilities, engagement models, case studies, ROI tooling, and contact flow, and is built as a fast, content-dense, editorial-style Next.js application.

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
- [Deployment](#deployment)
- [Performance & Accessibility](#performance--accessibility)
- [Roadmap](#roadmap)
- [License](#license)

---

## About the Project

Most AI projects stall after the demo. **AI Deployed** solves the last-mile problem — the part between "the model works" and "the business depends on it" — by embedding senior engineers inside the customer's environment to ship, integrate, and operate AI systems in production.

This repository contains the company's public website. It is built as a server-rendered, statically optimizable Next.js 15 app with a deliberately editorial visual language: long-form sections, monochrome photography, hairline rules, and GSAP/Three-driven micro-interactions that stay under a 60fps budget.

### What the site covers

- **Home** — Hero, trust bar, "the reality" problem framing, services overview, forward-deployed engineering pitch, stats, ROI calculator, industries, capabilities, how-we-work, engagement models, pricing, outcomes, case studies, research, why-us, FAQ, and a final CTA.
- **Capabilities** (`/capabilities`) — Detailed capability areas.
- **How We Work** (`/how-we-work`) — Engagement methodology.
- **Case Studies** (`/case-studies`) — Selected deployments.
- **Resources** (`/resources`) — Research, writing, references.
- **Contact** (`/contact`) — Senior-engineer intake form.

---

## Features

- **Editorial-grade design system** — bespoke typography (Inter / IBM Plex Mono / Geist), hairline rules, baseline grid, corner crosshairs, and section-level "FIG · NN" captions.
- **Pointer-driven parallax** — Hero headline and trust strip drift on cursor movement via CSS custom properties — no `requestAnimationFrame`, no WebGL.
- **GSAP-powered motion** — scroll-triggered reveals, count-ups, and section transitions.
- **Three.js hero scenes** — for the more ambitious section backgrounds (lazy-loaded).
- **ROI calculator** — interactive client component with live recompute and animated output.
- **Light & dark themes** — controlled via a no-flash inline script and persisted in `localStorage`.
- **Static asset pipeline** — a Node script (`scripts/fetch-assets.mjs`) downloads responsive WebP variants from Unsplash based on a `SOURCES.md` manifest.
- **Accessibility-first** — skip link, semantic landmarks, focus rings, `prefers-reduced-motion` respected, scroll progress indicator, and color-contrast-tested tokens.
- **SEO-ready** — per-page metadata via the Next App Router, OpenGraph + Twitter cards, canonical URLs, and a sitemap-friendly route structure.
- **Type-safe** — strict TypeScript across the entire codebase.

---

## Tech Stack

| Layer            | Tooling                                                                 |
|------------------|-------------------------------------------------------------------------|
| Framework        | [Next.js 15](https://nextjs.org/) (App Router, RSC)                     |
| Language         | TypeScript 5.6 (strict mode)                                            |
| UI runtime       | React 19 RC                                                              |
| Styling          | [Tailwind CSS 4](https://tailwindcss.com/) via PostCSS                  |
| Animation        | [GSAP 3.12](https://gsap.com/)                                          |
| 3D               | [three.js 0.169](https://threejs.org/) (typed)                          |
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
| `npm run build`              | Production build (`.next/`).                                                                 |
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
│   │   ├── layout.tsx             # Root layout (fonts, metadata, header/footer)
│   │   ├── page.tsx               # Home — composes 17 home components
│   │   ├── globals.css            # Tailwind layer + design tokens
│   │   ├── capabilities/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── how-we-work/page.tsx
│   │   └── resources/page.tsx
│   ├── components/
│   │   ├── home/                  # Home page sections (Hero, Stats, Pricing, …)
│   │   ├── site/                  # Chrome — Header, Footer, ThemeToggle, primitives
│   │   └── forms/                 # ContactForm
│   └── lib/                       # cn(), motion helpers, countUp
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

---

## Content & Assets

- **Copy** lives inline in the React components. When copy stabilizes, consider extracting per-section content into MDX or a structured content source (Sanity, Contentful, MDX in `content/`).
- **Imagery** is sourced from Unsplash and downloaded by `scripts/fetch-assets.mjs`. The source list lives in `public/img/SOURCES.md` and is the single source of truth for which images to fetch and at which sizes.
- **Brand assets** (`public/*.png`, `*.svg`) are static.

---

## Design System

- **Type scale**: `Inter` (body), `IBM Plex Mono` (mono labels & metrics), `Geist` (display headings).
- **Spacing**: section padding anchored at `120px`, content in a centered `Container`.
- **Color**: tokens exposed as CSS variables (`--color-bg`, `--color-ink`, `--color-ink-muted`, `--color-ink-dim`, `--color-line`, …) so light/dark themes are theme-script toggled without rebuilds.
- **Hairline rules**: 1px borders on `var(--color-line)` keep visual weight consistent across themes.
- **Baseline grid**: opt-in per-section via the `<GridLines />` primitive.

To retheme, override the CSS variables in `src/app/globals.css`.

---

## Deployment

The app is a standard Next.js project and deploys anywhere Next runs:

- **Vercel** (recommended) — zero config: import the repo, framework auto-detected.
- **Self-hosted** — `npm run build && npm run start` behind a reverse proxy (Caddy / Nginx).
- **Static export** — add `output: 'export'` to `next.config.ts` if you need a fully static build (note: contact form will need a third-party endpoint or be replaced with a static mailto).

Set the production metadata URL in `src/app/layout.tsx` (`metadataBase`) and update `https://ai-deployed.example.com` references before launch.

---

## Performance & Accessibility

- Server components by default; client components are opted into with `"use client"` only where needed (Hero parallax, GSAP timelines, theme toggle, ROI calculator, forms).
- Images use `next/image` with explicit `sizes` and `priority` on the hero.
- Fonts use `display: swap` and a single subset (`latin`).
- `reactStrictMode` is on; `poweredByHeader` is off; `compress` is on.
- Accessibility: skip link, semantic `<main>`/`<header>`/`<footer>`, labelled sections, keyboard-focusable CTAs, motion respects `prefers-reduced-motion`.

---

## Roadmap

- [ ] Replace static `metadataBase` with the real production domain
- [ ] Move copy into MDX or a structured CMS once it stabilizes
- [ ] Wire the contact form to a real endpoint (Resend, Formspree, or a small serverless function)
- [ ] Add a sitemap (`app/sitemap.ts`) and `robots.txt`
- [ ] Add Vitest + Playwright for component and E2E tests
- [ ] Internationalization (i18n) for non-English markets

---

## License

Source code: **All rights reserved** unless a `LICENSE` file is added. Photography from Unsplash is subject to the [Unsplash License](https://unsplash.com/license).

For licensing inquiries, contact **engineering@aideployed.com**.
