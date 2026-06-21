import { IconBase, type IconProps } from "./Icon";

export function Menu(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </IconBase>
  );
}