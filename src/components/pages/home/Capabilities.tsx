"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import s from "./Home.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const sq = { fill: "none", strokeWidth: 1.8, strokeLinecap: "square" as const };

const TABS = [
  {
    title: "Approve",
    body: "Drafts land in a queue first. The agent never sends, writes or triggers directly. Your team reviews, edits and approves.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" {...sq} />
        <path d="M7.5 12.5l3 3 6-7" {...sq} />
      </>
    ),
  },
  {
    title: "Govern · rules before generation",
    body: "Policies, scopes and data boundaries are checked before the model runs. Out-of-policy requests never reach generation.",
    icon: (
      <>
        <rect x="6" y="6" width="12" height="12" {...sq} />
        <rect x="10" y="10" width="4" height="4" {...sq} />
        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" {...sq} />
      </>
    ),
  },
  {
    title: "Audit · every action logged",
    body: "Inputs, sources, drafts, edits and approvals are written to an immutable log your auditors can query.",
    icon: (
      <>
        <path d="M5 3h10l4 4v14H5z" {...sq} />
        <path d="M9 11h6M9 15h6M9 7h2" {...sq} />
      </>
    ),
  },
  {
    title: "Measure · approval and edit rate",
    body: "Every agent reports approval rate, edit distance and time saved, so you know when it has earned more autonomy.",
    icon: (
      <>
        <path d="M3 21h18" {...sq} />
        <path d="M6 17v-5M11 17V7M16 17v-8M21 17V4" {...sq} />
      </>
    ),
  },
];

const DRAFTS = [
  { meta: "TICKET #4821 · DELAYED SHIPMENT · ROTTERDAM", text: "Route to Ops-EU, priority high. Draft reply: “Your container cleared customs at 09:40. New ETA is Thursday.”", conf: "0.94", src: "SAP TM, OUTLOOK" },
  { meta: "CLAIM #7730 · WATER DAMAGE · HAMBURG", text: "Flag for adjuster review. Draft reply: “We have received your photos. An adjuster will call you within 24 hours.”", conf: "0.88", src: "GUIDEWIRE, SHAREPOINT" },
  { meta: "INVOICE #1192 · PRICE MISMATCH · LYON", text: "Hold payment, notify AP. Draft note: “Line 3 is billed at €42.10; PO agreed €38.00. Requesting credit note.”", conf: "0.91", src: "SAP FI, EMAIL" },
];

type Status = "waiting" | "approved" | "rejected";
const DURATION = 6000;

export function Capabilities() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>("waiting");
  const [editing, setEditing] = useState(false);
  const [texts, setTexts] = useState(DRAFTS.map((d) => d.text));
  const [done, setDone] = useState(0);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setTab((v) => (v + 1) % TABS.length), DURATION);
    return () => clearTimeout(t);
  }, [tab, paused]);

  useEffect(() => {
    if (editing) taRef.current?.focus();
  }, [editing]);

  const resolve = (s: Status) => {
    setEditing(false);
    setStatus(s);
    setDone((d) => d + 1);
    setTimeout(() => {
      setIdx((i) => (i + 1) % DRAFTS.length);
      setStatus("waiting");
    }, 1400);
  };

  const waiting = Math.max(0, 3 - (done % 3)) || 3;
  const d = DRAFTS[idx];

  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <div className={s.head} style={{ alignItems: "center", flexDirection: "column", gap: "20px", paddingBottom: "88px" }}>
        <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ THE PLATFORM</div>
        <h2 data-split className={s.h2} style={{ color: "var(--c-text)", textAlign: "center", maxWidth: "640px" }}>
          Each agent scoped to one job. Governed by your rules.
        </h2>
        <p data-reveal data-delay="0.15" style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: "17px", lineHeight: "26px", textAlign: "center", maxWidth: "480px" }}>
          One platform for building, running and governing AI agents in production. Your team reviews what matters.
        </p>
      </div>
      <div className={s.capRow} style={{ borderTop: "1px solid var(--c-line)", display: "flex" }}>
        <div data-reveal="left" className={s.capTabs} style={{ borderRight: "1px solid var(--c-line)", display: "flex", flexDirection: "column", flexShrink: 0 }} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          {TABS.map((t, i) => {
            const on = i === tab;
            const c = on ? "var(--c-accent-text)" : "var(--c-muted)";
            return (
              <button
                key={t.title}
                type="button"
                onClick={() => setTab(i)}
                aria-expanded={on}
                className={`hover-row ${s.capTab}`}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  backgroundColor: on ? "var(--h-panel)" : "transparent",
                  borderBottom: i < TABS.length - 1 ? "1px solid var(--c-line)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: on ? "10px" : 0,
                  paddingBlock: on ? "32px" : "30px",
                  paddingInline: "40px",
                  transition: "background-color .3s, padding .3s",
                }}
              >
                <div style={{ alignItems: "center", display: "flex", gap: "14px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" stroke={on ? "var(--c-accent)" : "var(--c-muted)"} style={{ flexShrink: 0, transition: "stroke .3s" }}>
                    {t.icon}
                  </svg>
                  <span style={{ color: on ? "var(--c-text)" : c, fontFamily: sans, fontSize: "20px", letterSpacing: "-0.01em", lineHeight: "24px", transition: "color .3s" }}>{on ? t.title.split(" · ")[0] : t.title}</span>
                </div>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="b" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                      <div className={s.capTabBody} style={{ paddingLeft: "34px", color: "var(--c-muted)", fontFamily: sans, fontSize: "15px", lineHeight: "23px" }}>{t.body}</div>
                      <div className={s.capTabBody} style={{ display: "flex", gap: "8px", paddingLeft: "34px", paddingTop: "18px" }}>
                        <div style={{ position: "relative", flexGrow: 1, height: 2, backgroundColor: "var(--c-border)" }}>
                          <motion.div
                            key={`${tab}-${paused}`}
                            initial={{ width: paused ? 120 : 0 }}
                            animate={{ width: paused ? 120 : "100%" }}
                            transition={{ duration: paused ? 0.3 : DURATION / 1000, ease: "linear" }}
                            style={{ position: "absolute", left: 0, top: 0, height: 2, backgroundColor: "var(--c-accent)" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <div data-reveal="right" className={s.capQueue} style={{ alignItems: "center", background: "radial-gradient(var(--h-dot) 1px, transparent 1px) 0% 0% / 16px 16px var(--h-panel)", display: "flex", flexBasis: "0%", flexGrow: 1, justifyContent: "center", padding: "48px" }}>
          <div style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", display: "flex", flexDirection: "column", width: "100%", maxWidth: "460px" }}>
            <div style={{ borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", paddingBlock: "14px", paddingInline: "18px" }}>
              <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.04em", lineHeight: "14px" }}>APPROVAL QUEUE · {status === "waiting" ? waiting : Math.max(waiting - 1, 0)} WAITING</div>
              <div style={{ alignItems: "center", display: "flex", gap: "6px" }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ backgroundColor: "#3E8E66", height: "6px", width: "6px" }} />
                <div style={{ color: "#3E8E66", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>LIVE</div>
              </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={idx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: status === "rejected" ? -40 : 40 }} transition={{ duration: 0.35 }} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "18px" }}>
                  <div style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{d.meta}</div>
                  {editing ? (
                    <textarea
                      ref={taRef}
                      value={texts[idx]}
                      onChange={(e) => setTexts((ts) => ts.map((t, i) => (i === idx ? e.target.value : t)))}
                      rows={3}
                      style={{ resize: "none", background: "var(--c-bg)", border: "1px solid var(--c-accent)", outline: "none", padding: 8, color: "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "23px" }}
                    />
                  ) : (
                    <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "23px", opacity: status === "rejected" ? 0.45 : 1, textDecoration: status === "rejected" ? "line-through" : "none", transition: "opacity .3s" }}>{texts[idx]}</div>
                  )}
                  <div style={{ display: "flex", gap: "16px", paddingTop: "4px", flexWrap: "wrap" }}>
                    <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>CONFIDENCE {d.conf}</div>
                    <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>SOURCE: {d.src}</div>
                    {texts[idx] !== d.text && <div style={{ color: "#E8A23A", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>EDITED</div>}
                  </div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                {status !== "waiting" && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", right: 18, top: 14, padding: "4px 8px", fontFamily: mono, fontSize: 11, letterSpacing: "0.04em", color: "#FFFFFF", background: status === "approved" ? "#3E8E66" : "#D9534F" }}>
                    {status === "approved" ? "✓ APPROVED · SENT" : "✕ REJECTED · LOGGED"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div style={{ borderTop: "1px solid var(--c-line)", display: "flex", gap: "8px", paddingBlock: "14px", paddingInline: "18px" }}>
              <QBtn primary disabled={status !== "waiting"} onClick={() => resolve("approved")}>APPROVE</QBtn>
              <QBtn disabled={status !== "waiting"} onClick={() => setEditing((e) => !e)}>{editing ? "DONE" : "EDIT"}</QBtn>
              <QBtn disabled={status !== "waiting"} onClick={() => resolve("rejected")}>REJECT</QBtn>
            </div>
          </div>
        </div>
      </div>
    </RevealScope>
  );
}

function QBtn({ children, primary, disabled, onClick }: { children: React.ReactNode; primary?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${primary ? "btn" : "btn btn-ghost"} ${s.qBtn}`}
      style={{
        all: "unset",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        backgroundColor: primary ? "var(--c-accent)" : "transparent",
        border: primary ? "none" : "1px solid var(--c-disabled)",
        paddingBlock: "9px",
        paddingInline: "14px",
        ["--btn-fill" as string]: primary ? "var(--c-text)" : "var(--c-text)",
      }}
    >
      <span style={{ color: primary ? "#FFFFFF" : "var(--c-text)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.04em", lineHeight: "14px" }}>{children}</span>
    </button>
  );
}
