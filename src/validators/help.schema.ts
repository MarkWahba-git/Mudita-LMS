import { z } from "zod";

const helpCategoryEnum = z.enum([
  "GETTING_STARTED",
  "FEATURES_OVERVIEW",
  "GUIDES",
  "FAQ",
  "TROUBLESHOOTING",
  "WHATS_COMING",
]);

export const createHelpArticleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  titleAr: z.string().max(200).optional(),
  titleDe: z.string().max(200).optional(),
  category: helpCategoryEnum,
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  excerptAr: z.string().max(500).optional(),
  excerptDe: z.string().max(500).optional(),
  content: z.string().min(1, "Content is required"),
  contentAr: z.string().optional(),
  contentDe: z.string().optional(),
  tags: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const updateHelpArticleSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  data: createHelpArticleSchema,
});

export const deleteHelpArticleSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
});

export const helpFeedbackSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  helpful: z.boolean(),
});

export const helpSearchLogSchema = z.object({
  query: z.string().min(1),
  resultsCount: z.number().int().min(0).default(0),
  locale: z.string().default("en"),
});

export type CreateHelpArticleInput = z.infer<typeof createHelpArticleSchema>;
export type UpdateHelpArticleInput = z.infer<typeof updateHelpArticleSchema>;
export type HelpFeedbackInput = z.infer<typeof helpFeedbackSchema>;
