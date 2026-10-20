import { RevealScope } from "@/components/motion/Reveal";
import { mono, sans } from "./styles";
import css from "./HowItWorks.module.css";

const P = [
  ["01", "Embedded", "We sit with your team. Knowledge transfer is built in by design."],
  ["02", "Outcome-defined", "Measured by operational outcome, not deliverables shipped."],
  ["03", "Vendor-neutral", "Right technology for the problem. No preferred platforms."],
  ["04", "Time-bound", "Each phase has a clear exit. We are not the right fit for every business."],
];

export function Principles() {
  return (
    <RevealScope className={css.sec} style={{ display: "flex", flexDirection: "column" }}>
      <div className={css.teamHead} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div data-reveal="" style={mono(11, 14, "var(--c-muted)", { letterSpacing: "0.06em" })}>/ PRINCIPLES</div>
        <h2 data-split className={css.h2} style={{ color: "var(--c-text)", fontFamily: 'var(--font-sans)' }}>
          How we work, regardless of phase.
        </h2>
      </div>
      <div className={css.pGrid} data-reveal-stagger="">
        {P.map(([n, t, b]) => (
          <div key={n} className={css.pcard}>
            <div style={mono(11, 14, "var(--c-accent)")}>{n}</div>
            <div style={sans(22, 28, "var(--c-text)")}>{t}</div>
            <div style={sans(15, 23, "var(--c-muted)")}>{b}</div>
          </div>
        ))}
      </div>
    </RevealScope>
  );
}
