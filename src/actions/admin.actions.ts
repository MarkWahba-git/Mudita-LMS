"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";

export async function updateUserRole(userId: string, role: string) {
  try {
    await requireAdmin();
    await db.user.update({ where: { id: userId }, data: { role: role as never } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { success: false, error: "Failed to update user role" };
  }
}

export async function toggleUserActive(userId: string) {
  try {
    await requireAdmin();
    const user = await db.user.findUnique({ where: { id: userId }, select: { isActive: true } });
    if (!user) return { success: false, error: "User not found" };
    await db.user.update({ where: { id: userId }, data: { isActive: !user.isActive } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("toggleUserActive error:", error);
    return { success: false, error: "Failed to toggle user status" };
  }
}

export async function createCourse(data: {
  title: string;
  description: string;
  ageGroup: string;
  level: string;
  category: string;
  isFree: boolean;
  price: number;
}) {
  try {
    const session = await requireAdmin();
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await db.course.create({
      data: {
        title: data.title,
        description: data.description,
        ageGroup: data.ageGroup as never,
        level: data.level as never,
        category: data.category,
        isFree: data.isFree,
        price: data.price,
        slug,
        createdById: session.user.id,
      },
    });

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("createCourse error:", error);
    return { success: false, error: "Failed to create course" };
  }
}

export async function updateCourse(
  courseId: string,
  data: Partial<{
    title: string;
    description: string;
    ageGroup: string;
    level: string;
    category: string;
    isFree: boolean;
    price: number;
    status: string;
  }>
) {
  try {
    await requireAdmin();
    await db.course.update({ where: { id: courseId }, data: data as never });
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("updateCourse error:", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await requireAdmin();
    await db.course.delete({ where: { id: courseId } });
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("deleteCourse error:", error);
    return { success: false, error: "Failed to delete course" };
  }
}

export async function createBadge(data: {
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, unknown>;
  points?: number;
}) {
  try {
    await requireAdmin();
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await db.badge.create({
      data: {
        slug,
        name: data.name,
        description: data.description,
        icon: data.icon,
        criteria: data.criteria as never,
        points: data.points ?? 0,
      },
    });

    revalidatePath("/admin/badges");
    return { success: true };
  } catch (error) {
    console.error("createBadge error:", error);
    return { success: false, error: "Failed to create badge" };
  }
}
