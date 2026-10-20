import type { CSSProperties, ReactNode } from "react";
import { RevealScope } from "@/components/motion/Reveal";
import s from "./platform.module.css";

export const mono = (size: number, lh: number, color: string, extra?: CSSProperties): CSSProperties => ({
  boxSizing: "border-box",
  color,
  display: "inline-block",
  fontFamily: "var(--font-mono)",
  fontSize: `${size}px`,
  lineHeight: `${lh}px`,
  ...extra,
});
export const sans = (size: number, lh: number, color: string, extra?: CSSProperties): CSSProperties => ({
  boxSizing: "border-box",
  color,
  display: "inline-block",
  fontFamily: "var(--font-sans)",
  fontSize: `${size}px`,
  lineHeight: `${lh}px`,
  ...extra,
});

export const sectionBase: CSSProperties = {
  borderBottom: "1px solid var(--c-line)",
  borderLeft: "1px solid var(--c-line)",
  borderRight: "1px solid var(--c-line)",
  boxSizing: "border-box",
  fontSize: "12px",
  lineHeight: "16px",
  overflowWrap: "anywhere",
};

/** Left/right copy column used by Build/Approve/Govern/Audit. */
export function CopyCol({
  eyebrow,
  title,
  body,
  children,
  borderRight,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
  borderRight?: boolean;
}) {
  return (
    <div className={s.copy} style={{ borderRight: borderRight ? "1px solid var(--c-line)" : undefined, boxSizing: "border-box" }}>
      <div data-reveal="" style={mono(11, 14, "var(--c-accent-text)", { letterSpacing: "0.06em" })}>
        {eyebrow}
      </div>
      <h2 data-split="" className={s.h2} style={{ color: "var(--c-text)", fontFamily: "var(--font-sans)", letterSpacing: "-0.025em", margin: 0, fontWeight: "inherit" }}>
        {title}
      </h2>
      <div data-reveal="" data-delay="0.1" style={sans(16, 25, "var(--c-muted)")}>
        {body}
      </div>
      {children}
    </div>
  );
}

export function IconList({ items }: { items: { icon: string; label: string }[] }) {
  return (
    <div data-reveal-stagger="" style={{ borderTop: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      {items.map((it) => (
        <div
          key={it.label}
          className="hover-row"
          style={{ alignItems: "center", borderBottom: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", gap: "12px", paddingBlock: "12px" }}
        >
          <div
            style={{
              backgroundImage: `url(${it.icon})`,
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              boxSizing: "border-box",
              flexShrink: 0,
              height: "24px",
              width: "24px",
            }}
          />
          <div style={sans(15, 18, "var(--c-text)")}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

/** Anchor-able 1280 section with reveal scope. */
export function Section({ id, children, style, reverse }: { id: string; children: ReactNode; style?: CSSProperties; reverse?: boolean }) {
  return (
    <section id={id} className={`col ${s.section}`}>
      <RevealScope className={`${s.row} ${reverse ? s.rowRev : ""}`} style={{ ...sectionBase, ...style }}>
        {children}
      </RevealScope>
    </section>
  );
}
