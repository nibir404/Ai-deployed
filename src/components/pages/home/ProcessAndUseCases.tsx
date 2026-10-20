"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealScope } from "@/components/motion/Reveal";
import css from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";
const A = "/assets/";

const STEPS = [
  { week: "WEEK 1", step: "STEP 01", title: "Discovery", body: "We learn the work, your systems, and your governance requirements.", out: "OUT → ONE-PAGE DIAGNOSIS", color: "#E8A23A", tint: "#F5A5241A", img: A + "602MZBP57STBQGG7C68DYA2YGQ.svg" },
  { week: "WEEK 2–3", step: "STEP 02", title: "Architect and build", body: "We design the agent (goal, tools, guardrails, approval mode) and build it against your systems.", out: "OUT → AGENT CONFIG + BUILD", color: "#7C3AED", tint: "#7C3AED14", img: A + "4HNBKVHFF6TD21KWJF432GXEZC.svg" },
  { week: "WEEK 3–4", step: "STEP 03", title: "Review", body: "Your team reviews the drafts. We tune the configuration from what your team edits.", out: "OUT → EDIT RATE FALLING", color: "#0284C7", tint: "#0284C714", img: A + "2P0PT17GGH41ZHXKEW7FNDJA37.svg" },
  { week: "WEEK 4 → ONGOING", step: "STEP 04 · ONGOING", title: "Run and improve", body: "We operate the agent, tune the model, and update the policy as your business changes.", out: "OUT → WEEKLY REPORT + QUEUE", color: "#059669", tint: "#05966914", img: A + "3VVKESC3WGY6N17X7N1V3GHTB2.svg" },
];

function SectionHead({ eyebrow, title, titleW, body }: { eyebrow: string; title: string; titleW: number; body: string }) {
  return (
    <div className={css.head}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div data-reveal style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>{eyebrow}</div>
        <h2 data-split className={css.h2} style={{ color: "var(--c-text)", maxWidth: titleW }}>
          {title}
        </h2>
      </div>
      <p data-reveal data-delay="0.15" className={css.lede}>
        {body}
      </p>
    </div>
  );
}

export function Process() {
  const [active, setActive] = useState(3);
  const [hover, setHover] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const cur = hover ?? active;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActive(0);
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        end: "bottom 60%",
        onUpdate: (st) => setActive(Math.min(3, Math.floor(st.progress * 4))),
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="col">
      <RevealScope style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
        <SectionHead eyebrow="/ HOW IT WORKS" title="From discovery to an agent in production." titleW={640} body="Four steps. Running in production by week four. After that, we run the agent and tune it as your business changes." />
        <div className={css.ruler} style={{ borderBottom: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex" }}>
          {STEPS.map((s, i) => {
            const on = i === cur;
            return (
              <div key={s.week} style={{ position: "relative", borderRight: i < 3 ? "1px solid var(--c-line)" : "none", display: "flex", flexBasis: "0%", flexGrow: 1, justifyContent: "space-between", paddingBlock: "12px", paddingInline: "24px", overflow: "hidden" }}>
                <motion.div initial={false} animate={{ scaleX: on ? 1 : i < cur ? 1 : 0, opacity: on ? 1 : i < cur ? 0.12 : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", inset: 0, background: "var(--c-accent)", transformOrigin: "left" }} />
                <span style={{ position: "relative", color: on ? "#FFFFFF" : "var(--c-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", transition: "color .3s" }}>{s.week}</span>
                <span style={{ position: "relative", color: on ? "#FFFFFF" : "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", transition: "color .3s" }}>{i === 3 ? "∞" : "→"}</span>
              </div>
            );
          })}
        </div>
        <div className={css.steps} onPointerLeave={() => setHover(null)}>
          {STEPS.map((s, i) => {
            const on = i === cur;
            return (
              <div
                key={s.title}
                onPointerEnter={() => setHover(i)}
                data-reveal
                data-delay={String(i * 0.08)}
                className={css.step}
                style={{ backgroundColor: on ? "var(--c-bg-alt)" : "transparent", transition: "background-color .4s", borderRight: i < 3 ? "1px solid var(--c-line)" : "none", display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "40px", paddingInline: "24px", paddingTop: "32px" }}
              >
                <motion.div animate={{ scale: on ? 1.04 : 1, rotate: on ? -2 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} style={{ alignItems: "center", backgroundColor: s.tint, border: `1px solid ${s.color}`, display: "flex", flexShrink: 0, height: "96px", justifyContent: "center", width: "96px" }}>
                  <motion.div animate={{ y: on ? [0, -4, 0] : 0 }} transition={{ duration: 2, repeat: on ? Infinity : 0, ease: "easeInOut" }} style={{ backgroundImage: `url(${s.img})`, backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: 0, height: "84px", width: "84px" }} />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ color: i === 3 ? "var(--c-accent-text)" : "var(--c-faint)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>{css.step}</div>
                  <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "30px" }}>{s.title}</div>
                  <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: "15px", lineHeight: "23px" }}>{s.body}</div>
                </div>
                <div style={{ position: "relative", paddingTop: "8px" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: on ? "var(--c-border)" : "var(--c-line)" }} />
                  <motion.div initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.6 }} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: s.color, transformOrigin: "left" }} />
                  <div style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.04em", lineHeight: "14px" }}>{s.out}</div>
                </div>
              </div>
            );
          })}
        </div>
      </RevealScope>
    </div>
  );
}

const CASES = [
  { title: "Support", body: "Triage inbound. Draft replies for your team to approve.", img: A + "29NKXSDQ80QYX02H4KXVTXHXXJ.svg", example: "Customer reply agent: 71% of drafts approved without edits.", href: "/case-studies/customer-reply-agent" },
  { title: "Sales", body: "Personalized follow-ups after every demo, matched to your voice.", img: A + "1M355EEJ2XXRNNS8DJHZR0BDHK.svg", example: "Demo follow-ups drafted within 10 minutes of the call ending.", href: "/case-studies" },
  { title: "Operations", body: "Reorder low-stock SKUs, route approvals, keep the ops inbox clean.", img: A + "74W5B9743X487YRTEYFEC8AAKQ.svg", example: "Purchase orders proposed, never placed, until a buyer approves.", href: "/case-studies" },
  { title: "Analytics", body: "Weekly pipeline summaries, risk callouts, board-ready notes.", img: A + "5JA4C2FFGX8H9HME80DZ32AB5V.svg", example: "Monday pipeline brief with sources linked line by line.", href: "/case-studies" },
  { title: "Finance", body: "Reconcile invoices, flag anomalies, draft approvals for the controller.", img: A + "2QJBGWSAYPMM0BZPN9PGSSWBD8.svg", example: "Three-way match on every invoice; mismatches held for review.", href: "/case-studies" },
  { title: "Marketing", body: "Newsletter drafts, subject-line tests, social scheduling.", img: A + "4V6GAMD9SG25HC6Q6XXRQQGYCA.svg", example: "Drafts in your brand voice, scheduled only after sign-off.", href: "/case-studies" },
];

export function UseCases() {
  const [sel, setSel] = useState(0);
  return (
    <RevealScope className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", fontSize: "12px", lineHeight: "16px" }}>
      <SectionHead eyebrow="/ USE CASES" title="Built for one job. Built for your environment." titleW={600} body="Six functions. Each agent scoped to the work, governed by your rules, reviewed by your team." />
      <div role="tablist" className={css.cases} data-lenis-prevent data-reveal-stagger style={{ borderTop: "1px solid var(--c-line)" }}>
        {CASES.map((c, i) => {
          const on = i === sel;
          return (
            <Link
              key={c.title}
              href={c.href}
              role="tab"
              className={css.case}
              aria-selected={on}
              onPointerEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              style={{ position: "relative", backgroundColor: on ? "var(--c-bg-alt)" : "transparent", transition: "background-color .35s", borderRight: i < 5 ? "1px solid var(--c-line)" : "none", display: "flex", flexDirection: "column", gap: "40px", paddingBlock: "28px", paddingInline: "24px", color: "inherit", textDecoration: "none" }}
            >
              {on && <motion.div layoutId="uc-bar" style={{ position: "absolute", top: -1, left: 0, right: 0, height: 2, background: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <motion.div animate={{ rotate: on ? -6 : 0, scale: on ? 1.08 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} style={{ backgroundImage: `url(${c.img})`, backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: 0, height: "36px", width: "36px" }} />
                <div style={{ color: on ? "var(--c-accent-text)" : "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", transition: "color .3s" }}>
                  {String(i + 1).padStart(2, "0")}
                  {on ? " ↗" : ""}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "22px", letterSpacing: "-0.02em", lineHeight: "28px" }}>{c.title}</div>
                <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: "15px", lineHeight: "22px" }}>{c.body}</div>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div key="ex" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                      <div style={{ paddingTop: 10, color: "var(--c-accent-text)", fontFamily: mono, fontSize: 11, lineHeight: "15px", letterSpacing: "0.02em" }}>{c.example}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </div>
    </RevealScope>
  );
}
