"use client";

import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/components/help/category-config";

interface ArticleCardArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  titleAr?: string | null;
  titleDe?: string | null;
  excerpt: string;
  excerptAr?: string | null;
  excerptDe?: string | null;
}

interface HelpArticleCardProps {
  article: ArticleCardArticle;
  onClick?: (article: ArticleCardArticle) => void;
  className?: string;
}

export function HelpArticleCard({ article, onClick, className }: HelpArticleCardProps) {
  const locale = useLocale();

  const title =
    (locale === "ar" && article.titleAr) ||
    (locale === "de" && article.titleDe) ||
    article.title;

  const excerpt =
    (locale === "ar" && article.excerptAr) ||
    (locale === "de" && article.excerptDe) ||
    article.excerpt;

  const config = CATEGORY_CONFIG[article.category] ?? CATEGORY_CONFIG.GETTING_STARTED;

  return (
    <button
      onClick={() => onClick?.(article)}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border bg-white p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm",
        className
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg",
          config.bg
        )}
      >
        {config.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
      </div>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
}
