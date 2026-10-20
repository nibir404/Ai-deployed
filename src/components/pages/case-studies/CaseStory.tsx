"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import s from "./CaseStudies.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const TOC = [
  { id: "problem", label: "01 THE PROBLEM" },
  { id: "agent", label: "02 THE AGENT" },
  { id: "governance", label: "03 GOVERNANCE" },
  { id: "results", label: "04 RESULTS" },
];

const SPEC: [string, string, boolean][] = [
  ["GOAL", "Draft replies to shipment emails from approved data", false],
  ["TOOLS", "sap.tm.read · outlook.draft · tickets.route", true],
  ["GUARDRAILS", "No refunds, no commitments on delivery dates", false],
];

const WEEKS = [
  { w: "W4", v: 38 },
  { w: "W5", v: 24 },
  { w: "W6", v: 14 },
  { w: "W7", v: 9 },
];

const label = { color: "var(--c-accent-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" } as const;
const h2 = { color: "var(--c-text)", fontFamily: sans, fontSize: "28px", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: "36px", margin: 0 } as const;
const para = { color: "var(--c-muted)", fontFamily: sans, fontSize: "17px", lineHeight: "28px", margin: 0 } as const;

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return <motion.div className={s.progress} style={{ scaleX }} aria-hidden />;
}

export function CaseStory() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(TOC[0].id);
  const lenis = useLenis();

  useGSAP(
    () => {
      TOC.forEach(({ id }) => {
        const el = root.current?.querySelector(`#${id}`);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(id),
        });
      });
    },
    { scope: root },
  );

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const off = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 102) - 32;
    setActive(id);
    if (lenis) lenis.scrollTo(el, { offset: off, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={root}
      className={`col ${s.story}`}
      style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", fontSize: "12px", lineHeight: "16px" }}
    >
      <nav className={s.toc} aria-label="Contents" style={{ boxSizing: "border-box" }}>
        <div className={s.tocInner}>
          {TOC.map((t) => (
            <button key={t.id} type="button" onClick={() => go(t.id)} aria-current={active === t.id ? "true" : undefined} className={`${s.tocItem} ${active === t.id ? s.tocActive : ""}`} style={{ position: "relative" }}>
              {active === t.id && (
                <motion.span layoutId="toc-mark" style={{ position: "absolute", left: -16, top: 4, width: 6, height: 6, background: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <div className={s.body} style={{ boxSizing: "border-box" }}>
        <section id="problem" className={s.section}>
          <div data-reveal="" style={label}>01 / THE PROBLEM</div>
          <h2 data-split="" style={h2}>Six hours to triage a delayed-shipment ticket.</h2>
          <p data-reveal="" className={s.wide} style={para}>
            The support team read every inbound email, looked up shipment status in SAP TM, and typed each reply by hand. A third of tickets landed with the wrong team. Two earlier AI pilots stalled in security review.
          </p>
        </section>

        <section id="agent" className={s.section}>
          <div data-reveal="" style={label}>02 / THE AGENT</div>
          <h2 data-split="" style={h2}>One job: draft the reply, route the ticket.</h2>
          <div data-reveal-stagger="" className={s.wide} style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            {SPEC.map(([k, v, code], i) => (
              <div key={k} className={`hover-row ${s.specRow}`} style={{ borderBottom: i < SPEC.length - 1 ? "1px solid var(--c-line)" : "none", boxSizing: "border-box" }}>
                <div className={s.specKey} style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{k}</div>
                <div style={{ color: "var(--c-text)", fontFamily: code ? mono : sans, fontSize: code ? "12px" : "14px", lineHeight: code ? "16px" : "18px" }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="governance" className={s.section} style={{ gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div data-reveal="" style={label}>03 / GOVERNANCE</div>
            <h2 data-split="" style={h2}>Security signed off in 16 days.</h2>
            <p data-reveal="" className={s.wide} style={para}>
              Everything ran on the carrier’s own cluster. The CISO reviewed the policy schema and audit-log export before kickoff. Customer PII is stripped before the model.
            </p>
          </div>
          <figure data-reveal="clip" className={`${s.wide} ${s.quote}`} style={{ backgroundColor: "var(--c-bg-alt)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "20px", margin: 0, position: "relative" }}>
            <blockquote data-split="" style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "32px", margin: 0 }}>
              “Security signed off in 16 days. That has never happened here.”
            </blockquote>
            <figcaption style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>HEAD OF OPERATIONS · SAMPLE QUOTE</figcaption>
          </figure>
        </section>

        <section id="results" className={s.section}>
          <div data-reveal="" style={label}>04 / RESULTS</div>
          <h2 data-split="" style={h2}>Edit rate down from 38% to 9% in four weeks.</h2>
          <p data-reveal="" className={s.wide} style={para}>
            Agents approve drafts instead of typing them. Triage time halved, misroutes fell from 31% to 7%, and the team now edits fewer than one draft in ten.
          </p>
          <div className={s.wide} style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid var(--c-line)" }}>
              <span style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>EDIT RATE BY WEEK</span>
              <span style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>% OF DRAFTS CHANGED</span>
            </div>
            {WEEKS.map((r, i) => (
              <div key={r.w} className="hover-row" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderBottom: i < WEEKS.length - 1 ? "1px solid var(--c-line)" : "none" }}>
                <span style={{ width: 32, flexShrink: 0, color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{r.w}</span>
                <div style={{ flex: 1, height: 8, background: "var(--c-line)", position: "relative", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: r.v / 40 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0, transformOrigin: "0 50%", background: i === WEEKS.length - 1 ? "var(--c-accent)" : "var(--c-faint)" }}
                  />
                </div>
                <span data-count="" style={{ width: 40, flexShrink: 0, textAlign: "right", color: i === WEEKS.length - 1 ? "var(--c-accent-text)" : "var(--c-text)", fontFamily: sans, fontSize: "14px", lineHeight: "18px" }}>
                  {r.v}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
