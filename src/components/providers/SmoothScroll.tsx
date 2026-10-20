"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Fired by PageTransition once the new page has settled in place. */
export const PAGE_ENTERED = "aid:page-entered";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      anchors: { offset: -100 },
    });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
    };
  }, []);

  // Trigger positions go stale whenever layout shifts after mount (fonts, images,
  // 3D canvases, accordions). Re-measure, debounced, whenever the page height changes.
  useEffect(() => {
    let t = 0;
    const refresh = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    window.addEventListener("load", refresh);
    window.addEventListener(PAGE_ENTERED, refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("load", refresh);
      window.removeEventListener(PAGE_ENTERED, refresh);
    };
  }, []);

  // New route starts at the top; hash links land on their section.
  useEffect(() => {
    const hash = window.location.hash;
    lenis?.resize();
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => lenis?.scrollTo(el as HTMLElement, { offset: -100, immediate: true }));
        return;
      }
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
