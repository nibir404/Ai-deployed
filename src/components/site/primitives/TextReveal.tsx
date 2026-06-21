"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "div" | "p" | "span";
  className?: string;
  /** Stagger between words in seconds. Default 0.04 */
  stagger?: number;
  /** Once-only animation. Default true */
  once?: boolean;
};

/**
 * TextReveal — wraps a heading, splits text into per-word spans,
 * and staggers them upward via GSAP ScrollTrigger. Skips children
 * that aren't plain text (icons etc.). Honors prefers-reduced-motion.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  className,
  stagger = 0.04,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Collect all word spans created by splitText below.
    const words = root.querySelectorAll("[data-word]");
    if (words.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.set(words, {
        opacity: 0,
        y: reduceMotion ? 0 : "110%",
      });

      const tween = gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger,
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => cleanup?.();
  }, [stagger, once]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      <WordSplit>{children}</WordSplit>
    </Tag>
  );
}

/**
 * Recursively walks children, splitting text into word spans with
 * `data-word` attributes. Non-text nodes pass through.
 */
function WordSplit({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    return (
      <>
        {children.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            aria-hidden
          >
            <span data-word className="inline-block will-change-transform">
              {word}
            </span>
            {i < children.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </>
    );
  }
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, i) => (
          <WordSplit key={i}>{child}</WordSplit>
        ))}
      </>
    );
  }
  return <>{children}</>;
}