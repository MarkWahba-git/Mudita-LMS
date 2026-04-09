"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createHelpArticle, updateHelpArticle } from "@/actions/help.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Globe, Eye, EyeOff, Star } from "lucide-react";
import { CATEGORY_CONFIG } from "@/components/help/category-config";
import type { CreateHelpArticleInput } from "@/validators/help.schema";

const CATEGORIES = [
  "GETTING_STARTED",
  "FEATURES_OVERVIEW",
  "GUIDES",
  "FAQ",
  "TROUBLESHOOTING",
  "WHATS_COMING",
] as const;

const LANG_TABS = [
  { key: "en", label: "English", flag: "🇬🇧" },
  { key: "ar", label: "العربية", flag: "🇸🇦" },
  { key: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

type Lang = "en" | "ar" | "de";

interface HelpArticleFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    titleAr: string | null;
    titleDe: string | null;
    category: string;
    excerpt: string;
    excerptAr: string | null;
    excerptDe: string | null;
    content: string;
    contentAr: string | null;
    contentDe: string | null;
    tags: string[];
    order: number;
    isPublished: boolean;
    isFeatured: boolean;
  };
}

export function HelpArticleForm({ mode, initialData }: HelpArticleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [activeLang, setActiveLang] = useState<Lang>("en");

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [titleAr, setTitleAr] = useState(initialData?.titleAr ?? "");
  const [titleDe, setTitleDe] = useState(initialData?.titleDe ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "GETTING_STARTED");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [excerptAr, setExcerptAr] = useState(initialData?.excerptAr ?? "");
  const [excerptDe, setExcerptDe] = useState(initialData?.excerptDe ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [contentAr, setContentAr] = useState(initialData?.contentAr ?? "");
  const [contentDe, setContentDe] = useState(initialData?.contentDe ?? "");
  const [tagsInput, setTagsInput] = useState((initialData?.tags ?? []).join(", "));
  const [order, setOrder] = useState(initialData?.order ?? 0);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? false);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);

  function getLangTitle() {
    if (activeLang === "ar") return titleAr;
    if (activeLang === "de") return titleDe;
    return title;
  }
  function setLangTitle(val: string) {
    if (activeLang === "ar") setTitleAr(val);
    else if (activeLang === "de") setTitleDe(val);
    else setTitle(val);
  }

  function getLangExcerpt() {
    if (activeLang === "ar") return excerptAr;
    if (activeLang === "de") return excerptDe;
    return excerpt;
  }
  function setLangExcerpt(val: string) {
    if (activeLang === "ar") setExcerptAr(val);
    else if (activeLang === "de") setExcerptDe(val);
    else setExcerpt(val);
  }

  function getLangContent() {
    if (activeLang === "ar") return contentAr;
    if (activeLang === "de") return contentDe;
    return content;
  }
  function setLangContent(val: string) {
    if (activeLang === "ar") setContentAr(val);
    else if (activeLang === "de") setContentDe(val);
    else setContent(val);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("English title is required");
    if (!excerpt.trim()) return setError("English excerpt is required");
    if (!content.trim()) return setError("English content is required");

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const payload: CreateHelpArticleInput = {
      title: title.trim(),
      titleAr: titleAr.trim() || undefined,
      titleDe: titleDe.trim() || undefined,
      category: category as CreateHelpArticleInput["category"],
      excerpt: excerpt.trim(),
      excerptAr: excerptAr.trim() || undefined,
      excerptDe: excerptDe.trim() || undefined,
      content: content.trim(),
      contentAr: contentAr.trim() || undefined,
      contentDe: contentDe.trim() || undefined,
      tags,
      order,
      isPublished,
      isFeatured,
    };

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createHelpArticle(payload)
          : await updateHelpArticle(initialData!.id, payload);

      if (result.success) {
        router.push("/admin/help");
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
          onClick={() => router.push("/admin/help")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Articles
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFeatured(!isFeatured)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              isFeatured
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-border bg-muted text-muted-foreground"
            }`}
          >
            <Star className={`h-4 w-4 ${isFeatured ? "fill-amber-500" : ""}`} />
            {isFeatured ? "Featured" : "Not Featured"}
          </button>
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
            {isPending
              ? "Saving..."
              : mode === "create"
              ? "Create Article"
              : "Save Changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Category & Order */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {CATEGORIES.map((cat) => {
              const config = CATEGORY_CONFIG[cat];
              return (
                <option key={cat} value={cat}>
                  {config?.icon} {config?.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            type="number"
            min={0}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            placeholder="0"
          />
          <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="courses, enrollment, certificate (comma-separated)"
        />
        <p className="text-xs text-muted-foreground">
          Comma-separated tags help users find this article via search.
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {LANG_TABS.map((tab) => (
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

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title{" "}
          {activeLang !== "en" &&
            `(${LANG_TABS.find((t) => t.key === activeLang)?.label})`}
        </Label>
        <Input
          id="title"
          value={getLangTitle()}
          onChange={(e) => setLangTitle(e.target.value)}
          placeholder={
            activeLang === "en" ? "Article title" : "Translation (optional)"
          }
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          required={activeLang === "en"}
        />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">
          Excerpt (short summary){" "}
          {activeLang !== "en" &&
            `(${LANG_TABS.find((t) => t.key === activeLang)?.label})`}
        </Label>
        <textarea
          id="excerpt"
          value={getLangExcerpt()}
          onChange={(e) => setLangExcerpt(e.target.value)}
          placeholder={
            activeLang === "en"
              ? "Brief description shown in search results and cards..."
              : "Translation (optional)"
          }
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          required={activeLang === "en"}
          rows={3}
          maxLength={500}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Content{" "}
          {activeLang !== "en" &&
            `(${LANG_TABS.find((t) => t.key === activeLang)?.label})`}
        </Label>
        <p className="text-xs text-muted-foreground">
          Supports HTML. Use headings, paragraphs, lists, code blocks, etc.
        </p>
        <textarea
          id="content"
          value={getLangContent()}
          onChange={(e) => setLangContent(e.target.value)}
          placeholder={
            activeLang === "en"
              ? "Write your help content here..."
              : "Translation (optional)"
          }
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          required={activeLang === "en"}
          rows={24}
          className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Translation status */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Globe className="h-4 w-4" />
          Translation Status
        </div>
        <div className="mt-2 flex gap-4 text-xs">
          {[
            { key: "en", label: "English", done: !!title && !!excerpt && !!content, required: true },
            { key: "ar", label: "Arabic", done: !!titleAr && !!excerptAr && !!contentAr, required: false },
            { key: "de", label: "German", done: !!titleDe && !!excerptDe && !!contentDe, required: false },
          ].map(({ key, label, done, required }) => (
            <span key={key} className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  done ? "bg-green-500" : required ? "bg-red-500" : "bg-amber-400"
                }`}
              />
              {label} {done ? "✓" : required ? "Required" : "Missing"}
            </span>
          ))}
        </div>
      </div>
    </form>
  );
}
