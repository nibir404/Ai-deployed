import { cn } from "@/lib/cn";

type DisplayHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "hero" | "section" | "display";
  id?: string;
};

export function DisplayHeading({
  children,
  className,
  as: Tag = "h2",
  size = "section",
  id,
}: DisplayHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-display font-medium text-ink",
        size === "hero" && "text-hero",
        size === "section" && "text-section",
        size === "display" && "text-display",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
