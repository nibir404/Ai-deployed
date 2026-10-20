"use client";

import Link from "next/link";
import { RevealScope } from "@/components/motion/Reveal";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const head: React.CSSProperties = { color: "var(--c-faint)", fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", lineHeight: "14px" };
const item: React.CSSProperties = { color: "var(--c-text)", fontFamily: sans, fontSize: 14, lineHeight: "18px", width: "fit-content" };

const COLS = [
  { h: "PRODUCT", links: [["Platform", "/platform"], ["Governance", "/governance"], ["How it works", "/how-it-works"]] },
  { h: "COMPANY", links: [["About", "/about"], ["Case studies", "/case-studies"], ["Contact", "/contact"]] },
  { h: "SUPPORT", links: [["FAQ", "/faq"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export function Footer() {
  return (
    <RevealScope className="full" style={{ borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", backgroundColor: "var(--c-bg)" }}>
      <div className="footer-main" style={{ display: "flex", justifyContent: "space-between", paddingBlock: 56, paddingInline: 80, gap: 40 }}>
        <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 12, width: 300, maxWidth: "100%", flexShrink: 0 }}>
          <Link href="/" style={{ alignItems: "center", display: "flex", gap: 8 }}>
            <div style={{ backgroundColor: "var(--c-accent)", height: 12, width: 12 }} />
            <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: "22px" }}>AI Deployed</div>
          </Link>
          <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: 14, lineHeight: "21px" }}>Embedded AI and software, built and run for you.</div>
        </div>
        <div data-reveal-stagger className="footer-cols" style={{ display: "flex", gap: 80 }}>
          {COLS.map((c) => (
            <div key={c.h} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={head}>{c.h}</div>
              {c.links.map(([l, h]) => (
                <Link key={h} href={h} className="link-underline" style={item}>
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", paddingBlock: 20, paddingInline: 80 }}>
        <div style={head}>© 2026 AI DEPLOYED</div>
        <div style={head}>ALL SYSTEMS NORMAL · STATUS.AIDEPLOYED.IO</div>
      </div>
    </RevealScope>
  );
}
