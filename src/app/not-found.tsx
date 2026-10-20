"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt } from "@/components/motion/Tilt";
import css from "./not-found.module.css";

const PixelField = dynamic(() => import("@/components/gl/PixelField").then((m) => m.PixelField), { ssr: false });

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const pixel = '"Geist Pixel", var(--font-mono)';
const RED = "#D9534F";

function Float({ children, style, d = 0, amp = 10 }: { children: React.ReactNode; style: React.CSSProperties; d?: number; amp?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div aria-hidden style={{ position: "absolute", ...style }} animate={reduce ? undefined : { y: [0, -amp, 0], x: [0, amp / 3, 0] }} transition={{ duration: 5 + d, repeat: Infinity, ease: "easeInOut", delay: d }}>
      {children}
    </motion.div>
  );
}

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <PageShell cta={false} footer={false}>
      <div ref={ref} onPointerMove={onMove} className={`col ${css.body}`} style={{ alignItems: "center", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "40px", justifyContent: "center", overflow: "clip", paddingBlock: "56px", position: "relative" }}>
        <div className={css.spot} />
        {/* Dither band at the bottom, pointer-reactive */}
        <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "180px", opacity: 0.6, pointerEvents: "none" }}>
          <PixelField mode={0} />
        </div>

        <RevealScope style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%" }}>
          <div data-reveal="" style={{ alignItems: "center", backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", display: "flex", gap: "10px", paddingBlock: "8px", paddingInline: "14px" }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ backgroundColor: RED, flexShrink: 0, height: "8px", width: "8px" }} />
            <div style={{ color: RED, fontFamily: pixel, fontSize: "12px", letterSpacing: "0.08em", lineHeight: "16px" }}>ERROR 404 · FAIL CLOSED</div>
          </div>

          <div className={css.row} style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <div data-reveal="left" className={css.digit} style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "340px", fontWeight: 500, letterSpacing: "-0.06em", lineHeight: "280px" }}>4</div>
            <Tilt max={10}>
              <div data-reveal="scale" className={css.gate} style={{ backgroundColor: "var(--c-band)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, height: "280px", justifyContent: "space-between", padding: "16px", width: "220px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#9C9C96", fontFamily: pixel, fontSize: "11px", letterSpacing: "0.08em", lineHeight: "14px" }}>GATE / 00</div>
                  <motion.div animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ backgroundColor: RED, flexShrink: 0, height: "10px", width: "10px" }} />
                </div>
                <div className={css.stripe} style={{ flexShrink: 0, height: "44px" }} />
                <div className={css.blocked} style={{ color: "var(--c-band-text)", fontFamily: pixel, fontSize: "18px", letterSpacing: "0.08em", lineHeight: "20px" }}>BLOCKED</div>
              </div>
            </Tilt>
            <div data-reveal="right" className={css.digit} style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "340px", fontWeight: 500, letterSpacing: "-0.06em", lineHeight: "280px" }}>4</div>
          </div>

          <h1 data-split="" className={css.headline} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: "40px", letterSpacing: "-0.03em", lineHeight: "44px", textAlign: "center" }}>
            This page didn’t pass the gate.
          </h1>

          <div data-reveal="" data-delay="0.15" className={css.ctas} style={{ display: "flex", gap: "10px" }}>
            <Magnetic strength={0.25}>
              <Link href="/" className="btn btn-primary" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", height: "36px", paddingInline: "16px", textDecoration: "none" }}>
                <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>
                  BACK TO HOME <span className="arrow">→</span>
                </span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn btn-ghost" style={{ alignItems: "center", backgroundColor: "var(--c-surface)", border: "1px solid var(--c-disabled)", display: "flex", height: "36px", paddingInline: "16px", textDecoration: "none" }}>
                <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>START A CONVERSATION</span>
              </Link>
            </Magnetic>
          </div>
        </RevealScope>

        <Float style={{ left: "40px", top: "40px" }} amp={8}>
          <svg width="120" height="80" viewBox="0 0 120 80">
            <rect x="0" y="0" width="8" height="8" fill="var(--c-accent)" />
            <rect x="8" y="0" width="8" height="8" fill="var(--c-accent)" opacity="0.5" />
            <rect x="0" y="8" width="8" height="8" fill="var(--c-accent)" opacity="0.5" />
            <rect x="24" y="16" width="8" height="8" fill="var(--c-text)" opacity="0.18" />
            <rect x="40" y="8" width="8" height="8" fill="var(--c-text)" opacity="0.12" />
            <rect x="16" y="32" width="8" height="8" fill="var(--c-text)" opacity="0.12" />
          </svg>
        </Float>
        <Float style={{ right: "40px", bottom: "40px" }} d={1.2} amp={8}>
          <svg width="120" height="80" viewBox="0 0 120 80">
            <rect x="112" y="72" width="8" height="8" fill={RED} />
            <rect x="104" y="72" width="8" height="8" fill={RED} opacity="0.5" />
            <rect x="112" y="64" width="8" height="8" fill={RED} opacity="0.5" />
            <rect x="88" y="56" width="8" height="8" fill="var(--c-text)" opacity="0.18" />
            <rect x="72" y="64" width="8" height="8" fill="var(--c-text)" opacity="0.12" />
            <rect x="96" y="40" width="8" height="8" fill="var(--c-text)" opacity="0.12" />
          </svg>
        </Float>
        <Float style={{ left: "calc(50% + 116px)", top: "500px" }} d={0.6} amp={14}>
          <svg className={css.hideSm} width="64" height="48" viewBox="0 0 64 48">
            <rect x="0" y="0" width="6" height="6" fill={RED} opacity="0.7" />
            <rect x="14" y="12" width="6" height="6" fill={RED} opacity="0.45" />
            <rect x="6" y="26" width="6" height="6" fill={RED} opacity="0.3" />
            <rect x="26" y="34" width="6" height="6" fill={RED} opacity="0.18" />
          </svg>
        </Float>
      </div>
    </PageShell>
  );
}
