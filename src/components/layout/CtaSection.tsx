"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealScope } from "@/components/motion/Reveal";

const PixelField = dynamic(() => import("@/components/gl/PixelField").then((m) => m.PixelField), { ssr: false });

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const floaty = (d: number) => ({
  animate: { y: [0, -6, 0], opacity: [1, 0.6, 1] },
  transition: { duration: 3 + d, repeat: Infinity, ease: "easeInOut" as const, delay: d },
});

/** "Let's talk." closing CTA shared by most pages (Paper: Closing CTA). */
export function CtaSection() {
  return (
    <RevealScope
      className="col cta-section"
      style={{ alignItems: "center", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", gap: 32, paddingBlock: 160, paddingInline: 56, position: "relative", overflow: "hidden" }}
    >
      <PixelField />
      <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", lineHeight: "14px", position: "relative" }}>/ START</div>
      <h2 data-split className="cta-title" style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: 64, letterSpacing: "-0.035em", lineHeight: "68px", position: "relative", textAlign: "center", maxWidth: 1000 }}>
        Let’s talk.
      </h2>
      <p data-reveal style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: 17, lineHeight: "26px", position: "relative", textAlign: "center", maxWidth: 460 }}>
        A short conversation with one of the engineers who would do the work. We’ll tell you when we’re not the right fit.
      </p>
      <div data-reveal className="cta-buttons" style={{ display: "flex", gap: 10, position: "relative" }}>
        <Magnetic>
          <Link href="/contact" className="btn btn-primary" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", height: 36, paddingInline: 16 }}>
            <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", lineHeight: "16px" }}>
              TALK TO US <span className="arrow">→</span>
            </span>
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/platform" className="btn btn-ghost" style={{ alignItems: "center", border: "1px solid var(--c-disabled)", display: "flex", height: 36, paddingInline: 16 }}>
            <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: 12, letterSpacing: "0.06em", lineHeight: "16px" }}>SEE THE PLATFORM</span>
          </Link>
        </Magnetic>
      </div>
      <svg className="cta-pixels" width="56" height="48" viewBox="0 0 56 48" style={{ position: "absolute", left: 40, top: 40 }}>
        <motion.rect {...floaty(0)} x="0" y="0" width="8" height="8" fill="var(--c-accent)" />
        <motion.rect {...floaty(0.4)} x="8" y="0" width="8" height="8" fill="var(--c-accent)" opacity="0.5" />
        <motion.rect {...floaty(0.8)} x="0" y="8" width="8" height="8" fill="var(--c-accent)" opacity="0.5" />
        <motion.rect {...floaty(1.2)} x="24" y="16" width="8" height="8" fill="var(--c-text)" opacity="0.16" />
        <motion.rect {...floaty(1.6)} x="40" y="8" width="8" height="8" fill="var(--c-text)" opacity="0.1" />
        <motion.rect {...floaty(2)} x="16" y="32" width="8" height="8" fill="var(--c-text)" opacity="0.1" />
      </svg>
      <svg className="cta-pixels" width="56" height="48" viewBox="0 0 56 48" style={{ position: "absolute", right: 40, top: 40 }}>
        <motion.rect {...floaty(0.2)} x="48" y="0" width="8" height="8" fill="var(--c-text)" opacity="0.7" />
        <motion.rect {...floaty(0.6)} x="40" y="0" width="8" height="8" fill="var(--c-text)" opacity="0.25" />
        <motion.rect {...floaty(1)} x="48" y="8" width="8" height="8" fill="var(--c-text)" opacity="0.25" />
        <motion.rect {...floaty(1.4)} x="24" y="16" width="8" height="8" fill="var(--c-text)" opacity="0.12" />
        <motion.rect {...floaty(1.8)} x="40" y="32" width="8" height="8" fill="var(--c-text)" opacity="0.1" />
      </svg>
    </RevealScope>
  );
}
