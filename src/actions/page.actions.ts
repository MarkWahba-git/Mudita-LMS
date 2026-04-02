"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";
import {
  createPageSchema,
  updatePageSchema,
  deletePageSchema,
  togglePagePublishSchema,
} from "@/validators/action.schemas";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createPage(data: {
  title: string;
  titleAr?: string;
  titleDe?: string;
  slug?: string;
  content: string;
  contentAr?: string;
  contentDe?: string;
  isPublished: boolean;
}) {
  try {
    await requireAdmin();
    const parsed = createPageSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const slug = parsed.data.slug?.trim() || slugify(parsed.data.title);

    const existing = await db.page.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: "A page with this slug already exists" };
    }

    const page = await db.page.create({
      data: {
        title: parsed.data.title,
        titleAr: parsed.data.titleAr || null,
        titleDe: parsed.data.titleDe || null,
        slug,
        content: parsed.data.content,
        contentAr: parsed.data.contentAr || null,
        contentDe: parsed.data.contentDe || null,
        isPublished: parsed.data.isPublished,
      },
    });

    revalidatePath("/admin/pages");
    return { success: true, pageId: page.id };
  } catch (error) {
    console.error("createPage error:", error);
    return { success: false, error: "Failed to create page" };
  }
}

export async function updatePage(
  pageId: string,
  data: {
    title: string;
    titleAr?: string;
    titleDe?: string;
    slug?: string;
    content: string;
    contentAr?: string;
    contentDe?: string;
    isPublished: boolean;
  }
) {
  try {
    await requireAdmin();
    const parsed = updatePageSchema.safeParse({ pageId, data });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const slug = parsed.data.data.slug?.trim() || slugify(parsed.data.data.title);

    const existing = await db.page.findUnique({ where: { slug } });
    if (existing && existing.id !== parsed.data.pageId) {
      return { success: false, error: "A page with this slug already exists" };
    }

    await db.page.update({
      where: { id: parsed.data.pageId },
      data: {
        title: parsed.data.data.title,
        titleAr: parsed.data.data.titleAr || null,
        titleDe: parsed.data.data.titleDe || null,
        slug,
        content: parsed.data.data.content,
        contentAr: parsed.data.data.contentAr || null,
        contentDe: parsed.data.data.contentDe || null,
        isPublished: parsed.data.data.isPublished,
      },
    });

    revalidatePath("/admin/pages");
    revalidatePath(`/pages/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("updatePage error:", error);
    return { success: false, error: "Failed to update page" };
  }
}

export async function deletePage(pageId: string) {
  try {
    await requireAdmin();
    const parsed = deletePageSchema.safeParse({ pageId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.page.delete({ where: { id: parsed.data.pageId } });
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (error) {
    console.error("deletePage error:", error);
    return { success: false, error: "Failed to delete page" };
  }
}

export async function togglePagePublish(pageId: string) {
  try {
    await requireAdmin();
    const parsed = togglePagePublishSchema.safeParse({ pageId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const page = await db.page.findUnique({
      where: { id: parsed.data.pageId },
      select: { isPublished: true, slug: true },
    });
    if (!page) return { success: false, error: "Page not found" };

    await db.page.update({
      where: { id: parsed.data.pageId },
      data: { isPublished: !page.isPublished },
    });

    revalidatePath("/admin/pages");
    revalidatePath(`/pages/${page.slug}`);
    return { success: true, isPublished: !page.isPublished };
  } catch (error) {
    console.error("togglePagePublish error:", error);
    return { success: false, error: "Failed to toggle publish status" };
  }
}
