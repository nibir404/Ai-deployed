"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import s from "./Home.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const sq = { fill: "none", strokeWidth: 1.8, strokeLinecap: "square" as const };

const FAQ = [
  ["Does any of our data reach the model?", "Sensitive fields are stripped before the model. PII never reaches it. Everything runs in your environment."],
  ["What happens if the policy layer fails?", "The agent stops. Policy is a hard dependency: no policy check, no generation, no action. The failure is logged and your team is alerted."],
  ["Can we reconstruct what an agent did?", "Yes. Every input, retrieved source, draft, edit and approval is written to an append-only log, keyed by request, that your auditors can replay."],
  ["Can our security team review first?", "Yes. We share the architecture, data-flow diagrams and policy configuration before anything is deployed, and your team signs off on each change."],
];

const TAGS = [
  { t: "YOUR DATA", bg: "var(--c-accent)", c: "#FFFFFF", left: 5.6, top: -3 },
  { t: "YOUR BOUNDARY", bg: "var(--c-band)", c: "var(--c-band-text)", left: 5.6, top: 47.9 },
  { t: "EGRESS BLOCKED", bg: "#D9534F", c: "#FFFFFF", left: 76, top: 31.9 },
  { t: "NO THIRD-PARTY APIS", bg: "var(--c-band)", c: "var(--c-band-text)", left: 73.3, top: 82.8 },
];

export function Security() {
  const [open, setOpen] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/governance`);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <div className={s.secRow}>
        <div className={s.secLeft} style={{ borderRight: "1px solid var(--c-line)", display: "flex", flexDirection: "column", flexShrink: 0, gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ GOVERNANCE</div>
            <h2 data-split className={s.h2} style={{ color: "var(--c-text)" }}>Every output checked. Every action logged.</h2>
            <p data-reveal style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: "17px", lineHeight: "26px", maxWidth: "460px" }}>
              Policy runs before the draft, not after. If the policy layer is down, the agent does not run.
            </p>
          </div>
          <div data-reveal style={{ borderTop: "1px solid var(--c-text)", display: "flex", flexDirection: "column" }}>
            {FAQ.map(([q, a], i) => {
              const on = open === i;
              return (
                <div key={q} style={{ borderBottom: "1px solid var(--c-line)" }}>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className={s.faqBtn}>
                    <span style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "17px", lineHeight: "22px", textAlign: "left" }}>{q}</span>
                    <motion.span animate={{ rotate: on ? 180 : 0 }} style={{ color: on ? "var(--c-text)" : "var(--c-faint)", fontFamily: mono, fontSize: "14px", lineHeight: "18px", flexShrink: 0 }}>
                      {on ? "−" : "+"}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                        <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: "15px", lineHeight: "23px", maxWidth: "480px", marginTop: -10, paddingBottom: 18 }}>{a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div data-reveal className={s.btnRow}>
            <Link href="/governance" className="btn btn-primary" style={{ alignItems: "center", backgroundColor: "var(--c-text)", display: "flex", height: "36px", paddingInline: "16px", ["--btn-fill" as string]: "var(--c-accent)" }}>
              <span style={{ color: "var(--c-bg)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", whiteSpace: "nowrap" }}>
                READ GOVERNANCE DETAILS <span className="arrow">→</span>
              </span>
            </Link>
            <button type="button" onClick={copy} className="btn btn-ghost" style={{ alignItems: "center", background: "none", border: "1px solid var(--c-disabled)", display: "flex", height: "36px", paddingInline: "16px", cursor: "pointer" }}>
              <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", whiteSpace: "nowrap" }}>{copied ? "LINK COPIED ✓" : "COPY LINK FOR YOUR CISO"}</span>
            </button>
          </div>
        </div>
        <div
          className={s.secRight}
          style={{
            background: "linear-gradient(var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(90deg, var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px var(--c-bg-alt)",
            display: "flex",
            flexBasis: "0%",
            flexDirection: "column",
            flexGrow: 1,
            gap: "28px",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div className={s.secArt}>
            <Tilt max={6}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className={s.secImg} style={{ backgroundImage: "url(/assets/7Q516TW2VWG615ZM3NPTSM8T8A.png)" }} />
            </Tilt>
            {TAGS.map((t, i) => (
              <motion.div
                key={t.t}
                className={s.secTag}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 320, damping: 18 }}
                style={{ backgroundColor: t.bg, left: `${t.left}%`, top: `${t.top}%` }}
              >
                <span style={{ color: t.c, fontFamily: mono, fontSize: "10px", letterSpacing: "0.04em", lineHeight: "12px" }}>{t.t}</span>
              </motion.div>
            ))}
          </div>
          <div data-reveal style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", display: "flex", flexDirection: "column" }} data-reveal-stagger>
            {[
              { icon: <><rect x="3" y="3" width="18" height="18" {...sq} /><path d="M8 12h8" {...sq} /></>, stroke: "var(--c-accent)", l: "Your data", r: "STAYS IN BOUNDARY", c: "#3E8E66" },
              { icon: <path d="M5 5l14 14M19 5L5 19" {...sq} />, stroke: "#D9534F", l: "Egress to the internet", r: "BLOCKED", c: "#D9534F" },
              { icon: <path d="M4 7h16v12H4zM8 7V4h8v3" {...sq} />, stroke: "var(--c-muted)", l: "Third-party AI APIs", r: "NOT USED", c: "var(--c-muted)" },
            ].map((row, i) => (
              <div key={row.l} className="hover-row" style={{ alignItems: "center", borderBottom: i < 2 ? "1px solid var(--c-line)" : "none", display: "flex", gap: "12px", paddingBlock: "14px", paddingInline: "16px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" stroke={row.stroke} style={{ flexShrink: 0 }}>{row.icon}</svg>
                <div style={{ color: "var(--c-text)", flexBasis: "0%", flexGrow: 1, fontFamily: sans, fontSize: "15px", lineHeight: "18px" }}>{row.l}</div>
                <div style={{ color: row.c, fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{row.r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealScope>
  );
}

const STATS = [
  { k: "LOGISTICS", meta: "LOGISTICS · ON-PREM · 9 WEEKS", n: "52%", body: "less time triaging freight tickets at an 800-person carrier" },
  { k: "LEGAL", meta: "LEGAL · PRIVATE CLOUD · 8 WEEKS", n: "11×", body: "faster clause search across 2 million contracts" },
  { k: "INSURANCE", meta: "INSURANCE · ON-PREM · 10 WEEKS", n: "70%", body: "of claims documents filled in automatically, same team kept" },
];

export function Results() {
  const [f, setF] = useState("ALL");
  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <div className={s.head}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ RESULTS · SAMPLE DATA</div>
          <h2 data-split className={s.h2} style={{ color: "var(--c-text)", maxWidth: 560 }}>Shipped, measured, and used every day.</h2>
        </div>
        <div data-reveal role="tablist" style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["ALL", "LOGISTICS", "LEGAL", "INSURANCE"].map((k) => {
            const on = f === k;
            return (
              <button key={k} type="button" role="tab" aria-selected={on} onClick={() => setF(k)} className={s.chip} style={{ backgroundColor: on ? "var(--c-text)" : "transparent", border: on ? "1px solid var(--c-text)" : "1px solid var(--c-border)", color: on ? "var(--c-bg)" : "var(--c-text)" }}>
                {k}
              </button>
            );
          })}
        </div>
      </div>
      <div className={s.stats} style={{ borderTop: "1px solid var(--c-line)" }}>
        {STATS.map((st, i) => {
          const dim = f !== "ALL" && f !== st.k;
          return (
            <motion.div key={st.k} animate={{ opacity: dim ? 0.28 : 1 }} transition={{ duration: 0.35 }} className={s.stat} style={{ borderRight: i < 2 ? "1px solid var(--c-line)" : "none", backgroundColor: f === st.k ? "var(--c-bg-alt)" : "transparent", transition: "background-color .35s" }}>
              <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>{st.meta}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div data-count className={s.statNum} style={{ color: "var(--c-text)" }}>{st.n}</div>
                <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "17px", lineHeight: "25px" }}>{st.body}</div>
              </div>
              <Link href="/case-studies" className="link-underline" style={{ color: "var(--c-accent-text)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px", alignSelf: "flex-start", textDecoration: "none" }}>
                READ CASE →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </RevealScope>
  );
}
