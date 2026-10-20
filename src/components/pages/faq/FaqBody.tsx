"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import st from "./Faq.module.css";

type Cat = "basics" | "running" | "start";

const CATS: { id: Cat; label: string }[] = [
  { id: "basics", label: "THE BASICS" },
  { id: "running", label: "RUNNING THE AGENT" },
  { id: "start", label: "GETTING STARTED" },
];

const QA: { cat: Cat; q: string; a: string }[] = [
  {
    cat: "basics",
    q: "What does AI Deployed actually do?",
    a: "We architect, build, deploy and run AI and software systems for your business. Each agent is scoped to one job, runs against your data, and operates under an approval gate you control. You review the queue. We do the rest.",
  },
  {
    cat: "basics",
    q: "How is this different from buying an AI tool?",
    a: "A tool hands you a product and leaves the setup to you. We do the work: scope the job, connect it to your systems, write the policies, and keep it running. You get an outcome, not another login.",
  },
  {
    cat: "basics",
    q: "What kinds of businesses do you work with?",
    a: "Teams with a repetitive, well-defined job that eats hours every week: support replies, intake, triage, reporting. Size matters less than having a clear process and someone who owns it.",
  },
  {
    cat: "running",
    q: "What does “run” mean?",
    a: "After launch we stay on. We watch the queue, tune prompts and policies, handle model updates, and fix what breaks. You get a short report each week on what the agent did and what changed.",
  },
  {
    cat: "running",
    q: "What does the approval gate look like?",
    a: "Every draft lands in a queue before anything is sent or changed. You approve, edit or reject it in one click. Nothing leaves without a person saying yes, unless you choose to loosen that for a specific case.",
  },
  {
    cat: "running",
    q: "Can I keep using my existing tools?",
    a: "Yes. The agent works inside the tools you already use, like your helpdesk, inbox, CRM or docs. We connect to them; you do not have to move anything.",
  },
  {
    cat: "start",
    q: "How long does an engagement last?",
    a: "The first agent is usually live in four to six weeks. After that, running it is ongoing and month to month. You can stop at any time and keep everything we built.",
  },
  {
    cat: "start",
    q: "How do we start?",
    a: "Book a short call. We talk through the job you want handled, look at how it runs today, and tell you plainly whether an agent is a good fit. If it is, we send a scoped plan.",
  },
];

const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "16px" };

export function FaqBody() {
  const [cat, setCat] = useState<Cat | null>(null);
  const [open, setOpen] = useState<string | null>(QA[0].q);
  const reduce = useReducedMotion();
  const items = cat ? QA.filter((x) => x.cat === cat) : QA;

  return (
    <RevealScope
      className={`col ${st.wrap}`}
      style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", minHeight: "934px" }}
    >
      <div
        className={st.side}
        style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "24px", paddingBlock: "112px", paddingInline: "56px", width: "440px" }}
      >
        <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          <div style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
          <div style={{ ...mono, color: "var(--c-muted)", letterSpacing: "0.06em" }}>FREQUENTLY ASKED</div>
        </div>
        {/* 50px keeps "engagements." on one line inside the 328px column */}
        <h1 data-split="" className={st.h1} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "50px", letterSpacing: "-0.035em", lineHeight: "56px", overflowWrap: "normal", wordBreak: "keep-all", hyphens: "none" }}>
          Common questions about engagements.
        </h1>
        <p data-reveal="" style={{ margin: 0, color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: "25px" }}>
          If your question is not here, reach out. We are happy to discuss your context.
        </p>
        <div data-reveal-stagger="" data-lenis-prevent="" role="tablist" aria-label="Filter questions" className={st.cats} style={{ borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", marginTop: "16px" }}>
          {CATS.map((c) => {
            const active = cat === c.id;
            const n = QA.filter((x) => x.cat === c.id).length;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(active ? null : c.id)}
                className={`faq-cat ${st.cat}`}
                style={{ all: "unset", cursor: "pointer", borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", paddingBlock: "12px", transition: "padding .25s ease" }}
              >
                <span style={{ ...mono, color: active ? "var(--c-accent-text)" : "var(--c-text)", transition: "color .2s" }}>{c.label}</span>
                <span style={{ ...mono, color: active ? "var(--c-accent-text)" : "var(--c-faint)", transition: "color .2s" }}>{n}</span>
              </button>
            );
          })}
          <style>{`@media (hover:hover) and (min-width:1100px){.faq-cat:hover{padding-left:6px !important}}.faq-cat:focus-visible{outline:1px solid var(--c-accent)}`}</style>
        </div>
      </div>

      <div className={st.main} style={{ boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, paddingBlock: "112px", paddingInline: "56px" }}>
        <div data-reveal="" style={{ borderBottom: "1px solid var(--c-line)" }}>
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((item, i) => {
              const isOpen = open === item.q;
              return (
                <motion.div
                  key={item.q}
                  layout={!reduce}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderTop: `1px solid ${isOpen || i === 0 ? "var(--c-text)" : "var(--c-line)"}`, transition: "border-color .25s" }}
                >
                  <button
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    className={`faq-q ${st.qBtn}`}
                    style={{ all: "unset", cursor: "pointer", boxSizing: "border-box", width: "100%", alignItems: "center", display: "flex", justifyContent: "space-between", gap: "24px", paddingBlock: "24px" }}
                  >
                    <span className={st.q} style={{ color: "var(--c-text)", fontFamily: "var(--font-sans)", fontSize: "22px", letterSpacing: "-0.01em", lineHeight: "28px" }}>{item.q}</span>
                    <span
                      aria-hidden
                      style={{ position: "relative", border: "1px solid var(--c-text)", backgroundColor: isOpen ? "var(--c-text)" : "transparent", flexShrink: 0, height: "28px", width: "28px", transition: "background-color .25s" }}
                    >
                      <span style={{ position: "absolute", left: "50%", top: "50%", width: "8px", height: "1px", marginLeft: "-4px", background: isOpen ? "var(--c-bg)" : "var(--c-text)", transition: "background .25s" }} />
                      <span
                        style={{ position: "absolute", left: "50%", top: "50%", width: "1px", height: "8px", marginTop: "-4px", background: isOpen ? "var(--c-bg)" : "var(--c-text)", transform: isOpen ? "rotate(90deg) scaleY(0)" : "rotate(0) scaleY(1)", transition: "transform .3s cubic-bezier(.22,1,.36,1), background .25s" }}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden", marginTop: "-10px" }}
                      >
                        <p style={{ margin: 0, paddingBottom: "24px", color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: "26px", maxWidth: "600px" }}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <style>{`.faq-q:hover span:first-child{color:var(--c-accent-text) !important}.faq-q:focus-visible{outline:1px solid var(--c-accent);outline-offset:4px}`}</style>
      </div>
    </RevealScope>
  );
}
