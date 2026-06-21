import { cn } from "@/lib/cn";

type NumberedCardProps = {
  number: string;
  title: string;
  body?: string;
  className?: string;
};

/**
 * NumberedCard — large numeric + heading + body, hairline border.
 * Editorial alternative to the reference's colored card pattern.
 */
export function NumberedCard({
  number,
  title,
  body,
  className,
}: NumberedCardProps) {
  return (
    <article
      className={cn(
        "group p-6 md:p-8 border hairline card-surface relative overflow-hidden",
        "hover:border-[var(--color-line-strong)] transition-colors",
        className,
      )}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {number}
        </span>
        <span aria-hidden className="h-px flex-1 bg-current opacity-10" />
      </div>
      <h3 className="mt-6 font-display text-2xl md:text-3xl font-medium text-ink leading-tight">
        {title}
      </h3>
      <p className="mt-4 text-sm text-ink-muted leading-relaxed">{body}</p>
    </article>
  );
}
