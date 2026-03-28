"use client";

import { useState } from "react";
import { createCourse } from "@/actions/admin.actions";
import { useRouter } from "next/navigation";

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

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFree, setIsFree] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const result = await createCourse({
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      ageGroup: fd.get("ageGroup") as string,
      level: fd.get("level") as string,
      category: fd.get("category") as string,
      isFree: isFree,
      price: isFree ? 0 : parseFloat(fd.get("price") as string) || 0,
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Failed to create course");
    } else {
      router.push("/admin/courses");
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">New Course</h1>
        <p className="text-muted-foreground">Create a new course for the platform.</p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              required
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
              {loading ? "Creating…" : "Create Course"}
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
    </div>
  );
}
