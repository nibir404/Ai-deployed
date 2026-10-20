"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "@/components/motion/Tilt";
import s from "./platform.module.css";
import { CopyCol, IconList, Section, mono, sans } from "./ui";

const MODES = ["AUTO", "REVIEW", "STRICT"] as const;
const MODE_NOTE: Record<(typeof MODES)[number], string> = {
  AUTO: "Low-risk drafts send automatically. Logged.",
  REVIEW: "Every draft waits in your queue for approval.",
  STRICT: "Two approvers required. Policy WARN blocks.",
};

const row = { borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", paddingBlock: "14px", paddingInline: "16px" } as const;
const label = mono(11, 14, "var(--c-faint)");

export function Build() {
  const [mode, setMode] = useState<(typeof MODES)[number]>("REVIEW");
  return (
    <Section id="build">
      <CopyCol
        borderRight
        eyebrow="01 / BUILD"
        title="Each agent scoped to one job. In your environment, against your rules."
        body="Each agent is configured around a single goal, with the tools, data and guardrails scoped to that job. We build it with you, against your systems."
      >
        <IconList
          items={[
            { icon: "/assets/4V6GAMD9SG25HC6Q6XXRQQGYCA.svg", label: "Goal-scoped: one agent per job" },
            { icon: "/assets/2HBVKMSKFAGDW7J1QFTGAX5AX0.svg", label: "Tool allowlist: only the APIs it needs" },
            { icon: "/assets/1JME28A1JQF34JMPRWFQF6ZM41.svg", label: "Guardrails per agent: read, write, trigger" },
            { icon: "/assets/20TQV9QV0HWBBGHZEYMFT7JAKZ.svg", label: "Approval mode: auto, review or strict" },
          ]}
        />
      </CopyCol>
      <div
        className={`${s.dots} ${s.pane}`}
        style={{ boxSizing: "border-box" }}
      >
        <Tilt max={4} className={s.w560}>
          <div
            data-reveal="scale"
            style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div className={s.cfgRow} style={{ ...row, paddingBlock: "12px", justifyContent: "space-between" }}>
              <div style={mono(11, 14, "var(--c-muted)")}>AIDEPLOYED / ENGAGEMENTS / CONFIGURE</div>
              <div style={mono(11, 14, "var(--c-accent-text)")}>CUSTOMER REPLY</div>
            </div>
            <div data-reveal-stagger="" style={{ display: "flex", flexDirection: "column" }}>
              <div className={s.cfgRow} style={row}>
                <div className={s.cfgLabel} style={label}>AGENT NAME</div>
                <div style={sans(15, 18, "var(--c-text)")}>Customer reply</div>
              </div>
              <div className={s.cfgRow} style={row}>
                <div className={s.cfgLabel} style={label}>GOAL</div>
                <div style={sans(15, 22, "var(--c-text)")}>Respond to inbound support emails using approved knowledge.</div>
              </div>
              <div className={s.cfgRow} style={{ ...row, alignItems: "center" }}>
                <div className={s.cfgLabel} style={label}>TOOLS ALLOWED</div>
                <div className="r-wrap" style={{ boxSizing: "border-box", display: "flex", gap: "6px" }}>
                  {["kb.search", "gmail.send", "tickets.update"].map((t) => (
                    <div key={t} className="hover-lift" style={{ border: "1px solid var(--c-border)", boxSizing: "border-box", display: "inline-block", paddingBlock: "3px", paddingInline: "7px" }}>
                      <div style={mono(11, 14, "var(--c-text)")}>{t}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.cfgRow} style={row}>
                <div className={s.cfgLabel} style={label}>GUARDRAILS</div>
                <div style={sans(15, 22, "var(--c-text)")}>No outbound to non-customer domains. No commit to billing.</div>
              </div>
              <div className={s.cfgRow} style={row}>
                <div className={s.cfgLabel} style={label}>DATA SOURCE</div>
                <div style={sans(15, 18, "var(--c-text)")}>Internal knowledge base · versioned daily</div>
              </div>
              <div className={s.cfgRow} style={{ ...row, alignItems: "center", borderBottom: "none", position: "relative" }}>
                <div className={s.cfgLabel} style={label}>APPROVAL MODE</div>
                <div role="radiogroup" aria-label="Approval mode" style={{ border: "1px solid var(--c-border)", boxSizing: "border-box", display: "flex" }}>
                  {MODES.map((m) => {
                    const on = m === mode;
                    return (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        className={`${s.seg} ${s.tapBtn}`}
                        onClick={() => setMode(m)}
                        style={{ boxSizing: "border-box", display: "inline-block", paddingBlock: "5px", paddingInline: "10px" }}
                      >
                        {on && (
                          <motion.div
                            layoutId="platform-mode"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            style={{ position: "absolute", inset: 0, background: "var(--c-accent)" }}
                          />
                        )}
                        <div style={mono(11, 14, on ? "#FFFFFF" : "var(--c-muted)", { position: "relative", transition: "color .2s" })}>{m}</div>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={mono(10, 12, "var(--c-faint)", { position: "absolute", left: "16px", right: "16px", top: "100%", marginTop: "10px" })}
                  >
                    {MODE_NOTE[mode]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </Section>
  );
}
