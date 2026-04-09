import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/services/help.service";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.trim() ?? "";
  const locale = searchParams.get("locale") ?? "en";

  if (!query || query.length < 2) {
    return NextResponse.json({ articles: [] });
  }

  const articles = await searchArticles(query);

  // Log search asynchronously (fire and forget)
  db.helpSearchLog
    .create({ data: { query, resultsCount: articles.length, locale } })
    .catch(() => {});

  return NextResponse.json({ articles });
}
