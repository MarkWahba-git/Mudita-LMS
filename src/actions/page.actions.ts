"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";

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
    const slug = data.slug?.trim() || slugify(data.title);

    const existing = await db.page.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: "A page with this slug already exists" };
    }

    const page = await db.page.create({
      data: {
        title: data.title,
        titleAr: data.titleAr || null,
        titleDe: data.titleDe || null,
        slug,
        content: data.content,
        contentAr: data.contentAr || null,
        contentDe: data.contentDe || null,
        isPublished: data.isPublished,
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
    const slug = data.slug?.trim() || slugify(data.title);

    const existing = await db.page.findUnique({ where: { slug } });
    if (existing && existing.id !== pageId) {
      return { success: false, error: "A page with this slug already exists" };
    }

    await db.page.update({
      where: { id: pageId },
      data: {
        title: data.title,
        titleAr: data.titleAr || null,
        titleDe: data.titleDe || null,
        slug,
        content: data.content,
        contentAr: data.contentAr || null,
        contentDe: data.contentDe || null,
        isPublished: data.isPublished,
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
    await db.page.delete({ where: { id: pageId } });
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
    const page = await db.page.findUnique({
      where: { id: pageId },
      select: { isPublished: true, slug: true },
    });
    if (!page) return { success: false, error: "Page not found" };

    await db.page.update({
      where: { id: pageId },
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
