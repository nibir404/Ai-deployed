"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import s from "./platform.module.css";
import { CopyCol, Section, mono, sans } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LAYERS = [
  { k: "L1", meta: "ORGANIZATIONAL · ORG-WIDE DEFAULTS", rule: "Voice · claim · brand · confidentiality", res: "PASS" },
  { k: "L2", meta: "AGENT-SPECIFIC · OVERRIDE", rule: "No outbound to non-customer domains", res: "PASS" },
  { k: "L3", meta: "EXECUTION-TIME · CONTEXT-GATED", rule: "Output must reference current order status", res: "WARN" },
];

const chip = (bg: string, color: string, border?: boolean): CSSProperties => ({
  backgroundColor: bg,
  border: border ? "1px solid var(--c-border)" : undefined,
  boxSizing: "border-box",
  display: "inline-block",
  paddingBlock: "5px",
  paddingInline: "9px",
  color,
});

export function Govern() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%" } });
      gsap.set(q("[data-badge]"), { opacity: 0, scale: 0.4 });
      q("[data-step]").forEach((el, i) => {
        const isConn = el.hasAttribute("data-conn");
        if (isConn) tl.from(el, { scaleY: 0, transformOrigin: "top", duration: 0.25, ease: "none" });
        else {
          tl.from(el, { opacity: 0, x: -24, duration: 0.45, ease: "power3.out" }, i === 0 ? 0 : ">-0.05");
          const b = el.querySelector("[data-badge]");
          if (b) tl.to(b, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, ">-0.1");
        }
      });
      tl.from(q("[data-fill]"), { scaleX: 0, duration: 0.9, ease: "power2.inOut" }, ">");
      tl.from(q("[data-result] > div:not([data-fill])"), { opacity: 0, y: 6, duration: 0.3, stagger: 0.08 }, ">-0.2");
    },
    { scope: ref },
  );

  return (
    <Section id="govern">
      <CopyCol
        borderRight
        eyebrow="03 / GOVERN"
        title="Rules enforced before generation. A gate at the start, not a filter at the end."
        body="Voice, claims, policy, confidentiality and brand are checked at the policy layer before the draft exists. If the layer is down, the agent does not run."
      >
        <div data-reveal-stagger="" style={{ boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <div style={chip("var(--p-green-fill)", "#FFFFFF")}><div style={mono(11, 14, "inherit")}>PASS</div></div>
          <div style={chip("var(--p-amber-fill)", "var(--c-text)")}><div style={mono(11, 14, "inherit")}>WARN</div></div>
          <div style={chip("var(--p-red)", "#FFFFFF")}><div style={mono(11, 14, "inherit")}>BLOCK</div></div>
          <div style={chip("transparent", "var(--c-text)", true)}><div style={mono(11, 14, "inherit")}>FAILS CLOSED</div></div>
          <div style={chip("transparent", "var(--c-text)", true)}><div style={mono(11, 14, "inherit")}>VERSIONED</div></div>
        </div>
      </CopyCol>
      <div className={`${s.dots} ${s.pane}`} style={{ boxSizing: "border-box" }}>
        <div ref={ref} className={s.w560} style={{ boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
          <div style={{ boxSizing: "border-box", display: "flex", justifyContent: "space-between", paddingBlock: "10px", gap: "12px" }}>
            <div style={mono(11, 14, "var(--c-muted)")}>AIDEPLOYED / RUNBOOK · CUSTOMER REPLY</div>
            <div style={mono(11, 14, "var(--c-faint)")}>v14</div>
          </div>
          {LAYERS.map((l, i) => (
            <div key={l.k} style={{ display: "contents" }}>
              {i > 0 && (
                <div
                  data-step=""
                  data-conn=""
                  className={s.conn}
                  style={{ "--i": i - 1, backgroundColor: "var(--c-text)", boxSizing: "border-box", flexShrink: 0, height: "16px", width: "1px" } as CSSProperties}
                />
              )}
              <div
                data-step=""
                className={`${s.ind} ${s.layerCard} hover-lift`}
                style={
                  {
                    "--i": i,
                    alignItems: "center",
                    backgroundColor: "var(--c-surface)",
                    border: "1px solid var(--c-border)",
                    boxSizing: "border-box",
                    display: "flex",
                    gap: "16px",
                    padding: "16px",
                  } as CSSProperties
                }
              >
                <div style={mono(11, 14, "var(--c-faint)", { flexShrink: 0, width: "28px" })}>{l.k}</div>
                <div style={{ boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "3px", minWidth: 0 }}>
                  <div style={mono(10, 12, "var(--c-muted)")}>{l.meta}</div>
                  <div style={sans(15, 18, "var(--c-text)")}>{l.rule}</div>
                </div>
                <div data-badge="" style={mono(11, 14, l.res === "PASS" ? "var(--p-green)" : "var(--p-amber)")}>
                  {l.res}
                </div>
              </div>
            </div>
          ))}
          <div data-step="" data-conn="" className={s.conn} style={{ "--i": 2, backgroundColor: "var(--c-text)", boxSizing: "border-box", flexShrink: 0, height: "16px", width: "1px" } as CSSProperties} />
          <div
            data-result=""
            className={s.ind}
            style={
              {
                "--i": 3,
                position: "relative",
                alignItems: "center",
                backgroundColor: "color-mix(in srgb, var(--c-accent) 18%, transparent)",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                padding: "16px",
              } as CSSProperties
            }
          >
            <div data-fill="" className={s.resultFill} />
            <div style={mono(11, 14, "#FFFFFF", { letterSpacing: "0.04em", position: "relative" })}>RESULT → DRAFT QUEUED FOR REVIEW</div>
            <div style={mono(11, 14, "#FFFFFF", { position: "relative" })}>ALLOWED</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
