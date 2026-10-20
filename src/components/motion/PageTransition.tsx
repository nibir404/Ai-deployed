"use client";

import { motion } from "framer-motion";

const COLS = 12;

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
            transition={{ duration: 0.7, delay: 0.03 * Math.abs(i - COLS / 2), ease: [0.65, 0, 0.35, 1] }}
            style={{ flex: 1, background: i % 3 === 1 ? "var(--c-accent)" : "var(--c-text)", transformOrigin: "top" }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
