"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse } from "@/actions/admin.actions";

const AGE_GROUPS = [
  "AGES_3_5",
  "AGES_6_8",
  "AGES_9_12",
  "AGES_13_15",
  "AGES_16_18",
];

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const CATEGORIES = [
  "STEM",
  "Mathematics",
  "Science",
  "Technology",
  "Engineering",
  "Arts",
  "Language",
  "Other",
];

export interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  ageGroup: string;
  level: string;
  category: string;
  isFree: boolean;
  price: number;
  status?: string;
}

interface CourseFormProps {
  mode: "create" | "edit";
  initialData?: CourseFormData;
}

export default function CourseForm({ mode, initialData }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(initialData?.isFree ?? false);

  const isEdit = mode === "edit";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const courseData = {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      ageGroup: fd.get("ageGroup") as string,
      level: fd.get("level") as string,
      category: fd.get("category") as string,
      isFree: isFree,
      price: isFree ? 0 : Math.max(0, Number(fd.get("price")) || 0),
    };

    let result: { success: boolean; error?: string };

    if (isEdit && initialData?.id) {
      result = await updateCourse(initialData.id, courseData);
    } else {
      result = await createCourse(courseData);
    }

    setLoading(false);
    if (!result.success) {
      setError(result.error ?? `Failed to ${isEdit ? "update" : "create"} course`);
    } else {
      router.push("/admin/courses");
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            required
            defaultValue={initialData?.title ?? ""}
            placeholder="Course title"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={initialData?.description ?? ""}
            placeholder="Describe what students will learn…"
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Age Group <span className="text-red-500">*</span>
            </label>
            <select
              name="ageGroup"
              required
              defaultValue={initialData?.ageGroup ?? ""}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select…</option>
              {AGE_GROUPS.map((ag) => (
                <option key={ag} value={ag}>
                  {ag.replace("AGES_", "").replace("_", "-")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Level <span className="text-red-500">*</span>
            </label>
            <select
              name="level"
              required
              defaultValue={initialData?.level ?? ""}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select…</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l.charAt(0) + l.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              defaultValue={initialData?.category ?? ""}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="isFree"
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="isFree" className="text-sm font-medium">
            This course is free
          </label>
        </div>

        {!isFree && (
          <div>
            <label className="mb-1.5 block text-sm font-medium">Price (USD)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={initialData?.price ?? ""}
              placeholder="29.99"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {loading
              ? isEdit
                ? "Saving…"
                : "Creating…"
              : isEdit
                ? "Save Changes"
                : "Create Course"}
          </button>
          <a
            href="/admin/courses"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-input px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
