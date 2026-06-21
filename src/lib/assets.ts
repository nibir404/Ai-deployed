/**
 * Single source of truth for image asset paths.
 *
 * Every `<Image src>`, `img:` data prop, and `PageHero image.src` value
 * in the app should resolve to a string defined here. This lets us:
 *   - rename / move files in one place
 *   - swap an asset for a placeholder during build issues
 *   - keep an at-a-glance inventory of every image the site ships
 *
 * Folder convention
 * ----------------
 * `public/img/<section>/<filename>` — section names are single words
 * (e.g. `casestudies`, `whatwedo`) to match the existing source-code
 * references. Hyphenated names like `case-studies/` are reserved for
 * future section folders and are not yet consumed by the build.
 *
 * Responsive sizes
 * ----------------
 * Most editorial photos are downloaded at 3 widths (640 / 1024 / 1920
 * px) as `.webp` by `scripts/fetch-assets.mjs`. The `sm` / `md` / `lg`
 * keys expose those variants; consumers pass the right one to
 * `next/image` via `srcset` or pick a single size for non-responsive
 * contexts.
 */
export const ASSETS = {
  hero: {
    /**
     * The AI capability-map illustration used as the primary Hero photo.
     * 1536×1024 PNG, dark geometric, sits on a black background.
     */
    capabilityMap: "/img/hero/Heroimage.png",
    architectural: {
      sm: "/img/hero/hero-architectural-640.webp",
      md: "/img/hero/hero-architectural-1024.webp",
      lg: "/img/hero/hero-architectural-1920.webp",
    },
    controlRoom: {
      sm: "/img/hero/hero-control-room-640.webp",
      md: "/img/hero/hero-control-room-1024.webp",
      lg: "/img/hero/hero-control-room-1920.webp",
    },
  },
  industries: {
    finance: "/img/industries/ind-finance-1024.webp",
    telecom: "/img/industries/ind-telecom-1024.webp",
    government: "/img/industries/ind-government-1024.webp",
    healthcare: "/img/industries/ind-healthcare-1024.webp",
    education: "/img/industries/ind-education-1024.webp",
    manufacturing: "/img/industries/ind-manufacturing-1024.webp",
    logistics: "/img/industries/ind-logistics-1024.webp",
  },
  caseStudies: {
    banking: "/img/casestudies/cs-banking-1920.webp",
    government: "/img/casestudies/cs-government-1920.webp",
    healthcare: "/img/casestudies/cs-healthcare-1920.webp",
  },
  howWeWork: {
    /**
     * Decorative chrome-ring illustration used as the closing photo on
     * the How We Work page. The SVG is tiny (~1 KB) — the heavy
     * raster content (a 3000×3000 chrome ring) is stored as a
     * sibling WebP referenced by `xlink:href`. Render with a plain
     * `<img>` rather than `next/image` because the SVG's external
     * image reference is not subject to the Next image optimizer.
     */
    closingIllustration: "/img/how-we-work/closing-illustration.svg",
  },
} as const;

/** Convenience type for any single asset path string. */
export type AssetPath = string;
