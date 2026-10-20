import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { RevealScope } from "@/components/motion/Reveal";
import { CaseStory, ReadingProgress } from "@/components/pages/case-studies/CaseStory";
import s from "@/components/pages/case-studies/CaseStudies.module.css";

export const metadata = { title: "Customer-reply agent · Case study · AI Deployed" };

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const META = [
  ["CLIENT", "800-person freight carrier"],
  ["ENVIRONMENT", "On-prem · EU"],
  ["APPROVAL MODE", "Review before send"],
  ["IN PRODUCTION", "Week 4"],
];

const STATS: [string, string, string][] = [
  ["52%", "LESS TRIAGE TIME", "var(--c-band-text)"],
  ["7%", "MISROUTED, FROM 31%", "var(--c-band-text)"],
  ["9%", "EDIT RATE BY WEEK 7", "#6A71F2"],
];

export default function CustomerReplyAgentPage() {
  return (
    <PageShell>
      <ReadingProgress />
      <RevealScope
        className={`col ${s.caseHero}`}
        style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "28px", fontSize: "12px", lineHeight: "16px" }}
      >
        <nav aria-label="Breadcrumb" data-reveal="" className={s.chips}>
          <Link href="/case-studies" className="link-underline" style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>
            ← CASE STUDIES
          </Link>
          <span style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>/</span>
          <span style={{ color: "var(--c-text)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>SUPPORT · LOGISTICS</span>
          <span style={{ border: "1px dashed #B8781A", paddingBlock: "2px", paddingInline: "6px", color: "#B8781A", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>SAMPLE DATA</span>
        </nav>
        <h1 data-split="" className={s.caseTitle} style={{ color: "var(--c-text)", fontFamily: sans, fontWeight: 400, letterSpacing: "-0.035em", margin: 0 }}>
          A customer-reply agent that cut triage time in half.
        </h1>
        <div className={s.meta} data-reveal-stagger="" style={{ borderTop: "1px solid var(--c-line)", boxSizing: "border-box" }}>
          {META.map(([k, v], i) => (
            <div key={k} className={s.metaCell} style={{ borderRight: i < 3 ? "1px solid var(--c-line)" : "none", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ color: "var(--c-faint)", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>{k}</div>
              <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "16px", lineHeight: "20px" }}>{v}</div>
            </div>
          ))}
        </div>
      </RevealScope>

      <RevealScope
        className={`col ${s.band}`}
        style={{ backgroundColor: "var(--c-band)", borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box" }}
      >
        {STATS.map(([n, l, c], i) => (
          <div key={l} data-reveal="" data-delay={String(i * 0.1)} className={s.bandCell} style={{ borderRight: i < 2 ? "1px solid var(--c-band-line)" : "none", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div data-count="" className={s.bandNum} style={{ color: c, fontFamily: sans, letterSpacing: "-0.04em" }}>{n}</div>
            <div style={{ color: "#9C9C96", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>{l}</div>
          </div>
        ))}
      </RevealScope>

      <RevealScope className="full" style={{ display: "flex", justifyContent: "center" }}>
        <CaseStory />
      </RevealScope>
    </PageShell>
  );
}
