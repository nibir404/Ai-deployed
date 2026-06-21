# Public Assets

Drop custom static assets here. They are served from the site root (`/`) by Next.js.

Suggested layout:

```
public/
  fonts/           # Custom .woff2 files (loaded via next/font/local if needed)
  images/          # Raster images, hero photos, OG images
  icons/           # SVG icons referenced via /icons/foo.svg
  illustrations/   # Section illustrations (SVGs)
  documents/       # PDFs (whitepapers, case studies)
  favicon.ico
  apple-touch-icon.png
  og-default.png   # 1200x630 social preview
```

Usage in components:

```tsx
import Image from "next/image";
<Image src="/images/hero.jpg" alt="…" width={1600} height={900} />;
```

For SVGs that need to inherit color, prefer inlining or use `unplugin-icons` — Next will not color-tweak `<img>` SVGs.
