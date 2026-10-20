import Link from "next/link";
import { RevealScope } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { mono, sans } from "./styles";
import s from "./HowItWorks.module.css";

export function Hero() {
  return (
    <RevealScope className={s.hero}>
      <div style={{ boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" }}>
        <div data-reveal="" style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          <div style={{ backgroundColor: "var(--c-accent)", flexShrink: 0, height: "6px", width: "6px" }} />
          <div style={mono(12, 16, "var(--c-muted)", { letterSpacing: "0.06em" })}>HOW IT WORKS</div>
        </div>
        <h1 data-split className={s.heroH1} style={{ color: "var(--c-text)", fontFamily: 'var(--font-sans)' }}>
          From first conversation to operational ownership.
        </h1>
      </div>
      <div data-reveal="" data-delay="0.2" className={s.heroAside}>
        <div style={sans(17, 26, "var(--c-muted)")}>
          Four steps. Running in production by week four. After that we run the agent and tune it as your business changes.
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Magnetic>
            <Link href="/contact" className={`btn btn-primary ${s.cta}`} style={{ alignItems: "center", backgroundColor: "var(--c-accent)", display: "flex", paddingInline: "16px" }}>
              <span style={mono(12, 16, "#FFFFFF", { letterSpacing: "0.06em", width: "max-content" })}>
                START A CONVERSATION <span className="arrow">→</span>
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </RevealScope>
  );
}
