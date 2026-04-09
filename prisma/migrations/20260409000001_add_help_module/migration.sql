-- CreateEnum
CREATE TYPE "HelpCategory" AS ENUM ('GETTING_STARTED', 'FEATURES_OVERVIEW', 'GUIDES', 'FAQ', 'TROUBLESHOOTING', 'WHATS_COMING');

-- CreateTable
CREATE TABLE "HelpArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "HelpCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "titleAr" TEXT,
    "titleDe" TEXT,
    "excerpt" TEXT NOT NULL,
    "excerptAr" TEXT,
    "excerptDe" TEXT,
    "content" TEXT NOT NULL,
    "contentAr" TEXT,
    "contentDe" TEXT,
    "tags" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelpArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpFeedback" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "helpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpSearchLog" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "resultsCount" INTEGER NOT NULL DEFAULT 0,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpSearchLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HelpArticle_slug_key" ON "HelpArticle"("slug");

-- CreateIndex
CREATE INDEX "HelpArticle_slug_idx" ON "HelpArticle"("slug");

-- CreateIndex
CREATE INDEX "HelpArticle_category_idx" ON "HelpArticle"("category");

-- CreateIndex
CREATE INDEX "HelpArticle_isPublished_idx" ON "HelpArticle"("isPublished");

-- CreateIndex
CREATE INDEX "HelpFeedback_articleId_idx" ON "HelpFeedback"("articleId");

-- CreateIndex
CREATE INDEX "HelpSearchLog_query_idx" ON "HelpSearchLog"("query");

-- CreateIndex
CREATE INDEX "HelpSearchLog_locale_idx" ON "HelpSearchLog"("locale");

-- AddForeignKey
ALTER TABLE "HelpFeedback" ADD CONSTRAINT "HelpFeedback_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "HelpArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
