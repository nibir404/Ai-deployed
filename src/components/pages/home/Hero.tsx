"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import s from "./Home.module.css";

const IsoScene = dynamic(() => import("@/components/hero-iso/IsoScene"), { ssr: false, loading: () => <HeroPng /> });

function HeroPng() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1278 / 700" }}>
      <div
        role="img"
        aria-label="Isometric diagram of the AI Deployed stack"
        style={{
          position: "absolute",
          left: `${(150 / 1278) * 100}%`,
          top: `${(30 / 700) * 100}%`,
          width: `${(980 / 1278) * 100}%`,
          height: `${(617 / 700) * 100}%`,
          backgroundImage: "url(/assets/3ZM8TTHEWYG6A6EJJXY21RCTCW.png)",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );
}

/** Animated WebGL scene; static PNG for reduced motion or when WebGL is unavailable. */
function HeroArt() {
  const [mode, setMode] = useState<"png" | "gl" | null>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    setMode(reduced || !gl ? "png" : "gl");
  }, []);
  return mode === "gl" ? <IsoScene /> : <HeroPng />;
}

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

type Callout = { label: string; side: "l" | "r"; top: number; primary?: boolean; icon: React.ReactNode; tip: string };

const stroke = (c: string) => ({ fill: "none", stroke: c, strokeWidth: 1.8, strokeLinecap: "square" as const });

function icons(c: string) {
  return {
    sandbox: (
      <>
        <rect x="3" y="3" width="18" height="18" {...stroke(c)} />
        <path d="M3 9h18M9 21V9" {...stroke(c)} />
      </>
    ),
    runtime: (
      <>
        <rect x="5" y="5" width="14" height="14" {...stroke(c)} />
        <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" {...stroke(c)} />
      </>
    ),
    shield: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" {...stroke(c)} />,
    server: (
      <>
        <rect x="3" y="4" width="18" height="6" {...stroke(c)} />
        <rect x="3" y="14" width="18" height="6" {...stroke(c)} />
        <path d="M7 7h1M7 17h1" {...stroke(c)} />
      </>
    ),
    gateway: <path d="M4 12h6M14 12h6M10 8v8M14 8v8" {...stroke(c)} />,
    infra: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" {...stroke(c)} />,
  };
}

const ic = icons("var(--c-text)");
const icw = icons("#FFFFFF");

const CALLOUTS: Callout[] = [
  { label: "MICROVM SANDBOX", side: "l", top: 163, icon: ic.sandbox, tip: "Each agent runs in an isolated microVM." },
  { label: "SOVEREIGN AGENT RUNTIME", side: "l", top: 419, primary: true, icon: icw.runtime, tip: "Our runtime, deployed inside your perimeter." },
  { label: "ZERO-TRUST NETWORK", side: "l", top: 511, icon: ic.shield, tip: "Every call authenticated, every egress checked." },
  { label: "PRIVATE INFERENCE", side: "r", top: 129, icon: ic.server, tip: "Models served on your hardware or VPC." },
  { label: "TOOL GATEWAY · MCP", side: "r", top: 302, icon: ic.gateway, tip: "Scoped tool access, logged per call." },
  { label: "YOUR INFRASTRUCTURE", side: "r", top: 523, icon: ic.infra, tip: "Cloud, on-prem or air-gapped." },
];

const LEGEND = [
  ["#C7E04A", "ALLOWED"],
  ["#D9534F", "BLOCKED"],
  ["#E8A23A", "CHECKED"],
  ["var(--c-accent)", "AI DEPLOYED STACK"],
];

export function Hero() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px", paddingTop: "120px" }}>
      <div className={s.heroTop}>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div data-reveal style={{ alignItems: "center", display: "flex", gap: "10px" }}>
            <motion.div animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
            <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px" }}>AI DEPLOYED · EMBEDDED</div>
          </div>
          <h1 data-split className={s.h1} style={{ color: "var(--c-text)" }}>
            Embed with your team. Architect, build, run.
          </h1>
        </div>
        <div data-reveal data-delay="0.2" style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: "28px", paddingBottom: "8px", width: "360px" }}>
          <p style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: "17px", lineHeight: "26px", width: "380px", maxWidth: "100%" }}>
            AI and software systems, in your environment, under your governance. Senior engineers embed with your team and run what they build.
          </p>
          <div className={s.btnRow}>
            <Magnetic>
              <Link href="/contact" className="btn" style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", height: "36px", paddingInline: "16px", ["--btn-fill" as string]: "var(--c-text)" }}>
                <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", whiteSpace: "nowrap" }}>
                  START A CONVERSATION <span className="arrow">→</span>
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/how-it-works" className="btn btn-ghost" style={{ alignItems: "center", border: "1px solid var(--c-disabled)", display: "flex", height: "36px", paddingInline: "16px" }}>
                <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", whiteSpace: "nowrap" }}>SEE HOW IT WORKS</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div style={{ borderBottom: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column" }}>
        <div
          data-reveal="clip"
          className={s.heroStage}
          style={{
            background:
              "linear-gradient(var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px, linear-gradient(90deg, var(--c-line) 1px, transparent 1px) 0% 0% / 40px 40px var(--c-bg-alt)",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* heroArt: art container (1278×700). Contents may be swapped for <IsoScene/>. */}
          <div className={s.heroArt}>
            <HeroArt />
          </div>
        </div>
        <div className={s.heroCaption} style={{ alignItems: "center", borderTop: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", paddingBlock: "14px", paddingInline: "20px", gap: 12 }}>
          <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>
            FIG. 01 — THE DEPLOYMENT STACK. EVERY LAYER RUNS IN YOUR ENVIRONMENT. HOVER A LAYER TO INSPECT.
          </div>
          <div className="r-wrap" style={{ display: "flex", gap: "20px" }}>
            {LEGEND.map(([c, l]) => (
              <div key={l} style={{ alignItems: "center", display: "flex", gap: "6px" }}>
                <div style={{ backgroundColor: c, flexShrink: 0, height: "8px", width: "8px" }} />
                <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealScope>
  );
}

export function Sectors() {
  return (
    <RevealScope className={`col ${s.sectors}`} style={{ alignItems: "center", borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", paddingBlock: "28px", paddingInline: "56px", gap: 16 }}>
      <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>/ BUILT FOR REGULATED TEAMS IN</div>
      <div className={s.sectorList} data-reveal-stagger style={{ display: "flex", gap: "56px" }}>
        {["Logistics", "Insurance", "Legal", "Finance", "Manufacturing"].map((s) => (
          <div key={s} className="home-sector" style={{ color: "var(--c-faint)", fontFamily: sans, fontSize: "20px", letterSpacing: "-0.02em", lineHeight: "24px" }}>
            {s}
          </div>
        ))}
      </div>
    </RevealScope>
  );
}
