"use client";

import { useEffect } from "react";

/**
 * SmoothScroll — GSAP-driven smooth scrolling for in-page anchor links.
 *
 * Intercepts clicks on `<a href="#...">` and `<a href="/#...">` and
 * animates `window.scrollTo` via GSAP's ScrollToPlugin, replacing the
 * browser's native jump and the CSS `scroll-behavior: smooth` baseline
 * with a curated ease (power3.inOut) and a consistent duration across
 * the site.
 *
 * Native scrolling is preserved for everything else (wheel, touch,
 * keyboard, scrollbar drag), so ScrollTrigger-driven animations,
 * the fixed header, and ScrollProgress continue to work unchanged.
 *
 * Honors `prefers-reduced-motion` by falling back to instant jumps.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isInPageAnchor = (href: string) => {
      // Strip query/fragment, check if it points to a hash on this page.
      if (!href) return false;
      // Strip leading "/" to compare against pathname
      const pathPart = href.split("#")[0];
      const hashPart = href.split("#")[1];
      if (!hashPart) return false;
      // Empty pathPart ("#foo") or matches current path ("/#foo")
      if (pathPart === "" || pathPart === window.location.pathname) {
        return true;
      }
      return false;
    };

    const getTargetEl = (id: string): HTMLElement | null => {
      if (!id) return null;
      try {
        return document.getElementById(decodeURIComponent(id));
      } catch {
        return document.getElementById(id);
      }
    };

    const onClick = (e: MouseEvent) => {
      // Ignore modified clicks (open in new tab, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      if (!isInPageAnchor(href)) return;

      const id = href.split("#")[1];
      const el = getTargetEl(id);
      if (!el) return;

      e.preventDefault();

      // Compute the absolute Y of the target relative to the document
      const rect = el.getBoundingClientRect();
      const y = window.scrollY + rect.top;

      if (reduceMotion) {
        window.scrollTo({ top: y, behavior: "auto" });
        // Update URL hash without scrolling
        history.pushState(null, "", `#${id}`);
        return;
      }

      // GSAP scrollTo animation
      (async () => {
        const gsapMod = await import("gsap");
        const stpMod = await import("gsap/ScrollToPlugin");
        const gsap = gsapMod.default ?? gsapMod.gsap;
        const ScrollToPlugin = stpMod.ScrollToPlugin ?? stpMod.default;
        gsap.registerPlugin(ScrollToPlugin);

        gsap.to(window, {
          duration: 1.0,
          scrollTo: { y, autoKill: false },
          ease: "power3.inOut",
          onComplete: () => {
            history.pushState(null, "", `#${id}`);
          },
        });
      })();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}