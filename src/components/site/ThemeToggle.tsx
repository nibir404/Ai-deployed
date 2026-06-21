"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("aid-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("aid-theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-2",
        className,
      )}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      <span aria-hidden className="inline-block size-1.5 bg-current" />
      {isLight ? "Light" : "Dark"}
    </button>
  );
}
