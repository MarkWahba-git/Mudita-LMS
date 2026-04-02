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

export async function createProduct(data: {
  name: string;
  nameAr?: string;
  nameDe?: string;
  slug?: string;
  description: string;
  descriptionAr?: string;
  descriptionDe?: string;
  price: number;
  ageGroup: string;
  category: string;
  stock: number;
  status: string;
}) {
  try {
    await requireAdmin();
    const slug = data.slug?.trim() || slugify(data.name);

    const existing = await db.product.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: "A product with this slug already exists" };
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        nameAr: data.nameAr || null,
        nameDe: data.nameDe || null,
        slug,
        description: data.description,
        descriptionAr: data.descriptionAr || null,
        descriptionDe: data.descriptionDe || null,
        price: data.price,
        ageGroup: data.ageGroup as "AGES_3_5" | "AGES_6_8" | "AGES_9_12" | "AGES_13_15" | "AGES_16_18",
        category: data.category,
        stock: data.stock,
        status: data.status as "ACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED",
      },
    });

    revalidatePath("/admin/products");
    return { success: true, productId: product.id };
  } catch (error) {
    console.error("createProduct error:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(
  productId: string,
  data: {
    name: string;
    nameAr?: string;
    nameDe?: string;
    slug?: string;
    description: string;
    descriptionAr?: string;
    descriptionDe?: string;
    price: number;
    ageGroup: string;
    category: string;
    stock: number;
    status: string;
  }
) {
  try {
    await requireAdmin();
    const slug = data.slug?.trim() || slugify(data.name);

    const existing = await db.product.findUnique({ where: { slug } });
    if (existing && existing.id !== productId) {
      return { success: false, error: "A product with this slug already exists" };
    }

    await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        nameAr: data.nameAr || null,
        nameDe: data.nameDe || null,
        slug,
        description: data.description,
        descriptionAr: data.descriptionAr || null,
        descriptionDe: data.descriptionDe || null,
        price: data.price,
        ageGroup: data.ageGroup as "AGES_3_5" | "AGES_6_8" | "AGES_9_12" | "AGES_13_15" | "AGES_16_18",
        category: data.category,
        stock: data.stock,
        status: data.status as "ACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED",
      },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("updateProduct error:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    await requireAdmin();
    await db.product.delete({ where: { id: productId } });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
