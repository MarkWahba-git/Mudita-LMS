import { db } from "@/lib/db";

export async function getPages(includeUnpublished = false) {
  return db.page.findMany({
    where: includeUnpublished ? {} : { isPublished: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPageBySlug(slug: string) {
  return db.page.findUnique({ where: { slug } });
}

export async function getPageById(id: string) {
  return db.page.findUnique({ where: { id } });
}
