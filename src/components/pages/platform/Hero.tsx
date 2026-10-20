import { RevealScope } from "@/components/motion/Reveal";
import s from "./platform.module.css";
import { mono, sans } from "./ui";

export function PlatformHero() {
  return (
    <RevealScope
      className="col"
      style={{
        borderLeft: "1px solid var(--c-line)",
        borderRight: "1px solid var(--c-line)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        fontSize: "12px",
        lineHeight: "16px",
        overflowWrap: "anywhere",
      }}
    >
      <div
        className={s.heroRow}
        style={{ boxSizing: "border-box" }}
      >
        <div className={s.heroLeft} style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div data-reveal="" style={{ alignItems: "center", boxSizing: "border-box", display: "flex", gap: "10px" }}>
            <div style={{ backgroundColor: "var(--c-accent)", boxSizing: "border-box", flexShrink: 0, height: "6px", width: "6px" }} />
            <div style={mono(12, 16, "var(--c-muted)", { letterSpacing: "0.06em" })}>PLATFORM</div>
          </div>
          <h1
            data-split=""
            className={s.h1}
            style={{ color: "var(--c-text)", fontFamily: "var(--font-sans)", letterSpacing: "-0.035em", margin: 0, fontWeight: "inherit", boxSizing: "border-box" }}
          >
            One platform for building, running and governing AI agents.
          </h1>
        </div>
        <div data-reveal="" data-delay="0.3" className={s.heroLead} style={{ boxSizing: "border-box", display: "inline-block", paddingBottom: "8px" }}>
          <div style={sans(17, 26, "var(--c-muted)")}>
            Each agent is scoped to one job, runs against your data, and operates under an approval gate you control. Runtime, policy and audit, handled.
          </div>
        </div>
      </div>
    </RevealScope>
  );
}
