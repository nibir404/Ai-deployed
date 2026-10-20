"use client";

import { useState } from "react";
import { RevealScope } from "@/components/motion/Reveal";
import st from "./Gov.module.css";

const RED = "#D9534F";
const GREEN = "#3E8E66";
const label: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: "14px", whiteSpace: "nowrap" };
const box: React.CSSProperties = { alignItems: "center", display: "flex", height: "48px", paddingInline: "16px", boxSizing: "border-box", flexShrink: 0, transition: "opacity .35s, background-color .35s, border-color .35s, box-shadow .35s" };
const plain: React.CSSProperties = { ...box, backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)" };

/** 40px connector; `flow` sends packets along it, delay staggers them per hop. */
function Wire({ flow, dashed, color = "var(--c-text)", delay = 0 }: { flow: boolean; dashed?: boolean; color?: string; delay?: number }) {
  return (
    <div data-wire="" data-dashed={dashed ? "" : undefined} style={{ position: "relative", width: "40px", flexShrink: 0, ...(dashed ? { borderTop: `1px dashed ${color}`, height: 0 } : { height: "1px", backgroundColor: color }) }}>
      {flow && <span className="gov-packet" style={{ animationDelay: `${delay}s`, background: color }} />}
    </div>
  );
}

export function GovFailsClosed() {
  const [up, setUp] = useState(true);

  return (
    <RevealScope className={`col ${st.split}`} style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", minHeight: "456px" }}>
      <div className={st.side} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "24px", paddingBlock: "96px", paddingInline: "56px", width: "520px" }}>
        <div data-reveal="" style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ FAILS CLOSED</div>
        <h2 data-split="" className={st.h3} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "36px", letterSpacing: "-0.025em", lineHeight: "42px" }}>
          If the policy layer is unavailable, the agent does not run.
        </h2>
        <p data-reveal="" style={{ margin: 0, color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: "25px" }}>
          Network failure, outage or schema error: every agent fails closed. A missed draft is recoverable. A draft that bypassed policy is not.
        </p>
      </div>
      <div className={st.flowPane} style={{ position: "relative", backgroundColor: "var(--c-bg-alt)", boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "16px", justifyContent: "center", padding: "56px" }}>
        <button
          role="switch"
          aria-checked={up}
          onClick={() => setUp((v) => !v)}
          className={`gov-toggle ${st.toggle}`}
          style={{ all: "unset", cursor: "pointer", position: "absolute", top: "24px", right: "24px", display: "flex", alignItems: "center", gap: "10px", ...label, color: "var(--c-muted)" }}
        >
          POLICY LAYER:
          <span style={{ position: "relative", display: "inline-flex", border: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
            <span style={{ position: "absolute", top: "-1px", bottom: "-1px", left: up ? "-1px" : "50%", width: "50%", background: up ? GREEN : RED, transition: "left .35s cubic-bezier(.22,1,.36,1), background .35s" }} />
            <span style={{ position: "relative", width: "48px", textAlign: "center", paddingBlock: "5px", color: up ? "#fff" : "var(--c-faint)", transition: "color .3s" }}>UP</span>
            <span style={{ position: "relative", width: "48px", textAlign: "center", paddingBlock: "5px", color: !up ? "#fff" : "var(--c-faint)", transition: "color .3s" }}>DOWN</span>
          </span>
        </button>

        <div data-reveal="left"><div className={st.flowRow} style={{ alignItems: "center", display: "flex", opacity: up ? 1 : 0.35, transition: "opacity .4s" }}>
          <div style={plain}><span style={{ ...label, color: "var(--c-text)" }}>REQUEST</span></div>
          <Wire flow={up} delay={0} />
          <div style={{ ...box, backgroundColor: up ? GREEN : "var(--c-surface)", border: up ? "1px solid transparent" : "1px solid var(--c-border)" }}>
            <span style={{ ...label, color: up ? "#FFFFFF" : "var(--c-faint)" }}>POLICY LAYER · UP</span>
          </div>
          <Wire flow={up} delay={0.45} />
          <div style={plain}><span style={{ ...label, color: "var(--c-text)" }}>DRAFT</span></div>
          <Wire flow={up} delay={0.9} />
          <div style={{ ...box, backgroundColor: "var(--c-accent)", boxShadow: up ? "0 0 0 4px color-mix(in srgb, var(--c-accent) 20%, transparent)" : "none" }}>
            <span style={{ ...label, color: "#FFFFFF" }}>QUEUE</span>
          </div>
        </div></div>

        <div data-reveal="left" data-delay="0.1"><div className={st.flowRow} style={{ alignItems: "center", display: "flex", opacity: up ? 0.45 : 1, transition: "opacity .4s" }}>
          <div style={plain}><span style={{ ...label, color: "var(--c-text)" }}>REQUEST</span></div>
          <Wire flow={!up} delay={0} />
          <div className={!up ? "gov-alarm" : undefined} style={{ ...box, backgroundColor: RED, boxShadow: !up ? `0 0 0 4px ${RED}33` : "none" }}>
            <span style={{ ...label, color: "#FFFFFF" }}>POLICY LAYER · DOWN</span>
          </div>
          <Wire flow={false} dashed color={RED} />
          <div style={{ ...box, border: `1px dashed ${RED}`, backgroundColor: !up ? `${RED}14` : "transparent" }}>
            <span style={{ ...label, color: RED }}>✕ NO DRAFT · NO ACTION</span>
          </div>
        </div></div>

        <style>{`
          .gov-packet{position:absolute;top:-2px;left:0;width:5px;height:5px;animation:gov-move 1.35s linear infinite;opacity:0}
          @keyframes gov-move{0%{transform:translateX(0);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(35px);opacity:0}}
          .gov-alarm{animation:gov-pulse 1.4s ease-in-out infinite}
          @keyframes gov-pulse{50%{box-shadow:0 0 0 8px #D9534F22}}
          .gov-toggle:focus-visible{outline:1px solid var(--c-accent);outline-offset:4px}
          @media (prefers-reduced-motion: reduce){.gov-packet,.gov-alarm{animation:none}}
        `}</style>
      </div>
    </RevealScope>
  );
}
