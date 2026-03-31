import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  variant?: "default" | "xp" | "success";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const variantStyles = {
  default: "bg-primary",
  xp: "xp-bar",
  success: "bg-gradient-to-r from-emerald-400 to-green-500",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, variant = "default", size = "md", showLabel, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div className={cn("relative", showLabel && "flex items-center gap-3")}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-muted",
            sizeStyles[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              variantStyles[variant]
            )}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        {showLabel && (
          <span className="shrink-0 text-xs font-bold text-muted-foreground">
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
