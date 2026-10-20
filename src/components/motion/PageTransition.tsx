"use client";

import { motion } from "framer-motion";
import { PAGE_ENTERED } from "@/components/providers/SmoothScroll";

const COLS = 12;
const EASE = [0.65, 0, 0.35, 1] as const;

/** Used by app/template.tsx: a pixel-column wipe uncovers each new page. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none", display: "flex" }}>
        {Array.from({ length: COLS }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.025 * Math.abs(i - (COLS - 1) / 2), ease: EASE }}
            style={{ flex: 1, background: i % 3 === 1 ? "var(--c-accent)" : "var(--c-text)", transformOrigin: "top", willChange: "transform" }}
          />
        ))}
      </div>
      {/* Opacity only: a transform on this wrapper would offset every ScrollTrigger
          measurement and break GSAP pinning while the page settles. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        onAnimationComplete={() => window.dispatchEvent(new Event(PAGE_ENTERED))}
      >
        {children}
      </motion.div>
    </>
  );
}
