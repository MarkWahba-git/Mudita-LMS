import { Sparkles } from "lucide-react";

interface PointsCounterProps {
  points: number;
  size?: "sm" | "md" | "lg";
}

export function PointsCounter({ points, size = "md" }: PointsCounterProps) {
  const formatted = new Intl.NumberFormat().format(points);

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs gap-1",
    md: "px-3.5 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 font-bold text-amber-700 ${sizeStyles[size]}`}
    >
      <Sparkles className={`${iconSizes[size]} text-amber-500`} />
      <span>{formatted} XP</span>
    </div>
  );
}
