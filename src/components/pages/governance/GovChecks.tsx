"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import st from "./Gov.module.css";

type Sev = "PASS" | "WARN" | "BLOCK";
const SEVS: Sev[] = ["PASS", "WARN", "BLOCK"];
export const SEV_COLOR: Record<Sev, { bg: string; fg: string }> = {
  PASS: { bg: "#3E8E66", fg: "#FFFFFF" },
  WARN: { bg: "#E8A23A", fg: "#111111" },
  BLOCK: { bg: "#D9534F", fg: "#FFFFFF" },
};

const ROWS: { name: string; desc: string; sev: Sev }[] = [
  { name: "Voice match", desc: "Output reads as your voice: tone, register, vocabulary.", sev: "WARN" },
  { name: "Claim verification", desc: "Any factual claim is checked against its linked source.", sev: "BLOCK" },
  { name: "Policy compliance", desc: "Per-agent read, write and trigger rules, enforced before generation.", sev: "BLOCK" },
  { name: "Confidentiality", desc: "Sensitive fields stripped before the model. PII never sent.", sev: "BLOCK" },
  { name: "Brand consistency", desc: "Approved terminology and prohibited language enforced.", sev: "PASS" },
];

const head: React.CSSProperties = { color: "var(--c-faint)", fontFamily: "var(--font-mono)", fontSize: "10px", lineHeight: "12px" };

export function GovChecks() {
  const [sev, setSev] = useState<Sev[]>(ROWS.map((r) => r.sev));

  return (
    <RevealScope className="col" style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <div className={st.head} style={{ alignItems: "end", display: "flex", justifyContent: "space-between", gap: "24px", paddingBottom: "56px", paddingInline: "56px", paddingTop: "120px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div data-reveal="" style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ WHAT GETS CHECKED</div>
          <h2 data-split="" className={st.h2} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "48px", letterSpacing: "-0.03em", lineHeight: "54px", maxWidth: "600px" }}>
            Checks run before the draft is queued.
          </h2>
        </div>
        <p data-reveal="" style={{ margin: 0, color: "var(--c-muted)", flexShrink: 0, fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: "26px", width: "380px", maxWidth: "100%" }}>
          Five checks, configurable per agent. Each returns pass, warn or block, and you decide what is a hard rule.
        </p>
      </div>
      <div className={st.tableHead} style={{ backgroundColor: "var(--c-bg-alt)", borderTop: "1px solid var(--c-line)", display: "flex", paddingBlock: "12px", paddingInline: "56px" }}>
        <div style={{ ...head, flexBasis: "0%", flexGrow: 1 }}>CHECK</div>
        <div style={{ ...head, flexShrink: 0, width: "460px" }}>WHAT IT DOES</div>
        <div style={{ ...head, flexShrink: 0, width: "240px" }}>SEVERITY · CUSTOMER REPLY</div>
      </div>
      <div data-reveal-stagger="" className={st.rows}>
        {ROWS.map((r, i) => (
          <div key={r.name} className={`hover-row ${st.row}`} style={{ alignItems: "center", borderTop: "1px solid var(--c-line)", display: "flex", paddingBlock: "20px", paddingInline: "56px" }}>
            <div style={{ color: "var(--c-text)", flexBasis: "0%", flexGrow: 1, minWidth: "200px", fontFamily: "var(--font-sans)", fontSize: "20px", lineHeight: "24px" }}>{r.name}</div>
            {/* paddingRight keeps long descriptions off the chips */}
            <div className={st.desc} style={{ color: "var(--c-muted)", flexShrink: 0, boxSizing: "border-box", paddingRight: "28px", fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: "18px", width: "460px", maxWidth: "100%" }}>{r.desc}</div>
            <div className={st.chips} role="radiogroup" aria-label={`${r.name} severity`} style={{ display: "flex", flexShrink: 0, width: "240px" }}>
              {SEVS.map((s) => {
                const on = sev[i] === s;
                return (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSev((p) => p.map((v, j) => (j === i ? s : v)))}
                    className={`sev-chip ${st.chip}`}
                    style={{ all: "unset", cursor: "pointer", position: "relative", boxSizing: "border-box", border: "1px solid var(--c-border)", marginLeft: s === "PASS" ? 0 : "-1px", paddingBlock: "5px", paddingInline: "10px" }}
                  >
                    {on && (
                      <motion.span
                        layoutId={`sev-${i}`}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        style={{ position: "absolute", inset: "-1px", background: SEV_COLOR[s].bg }}
                      />
                    )}
                    <span style={{ position: "relative", color: on ? SEV_COLOR[s].fg : "var(--c-faint)", fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: "14px", transition: "color .2s" }}>{s}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <style>{`.sev-chip[aria-checked="false"]:hover span:last-child{color:var(--c-text)!important}.sev-chip:focus-visible{outline:1px solid var(--c-accent);outline-offset:2px}`}</style>
    </RevealScope>
  );
}
