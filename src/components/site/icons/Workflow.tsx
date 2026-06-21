import { IconBase, type IconProps } from "./Icon";

export function Workflow(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </IconBase>
  );
}