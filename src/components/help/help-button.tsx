"use client";

import { HelpCircle } from "lucide-react";
import { useHelpStore } from "@/stores/help-store";
import { cn } from "@/lib/utils";

interface HelpButtonProps {
  variant?: "topbar" | "navbar" | "floating";
  className?: string;
}

export function HelpButton({ variant = "topbar", className }: HelpButtonProps) {
  const openHelp = useHelpStore((s) => s.openHelp);

  if (variant === "floating") {
    return (
      <button
        onClick={openHelp}
        aria-label="Open Help Center"
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          className
        )}
      >
        <HelpCircle className="h-6 w-6" />
      </button>
    );
  }

  if (variant === "navbar") {
    return (
      <button
        onClick={openHelp}
        aria-label="Open Help Center"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          className
        )}
      >
        <HelpCircle className="h-4 w-4" />
        <span>Help</span>
      </button>
    );
  }

  // topbar variant (default)
  return (
    <button
      onClick={openHelp}
      aria-label="Open Help Center"
      className={cn(
        "relative rounded-md p-2 hover:bg-muted",
        className
      )}
    >
      <HelpCircle className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}
