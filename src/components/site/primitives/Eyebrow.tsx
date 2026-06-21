import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "h2" | "h3";
}) {
  return <Tag className={cn("eyebrow block", className)}>{children}</Tag>;
}
