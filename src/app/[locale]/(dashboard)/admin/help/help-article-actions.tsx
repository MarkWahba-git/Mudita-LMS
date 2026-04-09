"use client";

import { useTransition } from "react";
import { deleteHelpArticle, toggleHelpArticlePublish } from "@/actions/help.actions";
import { Trash2, Eye, EyeOff } from "lucide-react";

export function DeleteHelpArticleButton({ articleId, title }: { articleId: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteHelpArticle(articleId);
      if (!result.success) alert(result.error);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete article"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function ToggleHelpPublishButton({
  articleId,
  isPublished,
}: {
  articleId: string;
  isPublished: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleHelpArticlePublish(articleId);
      if (!result.success) alert(result.error);
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
      title={isPublished ? "Unpublish" : "Publish"}
    >
      {isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
