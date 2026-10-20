"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import s from "./Gov.module.css";

function PyramidPng() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/assets/5GXWK3A963HBCHG5ZEKNP2Q4G1.png" alt="" style={{ display: "block", width: "100%", height: "auto", aspectRatio: "600 / 400" }} />;
}
const PyramidScene = dynamic(() => import("@/components/iso-scenes/PyramidScene"), { ssr: false, loading: () => <PyramidPng /> });

export const gridBg =
  "linear-gradient(var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(90deg, var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px var(--c-bg-alt)";

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px" };

export function GovHero() {
  const [copied, setCopied] = useState(false);
  const [hover, setHover] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <RevealScope className={`col ${s.split}`} style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", minHeight: "611px" }}>
      <div className={s.side} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "28px", justifyContent: "center", paddingBlock: "96px", paddingInline: "56px", width: "560px" }}>
        <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          <div style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
          <div style={{ ...mono, color: "var(--c-muted)" }}>GOVERNANCE</div>
        </div>
        <h1 data-split="" className={s.h1} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "64px", letterSpacing: "-0.035em", lineHeight: "68px" }}>
          Every output checked. Every action logged.
        </h1>
        <p data-reveal="" data-delay="0.2" style={{ margin: 0, color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: "26px" }}>
          The governance layer behind every agent we run: what gets checked, how it fails closed, and where the audit trail lives.
        </p>
        <div data-reveal="" data-delay="0.3" className={s.btns} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <Magnetic>
            <Link href="/contact" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "var(--c-accent)", height: "36px", paddingInline: "16px", ...mono }}>
              <span style={{ color: "#FFFFFF" }}>REQUEST SECURITY REVIEW</span> <span className="arrow" style={{ color: "#FFFFFF" }}>→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <button onClick={copy} className="btn btn-ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "transparent", border: "1px solid var(--c-disabled)", height: "36px", paddingInline: "16px", ...mono, minWidth: "170px" }}>
              <span style={{ color: "var(--c-text)" }}>{copied ? "LINK COPIED ✓" : "COPY LINK FOR CISO"}</span>
            </button>
          </Magnetic>
        </div>
      </div>
      <div className={s.media} style={{ alignItems: "center", background: gridBg, boxSizing: "border-box", display: "flex", flexBasis: "0%", flexGrow: 1, justifyContent: "center", minWidth: 0, overflow: "clip", padding: "40px" }}>
        <div data-reveal="scale" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className={s.illusLive} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} role="img" aria-label="Isometric stack of five policy layers with a locked approval cube on top; a blocked bot below">
            <PyramidScene explode={hover} fallback={<PyramidPng />} />
          </div>
        </div>
      </div>
    </RevealScope>
  );
}
