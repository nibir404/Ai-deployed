import Link from "next/link";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { mono, sans } from "./styles";
import css from "./About.module.css";

const DISPLAY = { color: "var(--c-text)", fontFamily: 'var(--font-sans)' } as const;

export function AboutHero() {
  return (
    <RevealScope className={css.hero}>
      <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
        <div style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
        <div style={mono(12, 16, "var(--c-muted)", { letterSpacing: "0.06em" })}>ABOUT</div>
      </div>
      <h1 data-split className={css.h1} style={DISPLAY}>
        Embedded. Architect, build, run.
      </h1>
      <p data-reveal="" data-delay="0.35" className={css.lead} style={{ ...sans(20, 30, "var(--c-muted)"), margin: 0 }}>
        AI Deployed embeds with your team to architect, build, deploy and run AI and software systems across cloud, private and tightly controlled environments.
      </p>
    </RevealScope>
  );
}

export function Why() {
  return (
    <RevealScope className={css.why}>
      <div className={css.whyLeft}>
        <div data-reveal="" style={mono(11, 14, "var(--c-muted)", { letterSpacing: "0.06em" })}>/ WHY WE EXIST</div>
        <h2 data-split className={css.h3} style={DISPLAY}>
          Most AI tools assume you will build. We assume you won’t.
        </h2>
      </div>
      <div className={css.whyRight} data-reveal-stagger="">
        <p style={{ ...sans(18, 29, "var(--c-muted)"), margin: 0 }}>
          Most AI tools hand you a builder and call it done. We have watched customers stall, not because the model is wrong, but because operating AI in production is a job, and the job is not done by the buyer.
        </p>
        <p style={{ ...sans(18, 29, "var(--c-text)"), margin: 0 }}>
          We do that job. We architect, build, run and govern the agent. Your team reviews the queue.
        </p>
      </div>
    </RevealScope>
  );
}

const PRODUCTS = [
  {
    eyebrow: "EMBEDDED AI AND SOFTWARE, BUILT AND RUN",
    title: "AI Deployed",
    body: "Each agent is scoped to one job, runs against your data, and operates under an approval gate you control. Built, configured and run by our team.",
    cta: "SEE THE PLATFORM",
    href: "/platform",
  },
  {
    eyebrow: "GOVERNANCE TOOLING FOR AI IN PRODUCTION",
    title: "Compliance",
    body: "The same policy stack, audit logs and fail-closed behavior we use internally. Available for teams that run their own agents.",
    cta: "READ GOVERNANCE DETAILS",
    href: "/governance",
  },
];

export function Products() {
  return (
    <RevealScope className={css.sec} style={{ display: "flex", flexDirection: "column" }}>
      <div className={css.prodHead}>
        <div data-reveal="" style={mono(11, 14, "var(--c-muted)", { letterSpacing: "0.06em" })}>/ OUR PRODUCTS</div>
        <h2 data-split className={css.h2} style={DISPLAY}>
          Two products. One stack.
        </h2>
      </div>
      <div className={css.cards} data-reveal-stagger="">
        {PRODUCTS.map((p) => (
          <div key={p.title} className={`${css.card} hover-lift`}>
            <div style={mono(11, 14, "var(--c-accent-text)")}>{p.eyebrow}</div>
            <div style={sans(32, 40, "var(--c-text)", { letterSpacing: "-0.02em" })}>{p.title}</div>
            <div style={sans(16, 25, "var(--c-muted)")}>{p.body}</div>
            <Magnetic style={{ alignSelf: "flex-start" }}>
              <Link href={p.href} className={`btn btn-ghost ${css.btn}`} style={{ borderColor: "var(--c-disabled)", borderStyle: "solid", borderWidth: "1px" }}>
                <span style={mono(12, 16, "var(--c-text)", { letterSpacing: "0.06em", width: "max-content" })}>
                  {p.cta} <span className="arrow">→</span>
                </span>
              </Link>
            </Magnetic>
          </div>
        ))}
      </div>
    </RevealScope>
  );
}

const COMMITS = [
  ["COMMITMENT 01", "Approval gate", "Every agent has an approval queue. Nothing leaves without your team."],
  ["COMMITMENT 02", "Full audit", "Two synced logs. Every input, output and decision, append-only."],
  ["COMMITMENT 03", "Data discipline", "Sensitive fields stripped before the model. PII never reaches it."],
];

export function Commitments() {
  return (
    <RevealScope className={css.band}>
      {COMMITS.map(([k, t, b], i) => (
        <div key={k} className={css.commit} data-reveal="" data-delay={String(i * 0.1)}>
          <div style={mono(11, 14, "var(--c-faint)")}>{k}</div>
          <div style={sans(24, 30, "var(--c-band-text)")}>{t}</div>
          <div style={sans(15, 23, "#C9C9C3")}>{b}</div>
        </div>
      ))}
    </RevealScope>
  );
}
