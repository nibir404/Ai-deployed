import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  ariaLabel?: string;
};

export function Section({
  id,
  children,
  className,
  as: Tag = "section",
  ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn("py-[var(--space-section)]", className)}
    >
      {children}
    </Tag>
  );
}
