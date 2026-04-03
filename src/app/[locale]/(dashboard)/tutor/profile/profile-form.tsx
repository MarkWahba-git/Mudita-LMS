"use client";

import { useState } from "react";
import { updateTutorProfile } from "@/actions/tutor.actions";

interface TutorData {
  headline: string | null;
  bio: string | null;
  hourlyRate: string;
  subjects: string[];
  languages: string[];
}

export function ProfileForm({ initial }: { initial: TutorData | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const bio = fd.get("bio") as string;
    const hourlyRate = parseFloat(fd.get("hourlyRate") as string);
    const subjects = (fd.get("subjects") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const languages = (fd.get("languages") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const headline = fd.get("headline") as string;

    const result = await updateTutorProfile({ bio, hourlyRate, subjects, languages, headline });
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Failed to update profile");
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Headline</label>
          <input
            name="headline"
            defaultValue={initial?.headline ?? ""}
            placeholder="e.g., Expert Math & Science Tutor"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={initial?.bio ?? ""}
            placeholder="Tell students about your background, teaching style, and experience…"
            className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Hourly Rate (USD)</label>
          <input
            name="hourlyRate"
            type="number"
            min="1"
            step="0.01"
            required
            defaultValue={initial?.hourlyRate ?? ""}
            placeholder="50"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Subjects <span className="text-muted-foreground">(comma-separated)</span>
          </label>
          <input
            name="subjects"
            defaultValue={initial?.subjects.join(", ") ?? ""}
            placeholder="Mathematics, Physics, Chemistry"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Languages <span className="text-muted-foreground">(comma-separated)</span>
          </label>
          <input
            name="languages"
            defaultValue={initial?.languages.join(", ") ?? ""}
            placeholder="English, Arabic"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-green-600">Profile updated successfully!</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
