"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme, origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<Ctx>({ theme: "light", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

// Runs before paint (injected in <head>) so there is no flash of the wrong theme.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('aid-theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("aid-theme", t);
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState((document.documentElement.dataset.theme as Theme) || "light");
  }, []);

  const setTheme = useCallback(
    (next: Theme, origin?: { x: number; y: number }) => {
      if (next === theme) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
      };

      const commit = () => {
        flushSync(() => setThemeState(next));
        apply(next);
      };

      if (!doc.startViewTransition || reduce) {
        const html = document.documentElement;
        html.classList.add("theme-fading");
        commit();
        window.setTimeout(() => html.classList.remove("theme-fading"), 650);
        return;
      }

      const x = origin?.x ?? window.innerWidth - 120;
      const y = origin?.y ?? 16;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      const vt = doc.startViewTransition(commit);
      // A second toggle mid-animation aborts the first transition; that's expected, not an error.
      vt.finished.catch(() => {});
      vt.ready.then(() => {
        // Stepped radius gives the reveal a pixel-grid feel that matches the brand.
        const steps = 14;
        const frames = Array.from({ length: steps + 1 }, (_, i) => {
          const p = i / steps;
          const eased = 1 - Math.pow(1 - p, 3);
          const rad = Math.round((eased * r) / 24) * 24;
          return { clipPath: `circle(${rad}px at ${x}px ${y}px)` };
        });
        document.documentElement.animate(frames, {
          duration: 900,
          easing: "steps(1, end)",
          pseudoElement: "::view-transition-new(root)",
        } as KeyframeAnimationOptions);
        // Old snapshot dims slightly while the new theme sweeps in.
        document.documentElement.animate(
          [{ filter: "brightness(1)" }, { filter: "brightness(0.85)" }],
          { duration: 900, easing: "ease-out", pseudoElement: "::view-transition-old(root)" } as KeyframeAnimationOptions,
        );
      }).catch(() => {});
    },
    [theme],
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
