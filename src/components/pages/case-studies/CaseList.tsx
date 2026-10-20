"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BeforeAfter } from "./BeforeAfter";
import { CountUp } from "./CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import s from "./CaseStudies.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const ease = [0.16, 1, 0.3, 1] as const;

type Cat = "SUPPORT" | "OPERATIONS" | "FINANCE" | "SALES" | "ANALYTICS";
type Env = "CLOUD" | "PRIVATE CLOUD" | "ON-PREM";

const FEATURED = { cat: "SUPPORT" as Cat, env: "ON-PREM" as Env };

const CASES: { cat: Cat; env: Env; icon: string; title: string; metric: string; label: string }[] = [
  { cat: "FINANCE", env: "PRIVATE CLOUD", icon: "/assets/2QJBGWSAYPMM0BZPN9PGSSWBD8.svg", title: "Invoice reconciliation for a regional distributor", metric: "3×", label: "FASTER MONTH-END CLOSE" },
  { cat: "OPERATIONS", env: "ON-PREM", icon: "/assets/74W5B9743X487YRTEYFEC8AAKQ.svg", title: "Low-stock reorder agent for a 3PL warehouse network", metric: "0", label: "STOCK-OUTS IN 12 WEEKS" },
  { cat: "SALES", env: "CLOUD", icon: "/assets/1M355EEJ2XXRNNS8DJHZR0BDHK.svg", title: "Post-demo follow-ups for a B2B software team", metric: "4.1h", label: "SAVED PER REP / WEEK" },
  { cat: "ANALYTICS", env: "PRIVATE CLOUD", icon: "/assets/5JA4C2FFGX8H9HME80DZ32AB5V.svg", title: "Weekly board notes from pipeline data", metric: "91%", label: "APPROVED WITHOUT EDITS" },
  { cat: "SUPPORT", env: "ON-PREM", icon: "/assets/29NKXSDQ80QYX02H4KXVTXHXXJ.svg", title: "Inbound triage for an insurer’s claims desk", metric: "70%", label: "AUTO-ROUTED CORRECTLY" },
];

const FILTERS: { key: Cat | "ALL"; label: string }[] = [
  { key: "ALL", label: "ALL · 6" },
  { key: "SUPPORT", label: "SUPPORT" },
  { key: "OPERATIONS", label: "OPERATIONS" },
  { key: "FINANCE", label: "FINANCE" },
  { key: "SALES", label: "SALES" },
];
const ENVS: (Env | "ANY")[] = ["ANY", "CLOUD", "PRIVATE CLOUD", "ON-PREM"];

const cellLine = "inset -1px -1px 0 var(--c-line)";

export function CaseList() {
  const [cat, setCat] = useState<Cat | "ALL">("ALL");
  const [env, setEnv] = useState<Env | "ANY">("ANY");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const match = (c: { cat: Cat; env: Env }) => (cat === "ALL" || c.cat === cat) && (env === "ANY" || c.env === env);
  const visible = CASES.filter(match);
  const showFeatured = match(FEATURED);

  return (
    <>
      {/* Filters */}
      <div
        className={`col ${s.filters}`}
        data-reveal=""
        role="toolbar"
        aria-label="Filter case studies"
        style={{ borderColor: "var(--c-line)", borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box", fontSize: "12px", lineHeight: "16px", position: "relative", zIndex: 5 }}
      >
        <div className={s.strip} data-lenis-prevent="">
        {FILTERS.map((f, i) => {
          const active = cat === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setCat(f.key)}
              className="cs-filter"
              style={{ alignItems: "center", borderLeft: i ? "1px solid var(--c-line)" : "none", boxSizing: "border-box", display: "flex", height: "48px", paddingInline: "20px", position: "relative", cursor: "pointer" }}
            >
              {active && (
                <motion.span layoutId="cs-filter-bg" transition={{ type: "spring", stiffness: 420, damping: 38 }} style={{ position: "absolute", inset: 0, background: "var(--c-band)" }} />
              )}
              <span style={{ position: "relative", color: active ? "var(--c-band-text)" : "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", transition: "color 0.3s" }}>{f.label}</span>
            </button>
          );
        })}
        <div className={s.stripSpacer} style={{ borderLeft: "1px solid var(--c-line)", boxSizing: "border-box", flexBasis: "0%", flexGrow: "1" }} />
        </div>
        <div ref={menuRef} className={s.envWrap} style={{ position: "relative" }}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{ alignItems: "center", borderLeft: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", gap: "8px", height: "48px", paddingInline: "20px", cursor: "pointer" }}
          >
            <span style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px" }}>ENVIRONMENT: {env}</span>
            <motion.svg animate={{ rotate: open ? 180 : 0 }} width="10" height="10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: "0" }}>
              <path d="M6 9l6 6 6-6" fill="none" stroke="var(--c-text)" strokeWidth="2.4" />
            </motion.svg>
          </button>
          <AnimatePresence>
            {open && (
              <motion.ul
                role="listbox"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", right: -1, top: "100%", minWidth: "calc(100% + 1px)", background: "var(--c-surface)", border: "1px solid var(--c-border)", listStyle: "none", margin: 0, padding: 4 }}
              >
                {ENVS.map((e) => (
                  <li key={e}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={env === e}
                      onClick={() => {
                        setEnv(e);
                        setOpen(false);
                      }}
                      className="hover-row"
                      style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 12px", cursor: "pointer", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", color: env === e ? "var(--c-accent-text)" : "var(--c-text)", textAlign: "left" }}
                    >
                      {e}
                      {env === e && <span>●</span>}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Featured case */}
      <AnimatePresence initial={false}>
        {showFeatured && (
          <motion.div
            key="featured"
            className="col"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            style={{ overflow: "hidden" }}
          >
            <div
              className={s.featured}
              style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", fontSize: "12px", lineHeight: "16px" }}
            >
              <div className={s.featuredText} style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ boxSizing: "border-box", display: "flex", gap: "8px" }}>
                  <div style={{ backgroundColor: "var(--c-accent)", display: "inline-block", paddingBlock: "4px", paddingInline: "8px" }}>
                    <div style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>FEATURED</div>
                  </div>
                  <div style={{ borderColor: "var(--c-border)", borderStyle: "solid", borderWidth: "1px", display: "inline-block", paddingBlock: "4px", paddingInline: "8px" }}>
                    <div style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>SUPPORT · LOGISTICS</div>
                  </div>
                </div>
                <div className={s.featuredTitle} style={{ color: "var(--c-text)", fontFamily: sans, letterSpacing: "-0.025em" }}>Customer-reply agent for an 800-person carrier.</div>
                <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: "16px", lineHeight: "25px" }}>
                  Drafts replies from approved knowledge. Review-before-send. Live in week four, edit rate down from 38% to 9% by week seven.
                </div>
                <div style={{ borderTop: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex" }}>
                  <div style={{ display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: "1", gap: "4px", paddingTop: "16px" }}>
                    <CountUp value="52%" style={{ color: "var(--c-accent-text)", fontFamily: sans, fontSize: "40px", letterSpacing: "-0.04em", lineHeight: "48px" }} />
                    <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>LESS TRIAGE TIME</div>
                  </div>
                  <div style={{ display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: "1", gap: "4px", paddingTop: "16px" }}>
                    <CountUp value="W4" style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "40px", letterSpacing: "-0.04em", lineHeight: "48px" }} />
                    <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>IN PRODUCTION</div>
                  </div>
                </div>
                <div style={{ alignSelf: "start" }}>
                  <Magnetic>
                    <Link href="/case-studies/customer-reply-agent" className="btn btn-primary" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", boxSizing: "border-box", display: "flex", height: "36px", paddingInline: "16px" }}>
                      <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>
                        READ THE CASE <span className="arrow">→</span>
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </div>
              <BeforeAfter />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case grid */}
      <div className="col" style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", overflow: "hidden" }}>
        <motion.div layout className={s.grid} style={{ marginRight: -1, marginBottom: -1 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c) => (
              <motion.div
                key={c.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease }}
                className={`cs-card ${s.card}`}
                style={{ boxShadow: cellLine, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "28px", padding: "32px", background: "var(--c-bg)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="cs-icon" style={{ backgroundImage: `url(${c.icon})`, backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: "0", height: "32px", width: "32px" }} />
                  <div style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>
                    {c.cat} · {c.env}
                  </div>
                </div>
                <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "22px", lineHeight: "28px" }}>{c.title}</div>
                <div style={{ alignItems: "baseline", borderTop: "1px solid var(--c-line)", display: "flex", gap: "10px", paddingTop: "16px", marginTop: "auto" }}>
                  <CountUp value={c.metric} style={{ color: "var(--c-accent-text)", fontFamily: sans, fontSize: "40px", letterSpacing: "-0.04em", lineHeight: "48px" }} />
                  <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>{c.label}</div>
                </div>
              </motion.div>
            ))}
            <motion.div
              key="next"
              layout
              transition={{ duration: 0.5, ease }}
              style={{ backgroundColor: "var(--c-bg-alt)", boxShadow: cellLine, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "28px", justifyContent: "space-between", padding: "32px" }}
              className={s.card}
            >
              <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>
                {visible.length === 0 && !showFeatured ? "NO CASE HERE YET" : "YOUR CASE NEXT?"}
              </div>
              <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "22px", lineHeight: "28px" }}>Tell us the one job that costs you most.</div>
              <div style={{ alignSelf: "start" }}>
                <Magnetic>
                  <Link href="/contact" className="btn btn-primary" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", height: "36px", paddingInline: "16px" }}>
                    <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>
                      START A CONVERSATION <span className="arrow">→</span>
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`
        .cs-filter:not([aria-pressed="true"]):hover { background: var(--c-bg-alt); }
        .cs-card { transition: background-color .35s var(--ease-out); }
        .cs-card:hover { background: var(--c-surface) !important; }
        .cs-icon { transition: transform .5s var(--ease-out); }
        .cs-card:hover .cs-icon { transform: translateY(-3px) rotate(-6deg) scale(1.08); }
        :root[data-theme="dark"] .ba-panel { background-color: var(--c-bg) !important; }
      `}</style>
    </>
  );
}
