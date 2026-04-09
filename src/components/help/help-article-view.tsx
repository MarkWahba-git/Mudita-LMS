"use client";

import { ArrowLeft, Tag, Clock } from "lucide-react";
import { useLocale } from "next-intl";
import { FeedbackWidget } from "@/components/help/feedback-widget";
import { getCategoryLabel, CATEGORY_CONFIG } from "@/components/help/category-config";
import { cn } from "@/lib/utils";
import { sanitize } from "@/lib/sanitize";

interface HelpArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  titleAr?: string | null;
  titleDe?: string | null;
  content: string;
  contentAr?: string | null;
  contentDe?: string | null;
  tags: string[];
  updatedAt: Date | string;
}

interface HelpArticleViewProps {
  article: HelpArticle;
  onBack?: () => void;
  className?: string;
}

export function HelpArticleView({ article, onBack, className }: HelpArticleViewProps) {
  const locale = useLocale();

  const title =
    (locale === "ar" && article.titleAr) ||
    (locale === "de" && article.titleDe) ||
    article.title;

  const content =
    (locale === "ar" && article.contentAr) ||
    (locale === "de" && article.contentDe) ||
    article.content;

  const categoryConfig = CATEGORY_CONFIG[article.category] ?? CATEGORY_CONFIG.GETTING_STARTED;
  const categoryLabel = getCategoryLabel(article.category, locale);

  const updatedAt = new Date(article.updatedAt).toLocaleDateString(
    locale === "ar" ? "ar-SA" : locale === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg text-base",
              categoryConfig.bg
            )}
          >
            {categoryConfig.icon}
          </span>
          <span className="text-xs font-medium text-muted-foreground">{categoryLabel}</span>
        </div>
        <h2 className="text-xl font-bold text-foreground leading-snug">{title}</h2>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Updated {updatedAt}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_a:hover]:underline [&_h2]:text-base [&_h3]:text-sm [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4 [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_code]:text-xs [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_img]:rounded-lg"
        dir={locale === "ar" ? "rtl" : "ltr"}
        dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      />

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Feedback */}
      <div className="border-t pt-4">
        <FeedbackWidget articleId={article.id} />
      </div>
    </div>
  );
}
