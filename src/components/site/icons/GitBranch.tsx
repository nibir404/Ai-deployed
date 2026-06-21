import { IconBase, type IconProps } from "./Icon";

export function GitBranch(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="3" r="2" />
      <circle cx="6" cy="21" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 5v14" />
      <path d="M6 12a6 6 0 0 0 6 6h4" />
    </IconBase>
  );
}