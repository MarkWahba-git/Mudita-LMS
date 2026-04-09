"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface SearchArticle {
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

interface HelpSearchProps {
  onSelect?: (article: SearchArticle) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function HelpSearch({
  onSelect,
  placeholder = "Search for help...",
  className,
  autoFocus,
}: HelpSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getLocalizedTitle = useCallback(
    (article: SearchArticle) => {
      if (locale === "ar" && article.titleAr) return article.titleAr;
      if (locale === "de" && article.titleDe) return article.titleDe;
      return article.title;
    },
    [locale]
  );

  const getLocalizedExcerpt = useCallback(
    (article: SearchArticle) => {
      if (locale === "ar" && article.excerptAr) return article.excerptAr;
      if (locale === "de" && article.excerptDe) return article.excerptDe;
      return article.excerpt;
    },
    [locale]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/help/search?q=${encodeURIComponent(query)}&locale=${locale}`
        );
        const data = await res.json();
        setResults(data.articles ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, locale]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border bg-muted/40 pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-lg border bg-white shadow-lg">
          {results.map((article) => (
            <button
              key={article.id}
              className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-muted"
              onClick={() => {
                onSelect?.(article);
                setOpen(false);
                setQuery(getLocalizedTitle(article));
              }}
            >
              <span className="text-sm font-medium text-foreground">
                {getLocalizedTitle(article)}
              </span>
              <span className="line-clamp-1 text-xs text-muted-foreground">
                {getLocalizedExcerpt(article)}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.length >= 2 && !loading && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border bg-white px-4 py-3 shadow-lg">
          <p className="text-sm text-muted-foreground">No articles found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
