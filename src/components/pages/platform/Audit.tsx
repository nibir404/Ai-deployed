"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./platform.module.css";
import { CopyCol, Section, mono, sans } from "./ui";

type Actor = "agent" | "policy" | "user" | "system";
type Ev = { id: number; t: string; actor: Actor; action: string; ctx: string; hl?: boolean };

const ACTOR_COLOR: Record<Actor, string> = {
  agent: "var(--c-accent-text)",
  policy: "var(--p-amber)",
  user: "var(--p-green)",
  system: "var(--c-muted)",
};

const INITIAL: Ev[] = [
  { id: 1, t: "04:21:08", actor: "agent", action: "draft.created", ctx: "Customer reply · #8841" },
  { id: 2, t: "04:21:09", actor: "policy", action: "voice.check.pass", ctx: "—" },
  { id: 3, t: "04:21:09", actor: "policy", action: "claim.check.pass", ctx: "—" },
  { id: 4, t: "04:21:11", actor: "user", action: "draft.approved", ctx: "sara@", hl: true },
  { id: 5, t: "04:18:43", actor: "system", action: "send.completed", ctx: "via gmail.send" },
  { id: 6, t: "04:16:09", actor: "agent", action: "kb.search", ctx: "‘refund policy’" },
];

// Cycle of events streamed in at the top of the feed.
const POOL: Omit<Ev, "id" | "t">[] = [
  { actor: "agent", action: "kb.search", ctx: "‘shipping delay’" },
  { actor: "agent", action: "draft.created", ctx: "Customer reply · #8852" },
  { actor: "policy", action: "voice.check.pass", ctx: "—" },
  { actor: "policy", action: "claim.check.warn", ctx: "order status stale" },
  { actor: "user", action: "draft.edited", ctx: "sara@" },
  { actor: "user", action: "draft.approved", ctx: "sara@" },
  { actor: "system", action: "send.completed", ctx: "via gmail.send" },
  { actor: "system", action: "tickets.update", ctx: "#8852 → resolved" },
];

const fmt = (sec: number) => [Math.floor(sec / 3600), Math.floor(sec / 60) % 60, sec % 60].map((n) => String(n).padStart(2, "0")).join(":");

const cell = (w: number | undefined, color: string) => mono(12, 16, color, w ? { flexShrink: 0, width: `${w}px` } : { minWidth: 0 });
const head = (w?: number) => mono(10, 12, "var(--c-faint)", w ? { flexShrink: 0, width: `${w}px` } : {});

export function Audit() {
  const [rows, setRows] = useState(INITIAL);
  const [count, setCount] = useState(1284);
  const box = useRef<HTMLDivElement>(null);
  const clock = useRef(4 * 3600 + 21 * 60 + 11);
  const n = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) {
        timer = setInterval(() => {
          clock.current += 1 + Math.floor(Math.random() * 3);
          const p = POOL[n.current++ % POOL.length];
          const ev: Ev = { ...p, id: Date.now(), t: fmt(clock.current), hl: p.action === "draft.approved" };
          setRows((r) => [ev, ...r].slice(0, 6));
          setCount((c) => c + 1);
        }, 2200);
      } else if (!e.isIntersecting && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    });
    if (box.current) io.observe(box.current);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <Section id="audit" reverse>
      <div className={s.pane} style={{ backgroundColor: "var(--c-bg-alt)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box" }}>
        <div
          ref={box}
          data-reveal=""
          className={s.w640}
          style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}
        >
          <div style={{ alignItems: "center", borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", justifyContent: "space-between", gap: "12px", paddingBlock: "12px", paddingInline: "16px" }}>
            <div style={mono(11, 14, "var(--c-muted)")}>AIDEPLOYED / CHANGELOG · LAST 24H</div>
            <div style={{ alignItems: "center", boxSizing: "border-box", display: "flex", gap: "6px", flexShrink: 0 }}>
              <div className={s.pulse} style={{ backgroundColor: "var(--p-green)", flexShrink: 0, height: "6px", width: "6px" }} />
              <div style={mono(11, 14, "var(--p-green)")}>LIVE · {count.toLocaleString("en-US")} EVENTS</div>
            </div>
          </div>
          <div className={s.tableScroll} data-lenis-prevent="">
            <div className={s.tableInner}>
              <div style={{ backgroundColor: "var(--c-bg-alt)", borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", paddingBlock: "10px", paddingInline: "16px" }}>
                <div style={head(90)}>TIME</div>
                <div style={head(80)}>ACTOR</div>
                <div style={head(180)}>ACTION</div>
                <div style={head()}>CONTEXT</div>
              </div>
              <div style={{ overflow: "hidden", height: `${6 * 37 - 1}px` }}>
                <AnimatePresence initial={false}>
                  {rows.map((r, i) => (
                    <motion.div
                      key={r.id}
                      layout
                      className="hover-row"
                      initial={{ opacity: 0, y: -12, backgroundColor: "rgba(59,67,214,0.22)" }}
                      animate={{ opacity: 1, y: 0, backgroundColor: r.hl ? "rgba(59,67,214,0.10)" : "rgba(59,67,214,0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ borderBottom: i < 5 ? "1px solid var(--c-line)" : undefined, boxSizing: "border-box", display: "flex", paddingBlock: "10px", paddingInline: "16px" }}
                    >
                      <div style={cell(90, "var(--c-muted)")}>{r.t}</div>
                      <div style={cell(80, ACTOR_COLOR[r.actor])}>{r.actor}</div>
                      <div style={cell(180, "var(--c-text)")}>{r.action}</div>
                      <div style={cell(undefined, r.ctx === "—" ? "var(--c-faint)" : "var(--c-muted)")}>{r.ctx}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CopyCol
        eyebrow="04 / AUDIT"
        title="Every action logged. Reconstructable months later."
        body="Two synced logs capture every input, output and decision. Append-only and queryable. What the agent did, and why, is in the trail."
      >
        <div data-reveal-stagger="" style={{ borderTop: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
          {[
            ["Append-only", "NOTHING REWRITTEN"],
            ["Two synced logs", "INTERNAL + EXPORT"],
            ["Filterable", "AGENT · ACTOR · TIME"],
          ].map(([a, b]) => (
            <div key={a} className="hover-row" style={{ borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", justifyContent: "space-between", gap: "12px", paddingBlock: "12px" }}>
              <div style={sans(15, 18, "var(--c-text)")}>{a}</div>
              <div style={mono(11, 14, "var(--c-muted)")}>{b}</div>
            </div>
          ))}
        </div>
      </CopyCol>
    </Section>
  );
}
