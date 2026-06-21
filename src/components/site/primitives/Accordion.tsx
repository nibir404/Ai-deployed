"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/cn";

type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y hairline", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-p-${i}`;
        const btnId = `${baseId}-b-${i}`;
        return (
          <div key={it.q}>
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-6 flex items-start gap-6 group"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted mt-1.5 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-xl md:text-2xl font-medium text-ink leading-snug">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "font-mono text-sm mt-1 transition-transform",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pl-14 pr-10 pb-6 text-ink-muted text-sm md:text-base leading-relaxed max-w-3xl"
            >
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
