"use client";

import { useId, useState, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultId?: string;
  className?: string;
  ariaLabel?: string;
  /**
   * Visual variant for the tab strip:
   *   - "underline" (default) — hairline bottom + 2px ink underline on active
   *   - "pill" — segmented pill, lime fill on active, dark text
   */
  variant?: "underline" | "pill";
};

/**
 * Tabs — keyboard-accessible tabbed UI.
 *
 * - ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `aria-controls`.
 * - Keyboard: Left/Right arrows cycle tabs, Home/End jump to first/last.
 * - Visual:
 *     - `underline` (default): hairline bottom + 2px ink underline on active
 *     - `pill`: segmented pill control with lime fill on active item
 */
export function Tabs({
  tabs,
  defaultId,
  className,
  ariaLabel = "Tabs",
  variant = "underline",
}: TabsProps) {
  const baseId = useId();
  const initial = defaultId ?? tabs[0]?.id;
  const [active, setActive] = useState<string>(initial ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    const nextTab = tabs[next];
    setActive(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          variant === "underline" &&
            "flex flex-wrap gap-x-6 gap-y-2 border-b hairline overflow-x-auto",
          variant === "pill" &&
            "inline-flex flex-wrap gap-1 border hairline p-1",
        )}
      >
        {tabs.map((t, idx) => {
          const isActive = t.id === active;
          const tabId = `${baseId}-tab-${t.id}`;
          const panelId = `${baseId}-panel-${t.id}`;
          // Build the per-variant className.
          const tabClasses =
            variant === "underline"
              ? cn(
                  "relative -mb-px pb-3 pt-2 px-1",
                  isActive
                    ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[var(--color-ink)]"
                    : "text-ink-muted hover:text-ink",
                )
              : cn(
                  "px-4 py-2",
                  isActive
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)]"
                    : "text-ink-muted hover:text-ink hover:bg-[var(--color-surface)]",
                );
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(t.id)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.16em]",
                "transition-colors duration-200",
                "whitespace-nowrap",
                tabClasses,
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        key={activeTab?.id}
        role="tabpanel"
        id={`${baseId}-panel-${activeTab?.id}`}
        aria-labelledby={`${baseId}-tab-${activeTab?.id}`}
        className="pt-8"
      >
        {activeTab?.content}
      </div>
    </div>
  );
}
