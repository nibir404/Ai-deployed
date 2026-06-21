import { IconBase, type IconProps } from "./Icon";

export function BarChart(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 16V9M12 16v-4M17 16V6" />
    </IconBase>
  );
}