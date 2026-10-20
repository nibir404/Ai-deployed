"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import css from "./Contact.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const DAYS = [
  { dow: "WED", d: 21, full: "Wed 21 Oct" },
  { dow: "THU", d: 22, full: "Thu 22 Oct" },
  { dow: "FRI", d: 23, full: "Fri 23 Oct" },
  { dow: "MON", d: 26, full: "Mon 26 Oct" },
  { dow: "TUE", d: 27, full: "Tue 27 Oct" },
];
const TIMES = ["09:00", "09:30", "10:30", "11:00", "14:00", "15:30"];
const DISABLED = new Set(["09:30"]);
const JOBS = ["Support replies", "Ops triage", "Data entry", "Reporting", "Something else"];
const TEAM = ["1–10", "11–50", "51–200", "200+"];
const STEPS = ["01 THE WORK", "02 TIME", "03 DETAILS"];

const PERKS = [
  { icon: "/assets/29NKXSDQ80QYX02H4KXVTXHXXJ.svg", text: "30 minutes with an engineer, not sales" },
  { icon: "/assets/7PZE67JMNQH12TX4V4E6NEYR6X.svg", text: "A written diagnosis within 48 hours" },
  { icon: "/assets/1JME28A1JQF34JMPRWFQF6ZM41.svg", text: "Security review first, if your team needs it" },
];

const label: React.CSSProperties = { color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", letterSpacing: "0.06em" };
const input: React.CSSProperties = {
  height: "40px",
  border: "1px solid var(--c-border)",
  background: "transparent",
  color: "var(--c-text)",
  fontFamily: sans,
  fontSize: "15px",
  paddingInline: "12px",
  outline: "none",
  width: "100%",
  borderRadius: 0,
};

function Chip({ active, onClick, children, disabled, style }: { active: boolean; onClick?: () => void; children: React.ReactNode; disabled?: boolean; style?: React.CSSProperties }) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      animate={{ scale: active ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        position: "relative",
        border: `1px solid ${disabled ? "var(--c-line)" : active ? "transparent" : "var(--c-border)"}`,
        background: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: 0,
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export function ContactBody() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [job, setJob] = useState(JOBS[0]);
  const [systems, setSystems] = useState("");
  const [team, setTeam] = useState(TEAM[1]);
  const [day, setDay] = useState(1);
  const [time, setTime] = useState("10:30");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [tried, setTried] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const detailsOk = name.trim() && emailOk && company.trim();

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };
  const next = () => {
    if (step < 2) return go(step + 1);
    if (step === 2) return go(3);
    setTried(true);
    if (!detailsOk) return;
    const q = `day=${encodeURIComponent(DAYS[day].full)}&time=${encodeURIComponent(time)}`;
    router.push(`/contact/confirmed?${q}`);
  };

  const slide = {
    enter: (d: number) => ({ x: reduce ? 0 : d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduce ? 0 : d * -60, opacity: 0 }),
  };

  return (
    <RevealScope className={`col ${css.body}`} style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", overflowWrap: "anywhere" }}>
      {/* Left column */}
      <div className={css.left} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", flexShrink: 0, gap: "24px", paddingBlock: "112px", paddingInline: "56px", width: "480px" }}>
        <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          <div style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
          <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px" }}>START</div>
        </div>
        <h1 data-split="" className={css.h1} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: "64px", letterSpacing: "-0.035em", lineHeight: "68px" }}>Let’s talk.</h1>
        <p data-reveal="" data-delay="0.1" style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: "17px", lineHeight: "26px" }}>
          One conversation with one of the engineers who would do the work. We’ll tell you when we’re not the right fit.
        </p>
        <div data-reveal-stagger="" style={{ borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column", marginTop: "12px" }}>
          {PERKS.map((p) => (
            <div key={p.text} className="hover-row" style={{ alignItems: "center", borderBottom: "1px solid var(--c-line)", display: "flex", gap: "12px", paddingBlock: "14px" }}>
              <div style={{ backgroundImage: `url(${p.icon})`, backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: 0, height: "24px", width: "24px" }} />
              <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "18px" }}>{p.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking form */}
      <div className={css.form} style={{ backgroundColor: "var(--c-bg-alt)", boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, paddingBlock: "112px", paddingInline: "56px" }}>
        <div data-reveal="scale">
          {/* Tabs */}
          <div role="tablist" style={{ backgroundColor: "var(--c-surface)", borderLeft: "1px solid var(--c-border)", borderRight: "1px solid var(--c-border)", borderTop: "1px solid var(--c-border)", display: "flex", position: "relative" }}>
            {STEPS.map((s, i) => {
              const n = i + 1;
              const done = n < step;
              const active = n === step;
              return (
                <button
                  key={s}
                  role="tab"
                  className={css.tab}
                  aria-selected={active}
                  type="button"
                  onClick={() => n < step && go(n)}
                  style={{
                    position: "relative",
                    alignItems: "center",
                    background: "transparent",
                    border: 0,
                    borderBottom: "1px solid var(--c-line)",
                    borderRight: i < 2 ? "1px solid var(--c-line)" : 0,
                    cursor: n < step ? "pointer" : "default",
                    display: "flex",
                    flexBasis: "0%",
                    flexGrow: 1,
                    gap: "8px",
                    paddingBlock: "14px 16px",
                    paddingInline: "16px",
                    textAlign: "left",
                  }}
                >
                  <span style={{ color: done ? "var(--c-accent-text)" : active ? "var(--c-text)" : "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px", transition: "color .3s" }}>
                    {done ? "✓ " : ""}
                    {s}
                  </span>
                  {done && <motion.span layout style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 3, background: "var(--c-accent)" }} />}
                  {active && <motion.span layoutId="contact-tab-underline" transition={{ type: "spring", stiffness: 380, damping: 34 }} style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 3, background: "var(--c-text)" }} />}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className={css.panel} style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", borderTop: 0, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px", padding: "32px", overflow: "hidden" }}>
            <div style={{ position: "relative", minHeight: "250px" }}>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {step === 1 && (
                    <>
                      <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "30px" }}>What should the agent take on?</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={label}>THE JOB</div>
                        <div className={css.jobs} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {JOBS.map((j) => (
                            <Chip key={j} active={job === j} onClick={() => setJob(j)} style={{ height: "36px", paddingInline: "14px" }}>
                              {job === j && <motion.span layoutId="job-bg" style={{ position: "absolute", inset: 0, background: "var(--c-band)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                              <span style={{ position: "relative", color: job === j ? "var(--c-band-text)" : "var(--c-text)", fontFamily: mono, fontSize: "12px", lineHeight: "16px", transition: "color .2s" }}>{j.toUpperCase()}</span>
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <span style={label}>WHICH SYSTEMS</span>
                        <input value={systems} onChange={(e) => setSystems(e.target.value)} placeholder="e.g. Zendesk, Salesforce, Postgres" style={input} />
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={label}>TEAM SIZE</div>
                        <div className={css.chipRow} style={{ display: "flex", gap: "8px" }}>
                          {TEAM.map((t) => (
                            <Chip key={t} active={team === t} onClick={() => setTeam(t)} style={{ height: "36px", width: "96px" }}>
                              {team === t && <motion.span layoutId="team-bg" style={{ position: "absolute", inset: 0, background: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                              <span style={{ position: "relative", color: team === t ? "#FFFFFF" : "var(--c-text)", fontFamily: mono, fontSize: "12px", lineHeight: "16px", transition: "color .2s" }}>{t}</span>
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "30px" }}>Pick a 30-minute slot</div>
                      <div className={css.days} data-lenis-prevent="" style={{ display: "flex", gap: "8px" }}>
                        {DAYS.map((d, i) => (
                          <Chip key={d.d} active={day === i} onClick={() => setDay(i)} style={{ flexBasis: "0%", flexGrow: 1, paddingBlock: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                            {day === i && <motion.span layoutId="day-bg" style={{ position: "absolute", inset: -1, background: "var(--c-band)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                            <span style={{ position: "relative", color: "var(--c-faint)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>{d.dow}</span>
                            <span style={{ position: "relative", color: day === i ? "var(--c-band-text)" : "var(--c-text)", fontFamily: sans, fontSize: "22px", lineHeight: "28px", transition: "color .2s" }}>{d.d}</span>
                          </Chip>
                        ))}
                      </div>
                      <div className={css.times} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {TIMES.map((t) => {
                          const dis = DISABLED.has(t);
                          return (
                            <Chip key={t} active={time === t} disabled={dis} onClick={() => setTime(t)} style={{ height: "36px", width: "96px" }}>
                              {time === t && <motion.span layoutId="time-bg" style={{ position: "absolute", inset: -1, background: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                              <span style={{ position: "relative", color: dis ? "var(--c-disabled)" : time === t ? "#FFFFFF" : "var(--c-text)", fontFamily: mono, fontSize: "12px", lineHeight: "16px", textDecoration: dis ? "line-through" : undefined }}>{t}</span>
                            </Chip>
                          );
                        })}
                      </div>
                      <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>TIMES IN YOUR TIMEZONE · ASIA/DHAKA</div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "30px" }}>Where should we send the invite?</div>
                      <div style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>
                        {DAYS[day].full.toUpperCase()} · {time} · {job.toUpperCase()}
                      </div>
                      {[
                        { k: "NAME", v: name, set: setName, ok: !!name.trim(), type: "text", ph: "Your name", ac: "name" },
                        { k: "WORK EMAIL", v: email, set: setEmail, ok: emailOk, type: "email", ph: "you@company.com", ac: "email" },
                        { k: "COMPANY", v: company, set: setCompany, ok: !!company.trim(), type: "text", ph: "Company", ac: "organization" },
                      ].map((f) => (
                        <label key={f.k} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <span style={{ ...label, color: tried && !f.ok ? "#D9534F" : label.color }}>
                            {f.k}
                            {tried && !f.ok ? " · REQUIRED" : ""}
                          </span>
                          <input type={f.type} autoComplete={f.ac} value={f.v} placeholder={f.ph} onChange={(e) => f.set(e.target.value)} style={{ ...input, borderColor: tried && !f.ok ? "#D9534F" : "var(--c-border)" }} />
                        </label>
                      ))}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={css.actions} style={{ alignItems: "center", borderTop: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", gap: "12px", paddingTop: "20px" }}>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={step === 1}
                onClick={() => go(step - 1)}
                style={{ alignItems: "center", border: "1px solid var(--c-disabled)", display: "flex", height: "36px", paddingInline: "16px", background: "transparent", opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? "default" : "pointer" }}
              >
                <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>← BACK</span>
              </button>
              <div className={css.hint} style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: "14px", lineHeight: "18px", textAlign: "center" }}>
                {step === 2 ? "None of these work? Send three answers instead." : step === 1 ? "Two lines is plenty. We’ll ask the rest." : "No newsletter. One invite, one engineer."}
              </div>
              <Magnetic strength={0.2}>
                <button type="button" className="btn btn-primary" onClick={next} style={{ alignItems: "center", backgroundColor: "var(--c-accent)", border: 0, display: "flex", height: "36px", paddingInline: "16px", cursor: "pointer" }}>
                  <span style={{ color: "#FFFFFF", fontFamily: mono, fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px", width: "max-content" }}>
                    {step === 3 ? "BOOK THE CALL" : "CONTINUE"} <span className="arrow">→</span>
                  </span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </RevealScope>
  );
}
