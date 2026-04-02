"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateModule } from "@/actions/course-content.actions";

interface Props {
  courseId: string;
  module: { id: string; title: string; titleAr: string; titleDe: string; order: number };
}

export function ModuleEditForm({ courseId, module: mod }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateModule({
        moduleId: mod.id,
        title: fd.get("title") as string,
        titleAr: (fd.get("titleAr") as string) || undefined,
        titleDe: (fd.get("titleDe") as string) || undefined,
        order: mod.order,
      });
      if (result.success) {
        router.push(`/admin/courses/${courseId}`);
      } else {
        setError(result.error ?? "Failed to update module");
      }
    });
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title (English) *</label>
          <input name="title" required defaultValue={mod.title}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title (Arabic)</label>
          <input name="titleAr" defaultValue={mod.titleAr} dir="rtl"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title (German)</label>
          <input name="titleDe" defaultValue={mod.titleDe}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={pending}
            className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60">
            {pending ? "Saving..." : "Save Changes"}
          </button>
          <a href={`/admin/courses/${courseId}`}
            className="inline-flex h-10 items-center rounded-lg border border-input px-6 text-sm font-medium hover:bg-muted">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
