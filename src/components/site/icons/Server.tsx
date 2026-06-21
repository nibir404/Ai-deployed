import { IconBase, type IconProps } from "./Icon";

export function Server(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </IconBase>
  );
}