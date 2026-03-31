"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPage, updatePage } from "@/actions/page.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Globe, Eye, EyeOff } from "lucide-react";

interface PageFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    titleAr: string | null;
    titleDe: string | null;
    slug: string;
    content: string;
    contentAr: string | null;
    contentDe: string | null;
    isPublished: boolean;
  };
}

const tabs = [
  { key: "en", label: "English", flag: "🇬🇧" },
  { key: "ar", label: "العربية", flag: "🇸🇦" },
  { key: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

export function PageForm({ mode, initialData }: PageFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [activeLang, setActiveLang] = useState<"en" | "ar" | "de">("en");

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [titleAr, setTitleAr] = useState(initialData?.titleAr ?? "");
  const [titleDe, setTitleDe] = useState(initialData?.titleDe ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [contentAr, setContentAr] = useState(initialData?.contentAr ?? "");
  const [contentDe, setContentDe] = useState(initialData?.contentDe ?? "");
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? false);

  function autoSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (mode === "create" || slug === autoSlug(initialData?.title ?? "")) {
      setSlug(autoSlug(val));
    }
  }

  function getActiveTitle() {
    if (activeLang === "ar") return titleAr;
    if (activeLang === "de") return titleDe;
    return title;
  }
  function setActiveTitle(val: string) {
    if (activeLang === "ar") setTitleAr(val);
    else if (activeLang === "de") setTitleDe(val);
    else handleTitleChange(val);
  }

  function getActiveContent() {
    if (activeLang === "ar") return contentAr;
    if (activeLang === "de") return contentDe;
    return content;
  }
  function setActiveContent(val: string) {
    if (activeLang === "ar") setContentAr(val);
    else if (activeLang === "de") setContentDe(val);
    else setContent(val);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("English title is required");
      return;
    }
    if (!content.trim()) {
      setError("English content is required");
      return;
    }

    const payload = {
      title: title.trim(),
      titleAr: titleAr.trim() || undefined,
      titleDe: titleDe.trim() || undefined,
      slug: slug.trim(),
      content: content.trim(),
      contentAr: contentAr.trim() || undefined,
      contentDe: contentDe.trim() || undefined,
      isPublished,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createPage(payload)
          : await updatePage(initialData!.id, payload);

      if (result.success) {
        router.push("/admin/pages");
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pages
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              isPublished
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-border bg-muted text-muted-foreground"
            }`}
          >
            {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {isPublished ? "Published" : "Draft"}
          </button>
          <Button type="submit" disabled={isPending}>
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : mode === "create" ? "Create Page" : "Save Changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Slug field */}
      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">/pages/</span>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="page-slug"
            className="font-mono text-sm"
          />
        </div>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveLang(tab.key)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeLang === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.flag}</span>
            {tab.label}
            {tab.key !== "en" && (
              <span className="text-xs text-muted-foreground">(optional)</span>
            )}
          </button>
        ))}
      </div>

      {/* Title for active language */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title {activeLang !== "en" && `(${tabs.find((t) => t.key === activeLang)?.label})`}
        </Label>
        <Input
          id="title"
          value={getActiveTitle()}
          onChange={(e) => setActiveTitle(e.target.value)}
          placeholder={activeLang === "en" ? "Page title" : "Translation (optional)"}
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          required={activeLang === "en"}
        />
      </div>

      {/* Content for active language */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Content {activeLang !== "en" && `(${tabs.find((t) => t.key === activeLang)?.label})`}
        </Label>
        <p className="text-xs text-muted-foreground">
          Supports HTML. Use headings, paragraphs, lists, etc.
        </p>
        <textarea
          id="content"
          value={getActiveContent()}
          onChange={(e) => setActiveContent(e.target.value)}
          placeholder={activeLang === "en" ? "Write your page content here..." : "Translation (optional)"}
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          required={activeLang === "en"}
          rows={20}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
        />
      </div>

      {/* Translation status summary */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Globe className="h-4 w-4" />
          Translation Status
        </div>
        <div className="mt-2 flex gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${title ? "bg-green-500" : "bg-red-500"}`} />
            English {title ? "✓" : "Required"}
          </span>
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${titleAr && contentAr ? "bg-green-500" : "bg-amber-400"}`} />
            Arabic {titleAr && contentAr ? "✓" : "Missing"}
          </span>
          <span className="flex items-center gap-1">
            <span className={`h-2 w-2 rounded-full ${titleDe && contentDe ? "bg-green-500" : "bg-amber-400"}`} />
            German {titleDe && contentDe ? "✓" : "Missing"}
          </span>
        </div>
      </div>
    </form>
  );
}
