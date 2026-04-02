"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, requireAdmin } from "@/lib/auth-helpers";
import {
  updateSettingSchema,
  bulkUpdateSettingsSchema,
  createSettingSchema,
  deleteSettingSchema,
} from "@/validators/action.schemas";

// ── Queries ─────────────────────────────────────────────────────────────

export async function getAllSettings() {
  try {
    await requireAdmin();
    return await db.systemSetting.findMany({
      orderBy: [{ category: "asc" }, { key: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getSettingsByCategory(category: string) {
  try {
    await requireAdmin();
    return await db.systemSetting.findMany({
      where: { category },
      orderBy: { key: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getSetting(key: string) {
  try {
    await requireAdmin();
    return await db.systemSetting.findUnique({ where: { key } });
  } catch {
    return null;
  }
}

// ── Mutations ───────────────────────────────────────────────────────────

export async function updateSetting(key: string, value: string) {
  try {
    await requireSuperAdmin();
    const parsed = updateSettingSchema.safeParse({ key, value });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.systemSetting.update({
      where: { key: parsed.data.key },
      data: { value: parsed.data.value },
    });
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("updateSetting error:", error);
    return { success: false, error: "Failed to update setting" };
  }
}

export async function bulkUpdateSettings(updates: { key: string; value: string }[]) {
  try {
    await requireSuperAdmin();
    const parsed = bulkUpdateSettingsSchema.safeParse({ updates });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.$transaction(
      parsed.data.updates.map((u) =>
        db.systemSetting.update({
          where: { key: u.key },
          data: { value: u.value },
        })
      )
    );
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("bulkUpdateSettings error:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

export async function createSetting(data: {
  key: string;
  value: string;
  type: string;
  category: string;
  label: string;
  description?: string;
}) {
  try {
    await requireSuperAdmin();
    const parsed = createSettingSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const existing = await db.systemSetting.findUnique({ where: { key: parsed.data.key } });
    if (existing) {
      return { success: false, error: "Setting with this key already exists" };
    }

    await db.systemSetting.create({ data: parsed.data });
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("createSetting error:", error);
    return { success: false, error: "Failed to create setting" };
  }
}

export async function deleteSetting(key: string) {
  try {
    await requireSuperAdmin();
    const parsed = deleteSettingSchema.safeParse({ key });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.systemSetting.delete({ where: { key: parsed.data.key } });
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("deleteSetting error:", error);
    return { success: false, error: "Failed to delete setting" };
  }
}
