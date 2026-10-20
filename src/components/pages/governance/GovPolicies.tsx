"use client";

import { RevealScope } from "@/components/motion/Reveal";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { PolicyMode } from "@/components/iso-scenes/PoliciesScene";
import { gridBg } from "./GovHero";
import st from "./Gov.module.css";

const LIST: [string, string, PolicyMode][] = [
  ["Roll back in one click", "VERSIONED", "rollback"],
  ["Diff any version", "REVIEWABLE", "diff"],
  ["Export for compliance review", "EXPORTABLE", "export"],
];

function PoliciesPng() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/assets/5NTBHK1TFP6ZA6VTMV130MXBXC.png" alt="" style={{ display: "block", width: "100%", height: "auto", aspectRatio: "640 / 373" }} />;
}
const PoliciesScene = dynamic(() => import("@/components/iso-scenes/PoliciesScene"), { ssr: false, loading: () => <PoliciesPng /> });

export function GovPolicies() {
  const [mode, setMode] = useState<PolicyMode>(null);
  return (
    <RevealScope className={`col ${st.split} ${st.splitRev}`} style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", minHeight: "610px" }}>
      <div className={st.media} style={{ alignItems: "center", background: gridBg, borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexBasis: "0%", flexGrow: 1, justifyContent: "center", minWidth: 0, overflow: "clip", padding: "40px" }}>
        <div data-reveal="scale" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className={st.illusLive2} role="img" aria-label="Versioned policy blocks chained on an audit platform">
            <PoliciesScene mode={mode} fallback={<PoliciesPng />} />
          </div>
        </div>
      </div>
      <div className={st.side} style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "24px", paddingBlock: "96px", paddingInline: "56px", width: "520px" }}>
        <div data-reveal="" style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ POLICIES + AUDIT TRAIL</div>
        <h2 data-split="" className={st.h3} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "36px", letterSpacing: "-0.025em", lineHeight: "42px" }}>
          Policies are data, not code. The trail is append-only.
        </h2>
        <p data-reveal="" style={{ margin: 0, color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: "25px" }}>
          Every rule is versioned, scoped and reversible. Two synced logs record every input, output and decision with timestamp, actor and context.
        </p>
        <div data-reveal-stagger="" style={{ borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column" }}>
          {LIST.map(([a, b, m]) => (
            <div
              key={a}
              tabIndex={0}
              onMouseEnter={() => setMode(m)}
              onMouseLeave={() => setMode(null)}
              onFocus={() => setMode(m)}
              onBlur={() => setMode(null)}
              className={`hover-row gov-li ${st.listRow}`} style={{ borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", gap: "16px", paddingBlock: "12px", cursor: "default", backgroundColor: mode === m ? "var(--c-bg-alt)" : undefined }}
            >
              <div style={{ color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: "18px" }}>{a}</div>
              <div style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: "14px" }}>{b}</div>
            </div>
          ))}
        </div>
        <style>{`.gov-li{transition:padding .3s cubic-bezier(.22,1,.36,1),background-color .3s}.gov-li>*{transition:color .25s}@media (hover:hover){.gov-li:hover{padding-inline:8px}.gov-li:hover>:last-child{color:var(--c-accent-text)!important}}`}</style>
      </div>
    </RevealScope>
  );
}

export function GovNotBand() {
  return (
    <RevealScope className={`col ${st.band}`} style={{ backgroundColor: "var(--c-band)", borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px" }}>
      <div style={{ borderRight: "1px solid var(--c-band-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "20px", paddingBlock: "72px", paddingInline: "56px", width: "520px" }}>
        <div data-reveal="" style={{ color: "var(--c-faint)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ WHAT THIS IS NOT</div>
        <h2 data-split="" className={st.h3} style={{ margin: 0, fontWeight: 400, color: "var(--c-band-text)", fontFamily: "var(--font-sans)", fontSize: "36px", letterSpacing: "-0.025em", lineHeight: "42px" }}>
          Not a substitute for human approval.
        </h2>
      </div>
      <div data-reveal-stagger="" style={{ boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "16px", justifyContent: "center", paddingBlock: "72px", paddingInline: "56px" }}>
        <p style={{ margin: 0, color: "#C9C9C3", fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: "27px" }}>
          Not consumer content moderation. Not a marketing safety net. It does not catch every edge case, and it does not replace the judgment of your team.
        </p>
        <p style={{ margin: 0, color: "var(--c-band-text)", fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: "27px" }}>
          Every output is a draft until a human approves it. That is the contract.
        </p>
      </div>
    </RevealScope>
  );
}
