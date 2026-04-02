"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, requireAdmin } from "@/lib/auth-helpers";
import type { Role } from "@/config/navigation";
import {
  createPermissionSchema,
  deletePermissionSchema,
  assignPermissionSchema,
  revokePermissionSchema,
  bulkUpdateRolePermissionsSchema,
} from "@/validators/action.schemas";

// ── Permission CRUD ─────────────────────────────────────────────────────

export async function createPermission(data: {
  name: string;
  description: string;
  resource: string;
  action: string;
}) {
  try {
    await requireSuperAdmin();
    const parsed = createPermissionSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const existing = await db.permission.findUnique({
      where: { resource_action: { resource: parsed.data.resource, action: parsed.data.action } },
    });
    if (existing) {
      return { success: false, error: "Permission with this resource/action already exists" };
    }

    await db.permission.create({ data: parsed.data });
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    console.error("createPermission error:", error);
    return { success: false, error: "Failed to create permission" };
  }
}

export async function deletePermission(permissionId: string) {
  try {
    await requireSuperAdmin();
    const parsed = deletePermissionSchema.safeParse({ permissionId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.permission.delete({ where: { id: parsed.data.permissionId } });
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    console.error("deletePermission error:", error);
    return { success: false, error: "Failed to delete permission" };
  }
}

// ── Role-Permission management ──────────────────────────────────────────

export async function assignPermission(role: Role, permissionId: string) {
  try {
    await requireSuperAdmin();
    const parsed = assignPermissionSchema.safeParse({ role, permissionId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const existing = await db.rolePermission.findUnique({
      where: { role_permissionId: { role: parsed.data.role, permissionId: parsed.data.permissionId } },
    });
    if (existing) {
      return { success: false, error: "Permission already assigned to this role" };
    }

    await db.rolePermission.create({ data: { role: parsed.data.role, permissionId: parsed.data.permissionId } });
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    console.error("assignPermission error:", error);
    return { success: false, error: "Failed to assign permission" };
  }
}

export async function revokePermission(role: Role, permissionId: string) {
  try {
    await requireSuperAdmin();
    const parsed = revokePermissionSchema.safeParse({ role, permissionId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.rolePermission.delete({
      where: { role_permissionId: { role: parsed.data.role, permissionId: parsed.data.permissionId } },
    });
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    console.error("revokePermission error:", error);
    return { success: false, error: "Failed to revoke permission" };
  }
}

export async function bulkUpdateRolePermissions(
  role: Role,
  permissionIds: string[]
) {
  try {
    await requireSuperAdmin();
    const parsed = bulkUpdateRolePermissionsSchema.safeParse({ role, permissionIds });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { role: parsed.data.role } });

      if (parsed.data.permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: parsed.data.permissionIds.map((permissionId) => ({ role: parsed.data.role, permissionId })),
        });
      }
    });

    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    console.error("bulkUpdateRolePermissions error:", error);
    return { success: false, error: "Failed to update role permissions" };
  }
}

// ── Queries ─────────────────────────────────────────────────────────────

export async function getAllPermissions() {
  try {
    await requireAdmin();
    return await db.permission.findMany({
      orderBy: [{ resource: "asc" }, { action: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getRolePermissions(role: Role) {
  try {
    await requireAdmin();
    const rps = await db.rolePermission.findMany({
      where: { role },
      include: { permission: true },
    });
    return rps.map((rp) => rp.permission);
  } catch {
    return [];
  }
}

export async function getPermissionMatrix() {
  try {
    await requireAdmin();
    const [permissions, rolePermissions] = await Promise.all([
      db.permission.findMany({ orderBy: [{ resource: "asc" }, { action: "asc" }] }),
      db.rolePermission.findMany(),
    ]);

    const matrix: Record<string, string[]> = {};
    for (const rp of rolePermissions) {
      if (!matrix[rp.role]) matrix[rp.role] = [];
      matrix[rp.role].push(rp.permissionId);
    }

    return { permissions, matrix };
  } catch {
    return { permissions: [], matrix: {} };
  }
}
