import { db } from "@/lib/db";

export async function getProducts(filters?: { ageGroup?: string; category?: string }) {
  try {
    const where: Record<string, unknown> = { status: "ACTIVE" };
    if (filters?.ageGroup) where.ageGroup = filters.ageGroup;
    if (filters?.category) where.category = filters.category;

    return await db.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await db.product.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}
