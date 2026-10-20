"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevealScope } from "@/components/motion/Reveal";
import { useLenis } from "@/components/providers/SmoothScroll";
import css from "./Legal.module.css";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

export type LegalSection = { id: string; title: string; body?: string; email?: string };
export type LegalDoc = {
  kind: "privacy" | "terms";
  title: string;
  updated: string;
  readTime: string;
  summary: string;
  sections: LegalSection[];
};

const DOCS = [
  { kind: "privacy", label: "Privacy policy", href: "/privacy" },
  { kind: "terms", label: "Terms of service", href: "/terms" },
] as const;

const SHIELD = "/assets/1JME28A1JQF34JMPRWFQF6ZM41.svg";

export function LegalLayout({ doc }: { doc: LegalDoc }) {
  const lenis = useLenis();
  const [active, setActive] = useState(doc.sections[0].id);

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let cur = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = els[els.length - 1]?.id;
      if (cur) setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [doc.sections]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const off = window.innerWidth < 1100 ? 130 : 120;
    if (lenis) lenis.scrollTo(el, { offset: -off });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: "smooth" });
    document.querySelector(`[data-toc="${id}"]`)?.scrollIntoView({ block: "nearest", inline: "center" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <RevealScope className={`col ${css.wrap}`} style={{ borderBottom: "1px solid var(--c-line)", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", boxSizing: "border-box", display: "flex", fontSize: "12px", lineHeight: "16px", overflowWrap: "anywhere" }}>
      {/* Sidebar */}
      <aside className={css.aside} style={{ borderRight: "1px solid var(--c-line)", boxSizing: "border-box", flexShrink: 0, paddingBlock: "96px", paddingInline: "40px", width: "340px" }}>
        <div className={css.sticky} data-lenis-prevent="" style={{ position: "sticky", top: "128px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className={css.legalLabel} style={{ color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>LEGAL</div>
          <nav className={css.docs} style={{ borderTop: "1px solid var(--c-line)", display: "flex", flexDirection: "column" }}>
            {DOCS.map((d) => {
              const on = d.kind === doc.kind;
              return (
                <Link key={d.kind} href={d.href} className="hover-row" style={{ borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBlock: "12px", textDecoration: "none" }}>
                  <span style={{ color: on ? "var(--c-accent-text)" : "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "18px" }}>{d.label}</span>
                  {on && (
                    <motion.span layoutId="legal-dot" transition={{ type: "spring", stiffness: 400, damping: 30 }} style={{ color: "var(--c-accent-text)", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>
                      ●
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className={css.tocLabel} style={{ paddingTop: "16px", color: "var(--c-muted)", fontFamily: mono, fontSize: "11px", letterSpacing: "0.06em", lineHeight: "14px" }}>ON THIS PAGE</div>
          <div className={css.toc} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {doc.sections.map((s) => {
              const on = active === s.id;
              return (
                <a key={s.id} data-toc={s.id} href={`#${s.id}`} onClick={jump(s.id)} style={{ position: "relative", color: on ? "var(--c-text)" : "var(--c-muted)", fontFamily: sans, fontSize: "14px", lineHeight: "18px", textDecoration: "none", transition: "color .25s, transform .25s", transform: on ? "translateX(10px)" : "none" }}>
                  {on && <motion.span layoutId="legal-toc" style={{ position: "absolute", left: "-10px", top: "6px", width: "4px", height: "6px", background: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Content */}
      <article className={css.article} style={{ boxSizing: "border-box", display: "flex", flexBasis: "0%", flexDirection: "column", flexGrow: 1, gap: "48px", paddingBottom: "120px", paddingInline: "72px", paddingTop: "96px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1 data-split="" className={css.h1} style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: "56px", letterSpacing: "-0.035em", lineHeight: "60px" }}>{doc.title}</h1>
          <div data-reveal="" style={{ display: "flex", gap: "16px", fontFamily: mono, fontSize: "11px", lineHeight: "14px" }}>
            <span style={{ color: "var(--c-muted)" }}>{doc.updated}</span>
            <span style={{ color: "var(--c-faint)" }}>·</span>
            <span style={{ color: "var(--c-muted)" }}>{doc.readTime}</span>
          </div>
        </div>
        <div data-reveal="" style={{ backgroundColor: "var(--c-bg-alt)", borderLeft: "3px solid var(--c-accent)", boxSizing: "border-box", display: "flex", gap: "16px", padding: "20px", maxWidth: "680px" }}>
          <div style={{ backgroundImage: `url(${SHIELD})`, backgroundPosition: "50%", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", flexShrink: 0, height: "24px", width: "24px" }} />
          <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: "15px", lineHeight: "24px" }}>{doc.summary}</div>
        </div>
        {doc.sections.map((s, i) => {
          const last = i === doc.sections.length - 1;
          return (
            <section key={s.id} id={s.id} data-reveal="" style={{ scrollMarginTop: "120px", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px", ...(last ? { borderTop: "1px solid var(--c-line)", paddingTop: "24px" } : {}) }}>
              <h2 style={{ margin: 0, fontWeight: 400, color: "var(--c-text)", fontFamily: sans, fontSize: "24px", letterSpacing: "-0.02em", lineHeight: "30px" }}>{s.title}</h2>
              {s.body && <p style={{ margin: 0, color: "var(--c-muted)", fontFamily: sans, fontSize: "16px", lineHeight: "27px" }}>{s.body}</p>}
              {s.email && (
                <a className="link-underline" href={`mailto:${s.email}`} style={{ alignSelf: "start", color: "var(--c-text)", fontFamily: mono, fontSize: "13px", lineHeight: "16px", textDecoration: "none" }}>
                  {s.email}
                </a>
              )}
              {last && (
                <div style={{ alignSelf: "start", border: "1px dashed #B8781A", paddingBlock: "3px", paddingInline: "6px", color: "#B8781A", fontFamily: mono, fontSize: "10px", lineHeight: "12px" }}>
                  PLACEHOLDER COPY · LEGAL REVIEW NEEDED
                </div>
              )}
            </section>
          );
        })}
      </article>
    </RevealScope>
  );
}
