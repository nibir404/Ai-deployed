"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Selector within the container that should be staggered. Default `[data-stack]` */
  selector?: string;
  /** Stagger in seconds between each child. Default 0.08 */
  stagger?: number;
  /** Travel distance for cards. Default 24px */
  distance?: number;
  /** Once-only animation. Default true */
  once?: boolean;
};

/**
 * StackReveal — wraps children, finds direct descendants matching
 * `selector`, and staggers them in via GSAP ScrollTrigger when the
 * container enters the viewport. Honors prefers-reduced-motion.
 */
export function StackReveal({
  children,
  className,
  selector = "[data-stack]",
  stagger = 0.08,
  distance = 24,
  once = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(selector);
    if (targets.length === 0) return;

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

      gsap.set(targets, {
        opacity: 0,
        y: reduceMotion ? 0 : distance,
        rotate: reduceMotion ? 0 : 1.2,
      });

      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [selector, stagger, distance, once]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}