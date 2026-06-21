# Image Sources

Photos for the Ai-Deployed landing page redesign, sourced from Unsplash.

## Sourcing rules
- **Unsplash exclusively** for editorial photography (Pinterest URLs are not CDN-stable).
- All photos are used in **monochrome** mode (`grayscale` filter applied via Tailwind class).
- Each photo is downloaded at **3 sizes** (640, 1024, 1920px wide) as `.webp` for `next/image` responsive loading.
- Filename pattern: `<section>-<descriptor>-<width>.webp`

## Run the fetcher
```bash
pnpm fetch:assets
```

The script reads this file's `## Source list` section, downloads each URL at the 3 sizes, and saves into the matching `public/img/<section>/` folder.

---

## Source list

> Format: `path | unsplash-id | description`
> The script joins `https://images.unsplash.com/photo-<id>?w=<width>&q=80&fm=webp&auto=format` for each entry.

### Hero
hero-architectural | 1497366216548-37526070297c | Modern enterprise operations — glass facade night
hero-control-room | 1551434678-e076c223a692 | Engineers in a control room with multiple screens

### Reality
reality-fog-city | 1444723121867-7a241cacace9 | Foggy city skyline, abstract
reality-circuit | 1518770660439-4636190af475 | Circuit board macro, abstract
reality-architecture | 1486325212027-8081e485255e | Brutalist architecture lines

### WhatWeDo
wd-datacenter-1 | 1558494949-ef010cbdcc31 | Data center with cool blue lighting
wd-network | 1544197150-b99a580bb7a8 | Network cables / patch panel
wd-architect | 1497366754035-f200968a6e72 | Empty architectural workspace
wd-automation | 1518770660439-4636190af475 | Automation / circuit pattern

### Industries
ind-finance | 1554224155-6726b3ff858f | Banking / trading floor
ind-healthcare | 1576091160399-112ba8d25d1d | Hospital / medical technology
ind-government | 1564507592333-c60657eea523 | Government building / civic architecture
ind-manufacturing | 1565793298595-6a879b1d9492 | Industrial manufacturing / factory
ind-education | 1606761568499-6d2451b23c66 | University / lecture hall
ind-telecom | 1606857521015-7f9fcf423740 | Telecom tower / antenna
ind-logistics | 1601584115197-04ecc0da31d7 | Logistics / shipping containers

### CaseStudies
cs-banking | 1559526324-4b87b5e36e44 | Banking case study hero
cs-healthcare | 1576091160550-2173dba999ef | Healthcare case study hero
cs-government | 1486406146926-c627a92ad1ab | Government case study hero

---

## How to find new Unsplash images
1. Go to https://unsplash.com/s/photos/<keyword>
2. Click an image
3. Copy the photo ID from the URL (e.g. `https://unsplash.com/photos/<ID>` or the `images.unsplash.com/photo-<ID>` pattern)
4. Add a new line: `<section>-<descriptor> | <photo-id> | <description>`
5. Re-run `pnpm fetch:assets`

If an ID is no longer valid, the fetcher logs a warning and skips that entry. Existing files in the destination folder are preserved (not overwritten on a re-run).