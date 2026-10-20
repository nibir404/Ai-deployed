"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealScope } from "@/components/motion/Reveal";
import s from "./platform.module.css";
import { mono, sans, sectionBase } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BARS: [number, string][] = [
  [40, "var(--p-bar-green)"],
  [55, "var(--p-bar-green)"],
  [48, "var(--p-bar-green)"],
  [70, "var(--p-bar-green)"],
  [62, "var(--p-bar-green)"],
  [30, "#E8A23A"],
  [76, "var(--p-bar-green)"],
  [84, "var(--p-bar-green)"],
  [72, "var(--p-bar-green)"],
  [90, "var(--p-bar-accent)"],
];

function Head({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <>
      <div data-reveal="" style={mono(11, 14, "var(--c-accent-text)", { letterSpacing: "0.06em" })}>
        {eyebrow}
      </div>
      <h3 data-split="" style={sans(26, 32, "var(--c-text)", { letterSpacing: "-0.02em", margin: 0, fontWeight: "inherit" })}>
        {title}
      </h3>
      <div data-reveal="" data-delay="0.1" style={sans(15, 23, "var(--c-muted)")}>
        {body}
      </div>
    </>
  );
}

export function Triple() {
  const bars = useRef<HTMLDivElement>(null);
  const sq = useRef<SVGRectElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(bars.current!.children, {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: { trigger: bars.current, start: "top 86%", once: true },
    });
    gsap.from(sq.current, { scale: 0, transformOrigin: "center", duration: 0.4, delay: 1.4, ease: "back.out(3)", scrollTrigger: { trigger: sq.current, start: "top 86%", once: true } });
  });

  return (
    <div className="col">
      <RevealScope className={s.row} style={sectionBase}>
        <div id="integrate" className={`${s.triCol} ${s.section}`} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box" }}>
          <Head eyebrow="05 / INTEGRATE" title="Connected to where the work already happens." body="We do the wiring: OAuth, scopes, rate limits, retries. The audit log captures every call." />
          <div data-reveal-stagger="" style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            {[
              ["EMAIL", "GMAIL · OUTLOOK · SES"],
              ["CRM", "SALESFORCE · HUBSPOT"],
              ["SUPPORT", "ZENDESK · INTERCOM · FRONT"],
              ["INTERNAL", "REST · GRAPHQL · CUSTOM"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={s.integRow}
                style={{ borderBottom: i < 3 ? "1px solid var(--c-line)" : undefined, boxSizing: "border-box", display: "flex", paddingBlock: "10px", paddingInline: "12px" }}
              >
                <div style={mono(10, 12, "var(--c-faint)", { flexShrink: 0, width: "80px" })}>{k}</div>
                <div style={mono(11, 14, i === 3 ? "var(--c-accent-text)" : "var(--c-text)", { transition: "color .2s" })}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="operate" className={`${s.triCol} ${s.section}`} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box" }}>
          <Head eyebrow="06 / OPERATE" title="We run it. You review it." body="Model selection, retries, monitoring and configuration drift are ours. You see a report and a queue." />
          <div data-reveal="" style={{ backgroundColor: "var(--c-band)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "14px", padding: "16px" }}>
            <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "space-between" }}>
              <div style={mono(10, 12, "var(--c-faint)")}>AGENTS RUNNING</div>
              <div style={{ alignItems: "center", boxSizing: "border-box", display: "flex", gap: "6px" }}>
                <div className={s.pulse} style={{ backgroundColor: "var(--p-op-green)", flexShrink: 0, height: "6px", width: "6px" }} />
                <div style={mono(10, 12, "var(--p-op-green)")}>HEALTH OK</div>
              </div>
            </div>
            <div style={{ boxSizing: "border-box", display: "flex", gap: "24px" }}>
              {[
                ["6", "AGENTS"],
                ["412", "RUNS TODAY"],
              ].map(([v, l]) => (
                <div key={l} style={{ boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                  <div data-count="" style={sans(32, 40, "var(--c-band-text)")}>{v}</div>
                  <div style={mono(10, 12, "var(--c-faint)")}>{l}</div>
                </div>
              ))}
            </div>
            <div ref={bars} style={{ alignItems: "end", boxSizing: "border-box", display: "flex", flexShrink: 0, gap: "3px", height: "40px" }}>
              {BARS.map(([h, c], i) => (
                <div key={i} style={{ backgroundColor: c, boxSizing: "border-box", flexBasis: "0%", flexGrow: 1, height: `${Math.round(h * 0.4)}px` }} />
              ))}
            </div>
          </div>
        </div>

        <div id="measure" className={`${s.triCol} ${s.section}`} style={{ boxSizing: "border-box" }}>
          <Head eyebrow="07 / MEASURE" title="See where the agent needed you." body="Approval rate, edit rate and where judgment was applied, week over week." />
          <div data-reveal="" style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "10px", padding: "16px" }}>
            <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "space-between" }}>
              <div style={mono(10, 12, "var(--c-faint)")}>EDIT RATE · LAST 7 WEEKS</div>
              <div style={mono(10, 12, "var(--p-green)")}>↓ IMPROVING</div>
            </div>
            <svg
              data-draw=""
              viewBox="0 0 304 80"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
            >
              <line x1="0" y1="79" x2="300" y2="79" stroke="var(--c-line)" />
              <path d="M0 10 L50 22 L100 30 L150 44 L200 50 L250 62 L300 66" fill="none" stroke="var(--c-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <rect ref={sq} x="296" y="62" width="8" height="8" fill="var(--c-accent)" />
            </svg>
            <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "space-between" }}>
              <div style={mono(10, 12, "var(--c-faint)")}>W1 · 38%</div>
              <div style={mono(10, 12, "var(--c-text)")}>W7 · 9%</div>
            </div>
          </div>
        </div>
      </RevealScope>
    </div>
  );
}
