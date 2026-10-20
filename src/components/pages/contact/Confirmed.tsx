"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import css from "./Contact.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const WEEKDAYS: Record<string, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const COLORS = ["var(--c-accent)", "#3E8E66", "var(--c-text)", "#D9534F", "var(--c-accent)"];

function formatWhen(day: string | null, time: string | null) {
  const fallback = "Thursday 22 Oct at 10:30";
  if (!day || !time || !/^\d{1,2}:\d{2}$/.test(time)) return fallback;
  const m = day.trim().match(/^([A-Za-z]{3})[a-z]*\s+(\d{1,2})\s+([A-Za-z]{3})$/);
  if (!m) return fallback;
  const wd = WEEKDAYS[m[1].toLowerCase()];
  if (!wd) return fallback;
  return `${wd} ${m[2]} ${m[3][0].toUpperCase()}${m[3].slice(1).toLowerCase()} at ${time}`;
}

function PixelBurst() {
  const reduce = useReducedMotion();
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2 + ((i * 37) % 10) / 20;
        const r = 140 + ((i * 53) % 160);
        return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.7, s: 6 + ((i * 7) % 3) * 2, c: COLORS[i % COLORS.length], d: ((i * 13) % 10) / 50 };
      }),
    [],
  );
  if (reduce) return null;
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", top: "180px", pointerEvents: "none", zIndex: 2 }}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 120], opacity: [1, 1, 0], scale: 1, rotate: (i % 2 ? 1 : -1) * 90 }}
          transition={{ duration: 1.6, delay: 0.25 + b.d, ease: [0.16, 1, 0.3, 1], times: [0, 0.55, 1] }}
          style={{ position: "absolute", width: b.s, height: b.s, background: b.c }}
        />
      ))}
    </div>
  );
}

export function Confirmed() {
  const params = useSearchParams();
  const when = formatWhen(params.get("day"), params.get("time"));

  return (
    <RevealScope className={`col ${css.confirmed}`} style={{ position: "relative", alignItems: "center", backgroundColor: "var(--c-bg-alt)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", justifyContent: "center", minHeight: "798px", paddingBlock: "72px", paddingInline: "56px", overflow: "hidden" }}>
      <PixelBurst />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, width: "min(720px, 100%)" }}
      >
        <div style={{ borderBottom: "1px solid var(--c-line)", display: "flex" }}>
          {["01 THE WORK", "02 TIME", "03 DETAILS"].map((s, i) => (
            <div key={s} style={{ position: "relative", borderRight: i < 2 ? "1px solid var(--c-line)" : 0, flexBasis: "0%", flexGrow: 1, paddingBlock: "14px 17px", paddingInline: "16px" }}>
              <div style={{ color: "var(--c-accent-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>✓ {s}</div>
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" }} style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 3, background: "var(--c-accent)", transformOrigin: "left" }} />
            </div>
          ))}
        </div>
        <div className={css.cardPad} style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "40px" }}>
          <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ backgroundColor: "#3E8E66", flexShrink: 0, height: "8px", width: "8px" }} />
            <div style={{ color: "#3E8E66", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>CONFIRMED · INVITE SENT</div>
          </div>
          <h1 data-split="" className={css.h44} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: "44px", letterSpacing: "-0.03em", lineHeight: "48px" }}>
            See you {when}.
          </h1>
          <div data-reveal="" className="hover-lift" style={{ alignItems: "center", backgroundColor: "var(--c-bg-alt)", display: "flex", gap: "16px", padding: "20px" }}>
            <div style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", flexShrink: 0, height: "64px", justifyContent: "center", width: "56px" }}>
              <div style={{ backgroundImage: "url(/assets/1836H27H757SZG0C9T7EEDT5KQ.svg)", backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: 0, height: "44px", width: "36px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "18px", lineHeight: "22px" }}>Your engineer is assigned</div>
              <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>AI ENGINEER · SUPPORT AGENTS · 6 SYSTEMS SHIPPED</div>
            </div>
          </div>
          <div data-reveal-stagger="" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>BEFORE THE CALL · OPTIONAL · 10 MIN</div>
            {["Sketch the systems involved", "Name the one step that hurts most", "Pick one metric you’d like to move"].map((t) => (
              <div key={t} style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "18px" }}>→ {t}</div>
            ))}
          </div>
          <div className={`r-wrap ${css.ctaRow}`} style={{ borderTop: "1px solid var(--c-line)", display: "flex", gap: "10px", paddingTop: "20px" }}>
            <Magnetic strength={0.2}>
              <a className="btn btn-primary" href={`data:text/calendar;charset=utf8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:AI Deployed · intro call\nDESCRIPTION:${when}\nEND:VEVENT\nEND:VCALENDAR`)}`} download="ai-deployed-call.ics" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", height: "36px", paddingInline: "16px", textDecoration: "none" }}>
                <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>ADD TO CALENDAR</span>
              </a>
            </Magnetic>
            <Link className="btn btn-ghost" href="/governance" style={{ alignItems: "center", border: "1px solid var(--c-disabled)", display: "flex", height: "36px", paddingInline: "16px", textDecoration: "none" }}>
              <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>SEND SECURITY PACK TO CISO</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </RevealScope>
  );
}
