import { cn } from "@/lib/cn";

export function EditorialRule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full hairline border-t", className)} />;
}
