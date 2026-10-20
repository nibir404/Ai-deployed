import { RevealScope } from "@/components/motion/Reveal";
import s from "./CaseStudies.module.css";

export function CasesHero() {
  return (
    <RevealScope
      className={`col ${s.hero}`}
      style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", fontSize: "12px", lineHeight: "16px" }}
    >
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px", minWidth: 0 }}>
        <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          <div style={{ backgroundColor: "var(--c-accent)", flexShrink: "0", height: "6px", width: "6px" }} />
          <div style={{ color: "var(--c-muted)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.06em", lineHeight: "16px" }}>CASE STUDIES</div>
          <div style={{ border: "1px dashed #B8781A", display: "inline-block", paddingBlock: "2px", paddingInline: "6px" }}>
            <div style={{ color: "#B8781A", fontFamily: "var(--font-mono)", fontSize: "10px", lineHeight: "12px" }}>SAMPLE DATA</div>
          </div>
        </div>
        <h1 data-split="" className={s.heroTitle} style={{ color: "var(--c-text)", fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: "-0.035em", margin: 0 }}>
          One job each. Measured in production.
        </h1>
      </div>
      <div className={s.heroAside} data-reveal="" data-delay="0.2" style={{ boxSizing: "border-box" }}>
        <div style={{ color: "var(--c-muted)", fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: "26px" }}>
          Every case shows the agent, the approval mode, and how the edit rate moved after launch.
        </div>
      </div>
    </RevealScope>
  );
}
