"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import s from "./platform.module.css";
import { mono } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const TABS = ["build", "approve", "govern", "audit", "integrate", "operate", "measure"] as const;

export function TabBar() {
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);

  // Keep the active tab visible when the strip scrolls horizontally (mobile/tablet).
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.children[active] as HTMLElement | undefined;
    if (!nav || !btn || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  useGSAP(() => {
    const line = () => (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 102) + 68;
    const topLine = () => `top ${line()}px`;
    const bottomLine = () => `bottom ${line()}px`;
    const triggers: ScrollTrigger[] = [];
    TABS.slice(0, 4).forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: topLine,
          end: bottomLine,
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
    });
    // 05–07 share one row: split its scroll range into thirds.
    const row = document.getElementById("integrate")?.parentElement;
    if (row) {
      let third = -1;
      triggers.push(
        ScrollTrigger.create({
          trigger: row,
          start: topLine,
          end: bottomLine,
          onUpdate: (self) => {
            // only re-render when the third changes, not every scroll frame
            const next = 4 + Math.min(2, Math.floor(self.progress * 3));
            if (self.isActive && next !== third) setActive((third = next));
          },
          onToggle: (self) => {
            third = -1;
            if (self.isActive) setActive((third = 4 + Math.min(2, Math.floor(self.progress * 3))));
          },
        }),
      );
    }
    // Before the Build section, keep 01 highlighted.
    const first = document.getElementById("build");
    if (first) {
      triggers.push(ScrollTrigger.create({ trigger: first, start: topLine, onLeaveBack: () => setActive(0) }));
    }
    return () => triggers.forEach((t) => t.kill());
  });

  const go = (i: number) => {
    const el = document.getElementById(TABS[i]);
    if (!el) return;
    setActive(i);
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 102;
    const offset = -(headerH + (navRef.current?.offsetHeight ?? 50) - 2);
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    history.replaceState(null, "", `#${TABS[i]}`);
  };

  return (
    <nav
      aria-label="Platform sections"
      ref={navRef}
      data-lenis-prevent=""
      className={`col ${s.tabs}`}
      style={{
        borderTop: "1px solid var(--c-line)",
        borderBottom: "1px solid var(--c-line)",
        borderLeft: "1px solid var(--c-line)",
        borderRight: "1px solid var(--c-line)",
        boxSizing: "border-box",
        display: "flex",
      }}
    >
      {TABS.map((id, i) => {
        const on = active === i;
        return (
          <button
            key={id}
            type="button"
            className={s.tab}
            aria-current={on ? "true" : undefined}
            onClick={() => go(i)}
            style={{
              alignItems: "center",
              borderRight: i < TABS.length - 1 ? "1px solid var(--c-line)" : undefined,
              boxSizing: "border-box",
              display: "flex",
              flexBasis: "0%",
              flexGrow: 1,
              gap: "8px",
              paddingBlock: "16px",
              paddingInline: "20px",
            }}
          >
            {on && <motion.div layoutId="platform-tab" className={s.tabFill} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
            <div style={mono(10, 12, "var(--c-faint)", { position: "relative" })}>{String(i + 1).padStart(2, "0")}</div>
            <div
              style={mono(12, 16, on ? "var(--c-band-text)" : "var(--c-text)", {
                letterSpacing: "0.06em",
                position: "relative",
                transition: "color .25s",
              })}
            >
              {id.toUpperCase()}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
