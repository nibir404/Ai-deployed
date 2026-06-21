import { IconBase, type IconProps } from "./Icon";

export function Layers(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 2 10 6-10 6L2 8l10-6z" />
      <path d="m2 17 10 6 10-6" />
      <path d="m2 12 10 6 10-6" />
    </IconBase>
  );
}