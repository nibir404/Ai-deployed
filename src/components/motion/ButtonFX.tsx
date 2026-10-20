"use client";

import { useEffect } from "react";

const COLORS = ["#D6F25C", "#3B43D6", "#E8A23A", "#3FA9A0", "#8B6CF0"];

/**
 * Global hover behaviour for every `.btn`: records the entry point so the fill
 * grows from the pointer, and throws a few pixel sparks from the corner.
 */
export function ButtonFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const setOrigin = (btn: HTMLElement, e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const sparks = (btn: HTMLElement) => {
      if (reduce || !fine) return;
      const r = btn.getBoundingClientRect();
      const ox = r.right - 3;
      const oy = r.top + 3;
      for (let i = 0; i < 7; i++) {
        const s = document.createElement("span");
        s.className = "btn-spark";
        s.style.left = `${ox}px`;
        s.style.top = `${oy}px`;
        s.style.background = COLORS[i % COLORS.length];
        document.body.appendChild(s);
        const ang = -Math.PI / 2 + (Math.random() - 0.2) * 1.6;
        const dist = 18 + Math.random() * 26;
        // Snap to a 4px grid so the sparks move like pixels, not particles.
        const dx = Math.round((Math.cos(ang) * dist) / 4) * 4;
        const dy = Math.round((Math.sin(ang) * dist) / 4) * 4;
        s.animate(
          [
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0 },
          ],
          { duration: 520 + Math.random() * 260, easing: "steps(6, end)", delay: i * 18 },
        ).onfinish = () => s.remove();
      }
    };

    const over = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest?.(".btn") as HTMLElement | null;
      if (!btn) return;
      const from = e.relatedTarget as Node | null;
      if (from && btn.contains(from)) return;
      setOrigin(btn, e);
      sparks(btn);
    };
    const out = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest?.(".btn") as HTMLElement | null;
      if (!btn) return;
      const to = e.relatedTarget as Node | null;
      if (to && btn.contains(to)) return;
      setOrigin(btn, e); // fill retracts toward the exit point
    };

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return null;
}
