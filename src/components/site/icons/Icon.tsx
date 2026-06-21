import type { SVGProps } from "react";

/**
 * Base SVG props for line-style icons. All icons share:
 * - 24x24 viewBox
 * - 1.5px stroke
 * - currentColor (inherits from parent)
 * - aria-hidden by default (parent supplies a11y label when needed)
 */
export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export function IconBase({
  size = 20,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      width={size}
      height={size}
      {...props}
    >
      {children}
    </svg>
  );
}
