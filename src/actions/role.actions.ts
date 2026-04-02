"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, requireAdmin } from "@/lib/auth-helpers";
import type { Role } from "@/config/navigation";

// ── Permission CRUD ─────────────────────────────────────────────────────

export async function createPermission(data: {
  name: string;
  description: string;
  resource: string;
  action: string;
}) {
  try {
    await requireSuperAdmin();

    const existing = await db.permission.findUnique({
      where: { resource_action: { resource: data.resource, action: data.action } },
    });
    if (existing) {
      return { success: false, error: "Permission with this resource/action already exists" };
    }

    await db.permission.create({ data });
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
    await db.permission.delete({ where: { id: permissionId } });
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

    const existing = await db.rolePermission.findUnique({
      where: { role_permissionId: { role, permissionId } },
    });
    if (existing) {
      return { success: false, error: "Permission already assigned to this role" };
    }

    await db.rolePermission.create({ data: { role, permissionId } });
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
    await db.rolePermission.delete({
      where: { role_permissionId: { role, permissionId } },
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

    await db.$transaction(async (tx) => {
      // Remove all existing permissions for this role
      await tx.rolePermission.deleteMany({ where: { role } });

      // Add all selected permissions
      if (permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId) => ({ role, permissionId })),
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
