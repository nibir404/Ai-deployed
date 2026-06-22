import { IconBase, type IconProps } from "./Icon";

export function Pause(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </IconBase>
  );
}