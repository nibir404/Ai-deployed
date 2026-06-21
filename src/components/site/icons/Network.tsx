import { IconBase, type IconProps } from "./Icon";

export function Network(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="4" r="2" />
      <circle cx="20" cy="4" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
      <path d="M9.7 9.7 6 6m9.3 3.7L18 6M9.7 14.3 6 18m9.3-3.7L18 18" />
    </IconBase>
  );
}