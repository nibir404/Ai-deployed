"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import s from "./CaseStudies.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const BEFORE = [
  ["6.2h", "AVG. TRIAGE TIME"],
  ["31%", "MISROUTED TICKETS"],
  ["Manual", "EVERY REPLY TYPED"],
];
const AFTER = [
  ["3.0h", "AVG. TRIAGE TIME"],
  ["7%", "MISROUTED TICKETS"],
  ["Approve", "DRAFT READY, HUMAN SENDS"],
];

function Stat({ v, l, after }: { v: string; l: string; after?: boolean }) {
  return (
    <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
      <div className={s.baStat} style={{ color: after ? "#FFFFFF" : "var(--c-text)", fontFamily: sans, fontSize: "36px", lineHeight: "44px" }}>{v}</div>
      <div style={{ color: after ? "#C9CCF5" : "var(--c-muted)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>{l}</div>
    </div>
  );
}

/** Before/after compare: the chartreuse handle drags (pointer + keyboard) to reveal before vs after. */
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    let next = pos;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = pos - step;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = pos + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    else return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  const ease = dragging ? "none" : "left 0.5s cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      className={`ba-panel ${s.baPanel}`}
      style={{ backgroundColor: "var(--c-bg-alt)", boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: "1", gap: "12px", justifyContent: "center", minWidth: 0 }}
    >
      <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "space-between" }}>
        <button type="button" onClick={() => setPos(100)} style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", cursor: "pointer" }}>
          ← BEFORE
        </button>
        <div style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>DRAG TO COMPARE</div>
        <button type="button" onClick={() => setPos(0)} style={{ color: "var(--c-accent-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", cursor: "pointer" }}>
          AFTER →
        </button>
      </div>
      <div
        ref={boxRef}
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setDragging(true);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging && setFromX(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        style={{ borderColor: "var(--c-text)", borderStyle: "solid", borderWidth: "1px", boxSizing: "border-box", display: "flex", position: "relative", overflow: "hidden", cursor: dragging ? "grabbing" : "ew-resize", touchAction: "pan-y", userSelect: "none" }}
      >
        <div style={{ backgroundColor: "var(--c-surface)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexGrow: "1", gap: "20px", padding: "24px" }}>
          {BEFORE.map(([v, l]) => (
            <Stat key={l} v={v} l={l} />
          ))}
        </div>
        <div
          style={{ backgroundColor: "var(--c-accent)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "20px", padding: "24px", position: "absolute", top: 0, bottom: 0, right: 0, left: `${pos}%`, overflow: "hidden", transition: ease }}
        >
          {AFTER.map(([v, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -14% 0px" }} transition={{ delay: 0.2 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Stat v={v} l={l} after />
            </motion.div>
          ))}
        </div>
        <div style={{ backgroundColor: "#D6F25C", bottom: "0px", left: `calc(${pos}% - 1px)`, position: "absolute", top: "0px", width: "2px", transition: ease, pointerEvents: "none" }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% after shown`}
          onKeyDown={onKey}
          className="ba-handle"
          style={{ alignItems: "center", backgroundColor: "#D6F25C", boxSizing: "border-box", display: "flex", height: "32px", justifyContent: "center", left: `calc(${pos}% - 15px)`, position: "absolute", top: "calc(50% - 16px)", width: "32px", transition: dragging ? "transform 0.2s" : `${ease}, transform 0.2s`, transform: dragging ? "scale(1.15)" : "scale(1)", cursor: "grab", outlineOffset: 3 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: "0" }}>
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="#111111" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
