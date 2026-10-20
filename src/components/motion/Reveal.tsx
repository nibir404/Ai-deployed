"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** One motion language for every scroll reveal on the site. */
export const REVEAL = {
  ease: "power3.out",
  duration: 0.9,
  distance: 28,
  stagger: 0.08,
  start: "top 86%",
} as const;

/**
 * Scans its subtree for animation hooks and wires them to ScrollTrigger:
 *  data-reveal            fade + rise
 *  data-reveal="left|right|scale|clip|fade"
 *  data-delay             seconds
 *  data-reveal-stagger    children of this element reveal one after another
 *  data-split             headline split into words that rise from a mask
 *  data-parallax="0.2"    vertical parallax (speed)
 *  data-count             numbers count up (keeps prefix/suffix)
 *  data-draw              svg paths draw in
 *
 * Initial states are applied in a layout effect (before paint) so nothing flashes,
 * every reveal plays once, and inline transforms/transitions are cleared afterwards
 * so CSS hover effects keep working.
 */
export function RevealScope({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const once = (trigger: Element, start: string = REVEAL.start) => ({ trigger, start, once: true });
      const done = "transform,opacity,clipPath,transition,visibility";

      // Headlines: masked words
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.dataset.splitDone) return;
        el.dataset.splitDone = "1";
        const words = (el.textContent || "").split(/(\s+)/);
        el.innerHTML = words
          .map((w) =>
            /^\s+$/.test(w)
              ? w
              : `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;margin-bottom:-0.12em"><span data-w style="display:inline-block;will-change:transform">${w}</span></span>`,
          )
          .join("");
        const ws = el.querySelectorAll("[data-w]");
        gsap.set(ws, { yPercent: 105 });
        gsap.to(ws, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.035,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: once(el, "top 90%"),
          clearProps: "transform",
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal;
        // Parallax owns the transform; reveal just fades so they never fight.
        const fadeOnly = kind === "fade" || el.hasAttribute("data-parallax");
        const from: gsap.TweenVars = fadeOnly
          ? { opacity: 0 }
          : kind === "left"
            ? { x: -REVEAL.distance * 1.5, opacity: 0 }
            : kind === "right"
              ? { x: REVEAL.distance * 1.5, opacity: 0 }
              : kind === "scale"
                ? { scale: 0.96, opacity: 0 }
                : kind === "clip"
                  ? { clipPath: "inset(0 0 100% 0)" }
                  : { y: REVEAL.distance, opacity: 0 };
        gsap.set(el, { ...from, transition: "none" });
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          clipPath: kind === "clip" ? "inset(0 0 0% 0)" : undefined,
          duration: kind === "clip" ? 1.1 : REVEAL.duration,
          ease: REVEAL.ease,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: once(el),
          clearProps: fadeOnly ? "opacity,transition" : done,
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        const kids = Array.from(el.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.set(kids, { y: REVEAL.distance * 0.8, opacity: 0, transition: "none" });
        gsap.to(kids, {
          y: 0,
          opacity: 1,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger: REVEAL.stagger,
          scrollTrigger: once(el),
          clearProps: done,
        });
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -speed * 40 },
          {
            yPercent: speed * 40,
            ease: "none",
            // A little smoothing on the scrub hides wheel steps without feeling laggy.
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.textContent || "";
        const m = raw.match(/^(\D*)([\d.]+)([\s\S]*)$/);
        if (!m) return;
        const [, pre, num, post] = m;
        const decimals = (num.split(".")[1] || "").length;
        const obj = { v: 0 };
        el.textContent = `${pre}${(0).toFixed(decimals)}${post}`;
        gsap.to(obj, {
          v: parseFloat(num),
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: once(el),
          onUpdate: () => {
            el.textContent = `${pre}${obj.v.toFixed(decimals)}${post}`;
          },
        });
      });

      root.querySelectorAll<SVGGeometryElement>("[data-draw] path, [data-draw] polyline, [data-draw] line").forEach((p) => {
        const len = p.getTotalLength?.() || 400;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", scrollTrigger: once(p, "top 90%") });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
