import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: { value: number; positive: boolean };
  color?: "blue" | "purple" | "amber" | "emerald" | "pink" | "cyan";
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-[var(--stem-space)]",
    border: "border-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-[var(--stem-robot)]",
    border: "border-purple-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-[var(--stem-math)]",
    border: "border-amber-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-[var(--stem-code)]",
    border: "border-emerald-100",
  },
  pink: {
    bg: "bg-pink-50",
    icon: "text-[var(--stem-rocket)]",
    border: "border-pink-100",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-[var(--stem-science)]",
    border: "border-cyan-100",
  },
};

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  color = "blue",
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <Card className={cn("card-stem overflow-hidden border", colors.border)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="font-display text-3xl font-extrabold text-foreground">{value}</p>
          </div>
          <div className={cn("rounded-2xl p-3", colors.bg, colors.icon)}>
            {icon}
          </div>
        </div>

        {(description || trend) && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                  trend.positive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                )}
              >
                {trend.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
