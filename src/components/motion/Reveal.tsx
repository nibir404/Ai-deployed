"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scans its subtree for animation hooks and wires them to ScrollTrigger:
 *  data-reveal            fade + rise
 *  data-reveal="left|right|scale|clip"
 *  data-reveal-stagger    children of this element reveal one after another
 *  data-split             headline split into lines/words that rise from a mask
 *  data-parallax="0.2"    vertical parallax (speed)
 *  data-count             numbers count up (keeps prefix/suffix)
 *  data-draw              svg paths draw in
 */
export function RevealScope({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Split headlines into masked words
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.dataset.splitDone) return;
        el.dataset.splitDone = "1";
        const words = (el.textContent || "").split(/(\s+)/);
        el.innerHTML = words
          .map((w) =>
            /^\s+$/.test(w)
              ? w
              : `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;margin-bottom:-0.08em"><span data-w style="display:inline-block">${w}</span></span>`,
          )
          .join("");
        gsap.from(el.querySelectorAll("[data-w]"), {
          yPercent: 110,
          rotate: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal;
        const from: gsap.TweenVars =
          kind === "left"
            ? { x: -48, opacity: 0 }
            : kind === "right"
              ? { x: 48, opacity: 0 }
              : kind === "scale"
                ? { scale: 0.94, opacity: 0 }
                : kind === "clip"
                  ? { clipPath: "inset(0 0 100% 0)" }
                  : { y: 36, opacity: 0 };
        gsap.from(el, {
          ...from,
          duration: kind === "clip" ? 1.2 : 1,
          ease: "expo.out",
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
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
        gsap.to(obj, {
          v: parseFloat(num),
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = `${pre}${obj.v.toFixed(decimals)}${post}`;
          },
        });
      });

      root.querySelectorAll<SVGPathElement>("[data-draw] path, [data-draw] polyline, [data-draw] line").forEach((p) => {
        const len = (p as SVGGeometryElement).getTotalLength?.() || 400;
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: p, start: "top 90%" } },
        );
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
