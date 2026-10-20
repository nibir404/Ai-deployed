"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import s from "./Home.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const W = 1278;
const H = 770;

// marker positions in artboard px (dot center = left+6, top+9)
const PINS = [
  { id: "in", label: "INDIA", left: 231, top: 430 },
  { id: "bd", label: "BANGLADESH", left: 456, top: 360 },
  { id: "vn", label: "VIETNAM", left: 656, top: 396 },
  { id: "th", label: "THAILAND", left: 583, top: 504 },
  { id: "lk", label: "SRI LANKA", left: 319, top: 592 },
  { id: "sg", label: "MALAYSIA · SINGAPORE", left: 599, top: 640 },
  { id: "jp", label: "JAPAN", left: 1086, top: 182 },
];

const REGIONS = [
  { pin: "bd", name: "Bangladesh · Dhaka", mode: "ON-PREM", green: true },
  { pin: "in", name: "India · Mumbai", mode: "PRIVATE CLOUD" },
  { pin: "sg", name: "Singapore", mode: "PRIVATE CLOUD" },
];

const pct = (x: number, total: number) => `${(x / total) * 100}%`;

export function Residency() {
  const [sel, setSel] = useState("bd");
  const pin = PINS.find((p) => p.id === sel)!;
  const cx = pin.left + 6;
  const cy = pin.top + 9;

  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <div className={s.head} style={{ paddingBottom: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ DATA RESIDENCY</div>
          <h2 data-split className={s.h2} style={{ color: "var(--c-text)", maxWidth: 600 }}>Your data stays in your country.</h2>
        </div>
        <p data-reveal className={s.lede}>We deploy in-region on your hardware or your cloud tenancy. No cross-border copies, ever.</p>
      </div>

      <div className={s.mapWrap} style={{ borderTop: "1px solid var(--c-line)" }}>
        <div className={s.mapStage} data-reveal="clip">
          <div className="home-map-img" style={{ position: "absolute", top: 0, height: "100%", left: pct(99, W), width: pct(1080, W), backgroundImage: "url(/assets/5W6X99AC6V6SCN8VTANQMB7KQH.png)", backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }} />
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
            {/* blocked cross-border route */}
            <motion.path d="M664 405 L1094 190" fill="none" stroke="#D9534F" strokeWidth="1.5" strokeDasharray="5 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "0px 0px -14% 0px" }} transition={{ duration: 1.2, delay: 0.4 }} />
            <motion.path d="M872 293 l10 10 M882 293 l-10 10" fill="none" stroke="#D9534F" strokeWidth="2" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px 0px -14% 0px" }} transition={{ delay: 1.4 }} style={{ transformOrigin: "877px 298px" }} />
            {/* selected region: route to Japan that dies at the border */}
            <motion.path
              key={sel}
              d={`M${cx} ${cy} Q ${(cx + 1092) / 2} ${Math.min(cy, 190) - 120} 1092 188`}
              fill="none"
              stroke="var(--c-accent)"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: [0, 0.55, 0.55], opacity: [0.9, 0.9, 0] }}
              transition={{ duration: 2.4, times: [0, 0.6, 1], repeat: Infinity, repeatDelay: 0.4 }}
            />
            <motion.rect key={`r-${sel}`} x={cx - 6} y={cy - 6} width={12} height={12} fill="none" stroke="var(--c-accent)" strokeWidth={1.5} initial={{ scale: 1, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
          </svg>

          <motion.div initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -14% 0px" }} transition={{ delay: 1.5 }} className={s.mapTag} style={{ backgroundColor: "#D9534F", left: pct(830, W), top: pct(316, H), paddingBlock: 5, paddingInline: 8 }}>
            <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "11px", letterSpacing: "0.04em", lineHeight: "14px" }}>NO CROSS-BORDER COPIES</span>
          </motion.div>

          {PINS.map((p, i) => {
            const on = p.id === sel;
            return (
              <motion.button
                key={p.id}
                type="button"
                onPointerEnter={() => setSel(p.id)}
                onClick={() => setSel(p.id)}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                className={s.pin}
                style={{ left: pct(p.left, W), top: pct(p.top, H), zIndex: on ? 3 : 2 }}
              >
                <span style={{ backgroundColor: "var(--c-accent)", border: "2px solid var(--c-surface)", flexShrink: 0, height: "12px", width: "12px", transform: on ? "scale(1.25)" : "none", transition: "transform .25s" }} />
                <span className={s.pinLabel} style={{ backgroundColor: on ? "var(--c-accent)" : "var(--c-band)", paddingBlock: "3px", paddingInline: "6px", color: on ? "#FFFFFF" : "var(--c-band-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", transition: "background-color .25s" }}>{p.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className={s.regionList} data-reveal="left" style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", display: "flex", flexDirection: "column" }}>
          <div style={{ alignItems: "center", borderBottom: "1px solid var(--c-line)", display: "flex", gap: "8px", paddingBlock: "12px", paddingInline: "14px" }}>
            <motion.svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
              <circle cx="12" cy="12" r="9" fill="none" stroke="var(--c-text)" strokeWidth="1.8" />
              <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="var(--c-text)" strokeWidth="1.8" />
            </motion.svg>
            <div style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.04em", lineHeight: "14px" }}>8 REGIONS LIVE</div>
          </div>
          {REGIONS.map((r, i) => {
            const on = r.pin === sel;
            return (
              <button
                key={r.name}
                type="button"
                onPointerEnter={() => setSel(r.pin)}
                onFocus={() => setSel(r.pin)}
                onClick={() => setSel(r.pin)}
                className={s.regionRow}
                style={{ backgroundColor: on ? "var(--c-bg-alt)" : "transparent", borderBottom: i < REGIONS.length - 1 ? "1px solid var(--c-line)" : "none" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <AnimatePresence initial={false}>
                    {on && <motion.span initial={{ width: 0 }} animate={{ width: 6 }} exit={{ width: 0 }} style={{ height: 6, background: "var(--c-accent)", display: "inline-block" }} />}
                  </AnimatePresence>
                  <span style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "14px", lineHeight: "18px" }}>{r.name}</span>
                </span>
                <span style={{ color: r.green ? "#3E8E66" : "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{r.mode}</span>
              </button>
            );
          })}
        </div>
      </div>
    </RevealScope>
  );
}
