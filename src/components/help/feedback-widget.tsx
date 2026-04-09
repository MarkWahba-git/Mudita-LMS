"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { submitHelpFeedback } from "@/actions/help.actions";
import { cn } from "@/lib/utils";

interface FeedbackWidgetProps {
  articleId: string;
  className?: string;
}

export function FeedbackWidget({ articleId, className }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFeedback(helpful: boolean) {
    if (submitted || loading) return;
    setLoading(true);
    await submitHelpFeedback({ articleId, helpful });
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <span className="text-lg">🙏</span>
        <span>Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm text-muted-foreground">Was this helpful?</span>
      <button
        onClick={() => handleFeedback(true)}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-green-400 hover:bg-green-50 hover:text-green-700 disabled:opacity-50"
      >
        <ThumbsUp className="h-4 w-4" />
        Yes
      </button>
      <button
        onClick={() => handleFeedback(false)}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-red-400 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
      >
        <ThumbsDown className="h-4 w-4" />
        No
      </button>
    </div>
  );
}
