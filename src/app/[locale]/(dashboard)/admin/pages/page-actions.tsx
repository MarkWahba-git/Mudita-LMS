"use client";

import { useTransition } from "react";
import { deletePage, togglePagePublish } from "@/actions/page.actions";
import { Trash2, Eye, EyeOff } from "lucide-react";

export function DeletePageButton({ pageId, title }: { pageId: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deletePage(pageId);
      if (!result.success) alert(result.error);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete page"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

export function TogglePublishButton({ pageId, isPublished }: { pageId: string; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await togglePagePublish(pageId);
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
