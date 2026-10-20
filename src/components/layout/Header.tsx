"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useLenis } from "@/components/providers/SmoothScroll";

const mono = "var(--font-mono)";
const sans = "var(--font-sans)";

const NAV = [
  { n: "01", label: "Platform", href: "/platform", menu: true },
  { n: "02", label: "Governance", href: "/governance" },
  { n: "03", label: "How it works", href: "/how-it-works" },
  { n: "04", label: "Case studies", href: "/case-studies" },
  { n: "05", label: "About", href: "/about" },
];

const MENU = [
  { icon: "4V6GAMD9SG25HC6Q6XXRQQGYCA.svg", title: "Build", sub: "One agent per job, scoped tools", hash: "build" },
  { icon: "20TQV9QV0HWBBGHZEYMFT7JAKZ.svg", title: "Approve", sub: "Every draft waits for your team", hash: "approve" },
  { icon: "1JME28A1JQF34JMPRWFQF6ZM41.svg", title: "Govern", sub: "Rules before generation", hash: "govern" },
  { icon: "7PZE67JMNQH12TX4V4E6NEYR6X.svg", title: "Audit", sub: "Append-only, two synced logs", hash: "audit" },
  { icon: "2HBVKMSKFAGDW7J1QFTGAX5AX0.svg", title: "Integrate", sub: "Email, CRM, support, APIs", hash: "integrate" },
  { icon: "5JA4C2FFGX8H9HME80DZ32AB5V.svg", title: "Operate + measure", sub: "Runtime, reports, edit rate", hash: "operate" },
];

const label11: React.CSSProperties = { fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", lineHeight: "14px" };

function StatusStrip() {
  const { theme, setTheme } = useTheme();
  const [deploys, setDeploys] = useState(14);

  // Live-feeling counter: occasionally ticks between 14 and 15.
  useEffect(() => {
    const id = window.setInterval(() => setDeploys((d) => (d === 14 && Math.random() > 0.6 ? 15 : 14)), 4000);
    return () => window.clearInterval(id);
  }, []);

  const toggle = (t: "light" | "dark") => (e: React.MouseEvent) => setTheme(t, { x: e.clientX, y: e.clientY });

  return (
    <div style={{ backgroundColor: "var(--c-bg-alt)", borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "center", width: "100%" }}>
      <div className="col r-pad" style={{ alignItems: "center", borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", display: "flex", height: 32, justifyContent: "space-between", paddingInline: 20 }}>
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
            <motion.div
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundColor: "var(--color-phase-run)", height: 6, width: 6 }}
            />
            <div style={{ ...label11, color: "var(--c-text)" }}>ALL SYSTEMS NORMAL</div>
          </div>
          <div className="r-hide" style={{ ...label11, color: "var(--c-faint)" }}>/</div>
          <div className="r-hide" style={{ ...label11, color: "var(--c-muted)", display: "flex" }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={deploys} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.35 }}>
                {deploys}
              </motion.span>
            </AnimatePresence>
            &nbsp;DEPLOYMENTS LIVE
          </div>
          <div className="r-hide" style={{ ...label11, color: "var(--c-faint)" }}>/</div>
          <div className="r-hide" style={{ ...label11, color: "var(--c-muted)" }}>0 B EGRESS THIS WEEK</div>
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <a href="#" className="r-hide link-underline" style={{ alignItems: "center", display: "flex", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" fill="none" stroke="var(--c-muted)" strokeWidth="2" strokeLinecap="square" />
            </svg>
            <div style={{ ...label11, color: "var(--c-muted)" }}>TRUST CENTER ↗</div>
          </a>
          <div className="r-hide" style={{ alignItems: "center", display: "flex", gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" fill="none" stroke="var(--c-muted)" strokeWidth="2" />
              <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="var(--c-muted)" strokeWidth="2" />
            </svg>
            <div style={{ ...label11, color: "var(--c-text)" }}>EN</div>
            <div style={{ ...label11, color: "var(--c-faint)" }}>/ BN</div>
          </div>
          <div role="radiogroup" aria-label="Theme" style={{ border: "1px solid var(--c-border)", display: "flex", position: "relative" }}>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              style={{ position: "absolute", top: 0, bottom: 0, width: 24, left: theme === "light" ? 0 : 24, backgroundColor: "var(--c-text)" }}
            />
            <button role="radio" aria-checked={theme === "light"} aria-label="Light theme" onClick={toggle("light")} style={{ alignItems: "center", display: "flex", height: 20, justifyContent: "center", width: 24, position: "relative" }}>
              <motion.svg width="11" height="11" viewBox="0 0 24 24" animate={{ rotate: theme === "light" ? 0 : -90 }} transition={{ duration: 0.6 }}>
                <circle cx="12" cy="12" r="4" fill="none" stroke={theme === "light" ? "var(--c-bg)" : "var(--c-muted)"} strokeWidth="2.4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke={theme === "light" ? "var(--c-bg)" : "var(--c-muted)"} strokeWidth="2.4" strokeLinecap="square" />
              </motion.svg>
            </button>
            <button role="radio" aria-checked={theme === "dark"} aria-label="Dark theme" onClick={toggle("dark")} style={{ alignItems: "center", display: "flex", height: 20, justifyContent: "center", width: 24, position: "relative" }}>
              <motion.svg width="11" height="11" viewBox="0 0 24 24" animate={{ rotate: theme === "dark" ? 0 : 40 }} transition={{ duration: 0.6 }}>
                <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="none" stroke={theme === "dark" ? "var(--c-bg)" : "var(--c-muted)"} strokeWidth="2.4" strokeLinecap="square" />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="col r-stack"
      style={{ backgroundColor: "var(--c-surface)", border: "1px solid var(--c-border)", borderTop: 0, display: "flex", position: "absolute", top: "100%", left: "50%", translate: "-50% 0", zIndex: 50 }}
    >
      <div style={{ borderRight: "1px solid var(--c-line)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", flexGrow: 1 }}>
        {MENU.map((m, i) => (
          <motion.div key={m.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <Link
              href={`/platform#${m.hash}`}
              onClick={onClose}
              className="hover-row"
              style={{
                display: "flex",
                gap: 14,
                padding: "32px 24px",
                height: "100%",
                minHeight: 164,
                borderRight: i % 3 !== 2 ? "1px solid var(--c-line)" : undefined,
                borderBottom: i < 3 ? "1px solid var(--c-line)" : undefined,
              }}
            >
              <motion.img whileHover={{ scale: 1.15, rotate: -6 }} src={`/assets/${m.icon}`} alt="" width={28} height={28} style={{ flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: 16, lineHeight: "20px" }}>{m.title}</div>
                <div style={{ color: "var(--c-muted)", fontFamily: sans, fontSize: 13, lineHeight: "19px" }}>{m.sub}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <Link href="/platform" onClick={onClose} className="r-hide" style={{ backgroundColor: "var(--c-band)", display: "flex", flexDirection: "column", gap: 16, justifyContent: "space-between", padding: 24, width: 320, flexShrink: 0 }}>
        <div style={{ color: "#9C9C96", fontFamily: mono, fontSize: 11, lineHeight: "14px" }}>FEATURED</div>
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          src="/assets/3ZM8TTHEWYG6A6EJJXY21RCTCW.png"
          alt="Isometric view of the platform"
          style={{ height: 160, width: 272 }}
        />
        <div style={{ color: "#F2F2EE", fontFamily: sans, fontSize: 16, lineHeight: "22px" }}>See the full platform tour, layer by layer.</div>
        <div style={{ color: "#D6F25C", fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", lineHeight: "14px" }}>
          OPEN PLATFORM <span className="arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      onClick={(e) => setTheme(theme === "light" ? "dark" : "light", { x: e.clientX, y: e.clientY })}
      style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--c-line)" }}
    >
      <motion.svg key={theme} initial={{ rotate: -90, scale: 0.5 }} animate={{ rotate: 0, scale: 1 }} width="16" height="16" viewBox="0 0 24 24">
        {theme === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" fill="none" stroke="var(--c-text)" strokeWidth="2.2" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="var(--c-text)" strokeWidth="2.2" strokeLinecap="square" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" fill="none" stroke="var(--c-text)" strokeWidth="2.2" />
        )}
      </motion.svg>
    </button>
  );
}

/** Below 1100px: compact 60px bar + full-screen menu. */
function MobileBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  const links = [...NAV.map((n) => ({ n: n.n, label: n.label, href: n.href })), { n: "06", label: "FAQ", href: "/faq" }];

  return (
    <div className="hdr-mobile" style={{ flexDirection: "column" }}>
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: 16, borderBottom: "1px solid var(--c-line)", backgroundColor: "var(--c-bg)", position: "relative", zIndex: 2 }}>
        <Link href="/" aria-label="AI Deployed home" style={{ display: "flex", alignItems: "center" }}>
          <img className="logo-img" src="/assets/21WHKV5S9R1CK1KZ1Z98EX10RY.png" alt="AI Deployed" width={112} height={24} />
        </Link>
        <div style={{ display: "flex", gap: 8 }}>
          <ThemeSwitch />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{ width: 44, height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: open ? "var(--c-text)" : "var(--c-accent)" }}
          >
            <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} style={{ width: 18, height: 2, background: open ? "var(--c-bg)" : "#fff", display: "block" }} />
            <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} style={{ width: 18, height: 2, background: open ? "var(--c-bg)" : "#fff", display: "block" }} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "fixed", top: 60, left: 0, right: 0, bottom: 0, backgroundColor: "var(--c-bg)", overflowY: "auto", display: "flex", flexDirection: "column" }}
          >
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {links.map((l, i) => {
                const active = pathname === l.href || pathname.startsWith(l.href + "/");
                return (
                  <motion.div key={l.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Link href={l.href} style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "18px 20px", borderBottom: "1px solid var(--c-line)" }}>
                      <span style={{ fontFamily: mono, fontSize: 11, color: active ? "var(--c-accent-text)" : "var(--c-faint)" }}>{l.n}</span>
                      <span style={{ fontFamily: sans, fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "var(--c-text)" }}>{l.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, marginTop: "auto" }}>
              <Link href="/contact" className="btn btn-primary" style={{ backgroundColor: "var(--c-accent)", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#fff", fontFamily: sans, fontSize: 16, fontWeight: 500 }}>Start a conversation</span>
                <span className="arrow" style={{ color: "#fff" }}>↗</span>
              </Link>
              <div style={{ ...label11, color: "var(--c-muted)", display: "flex", justifyContent: "space-between" }}>
                <span>● ALL SYSTEMS NORMAL</span>
                <span>EN / BN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();

  useEffect(() => setOpen(false), [pathname]);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "var(--c-bg)" }}
        onMouseLeave={() => setOpen(false)}
      >
        <MobileBar />
        <div className="hdr-desktop">
        <StatusStrip />
        <div style={{ borderBottom: "1px solid var(--c-line)", display: "flex", justifyContent: "center", width: "100%", position: "relative" }}>
          <div className="col" style={{ borderLeft: "1px solid var(--c-line)", borderRight: "1px solid var(--c-line)", display: "flex", height: 68 }}>
            <Link href="/" aria-label="AI Deployed home" style={{ alignItems: "center", borderRight: "1px solid var(--c-line)", display: "flex", paddingInline: 24, width: 220, flexShrink: 0 }}>
              <motion.img whileHover={{ scale: 1.04 }} className="logo-img" src="/assets/21WHKV5S9R1CK1KZ1Z98EX10RY.png" alt="AI Deployed" width={140} height={30} />
            </Link>
            <nav className="r-hide" style={{ display: "flex", flexGrow: 1 }}>
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/") || (item.menu && open);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setOpen(!!item.menu)}
                    onClick={(e) => {
                      if (item.menu && !open) {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                    style={{ alignItems: "center", borderRight: "1px solid var(--c-line)", display: "flex", gap: 8, paddingInline: 18, position: "relative" }}
                    className="hover-row"
                  >
                    <div style={{ color: active ? "var(--c-accent-text)" : "var(--c-faint)", fontFamily: mono, fontSize: 10, lineHeight: "12px" }}>{item.n}</div>
                    <div style={{ color: "var(--c-text)", fontFamily: sans, fontSize: 15, lineHeight: "18px", width: "max-content" }}>{item.label}</div>
                    {item.menu && (
                      <motion.svg width="10" height="10" viewBox="0 0 24 24" animate={{ rotate: open ? 180 : 0 }}>
                        <path d="M6 9l6 6 6-6" fill="none" stroke="var(--c-text)" strokeWidth="2.4" strokeLinecap="square" />
                      </motion.svg>
                    )}
                    {active && (
                      <motion.div layoutId="nav-active" style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, backgroundColor: "var(--c-accent)" }} transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                    )}
                  </Link>
                );
              })}
            </nav>
            <div style={{ flexGrow: 1 }} />
            <Link href="/contact" className="btn btn-primary" style={{ backgroundColor: "var(--c-accent)", display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", paddingInline: 22, width: 230, flexShrink: 0 }}>
              <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#FFFFFF", fontFamily: sans, fontSize: 15, fontWeight: 500, lineHeight: "18px" }}>Start a conversation</div>
                <svg className="arrow" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </div>
              <div style={{ color: "#C9CCF5", fontFamily: mono, fontSize: 10, letterSpacing: "0.06em", lineHeight: "12px" }}>WITH AN ENGINEER · 30 MIN</div>
            </Link>
          </div>
          <AnimatePresence>{open && <MegaMenu onClose={() => setOpen(false)} />}</AnimatePresence>
        </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 90, background: "color-mix(in srgb, var(--c-text) 12%, transparent)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>
      <div style={{ height: "var(--header-h)" }} />
    </>
  );
}
