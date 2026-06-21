import { IconBase, type IconProps } from "./Icon";

export function LineChart(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 4 4 5-6" />
    </IconBase>
  );
}