import { auth } from "@/lib/auth";

/**
 * Check if a role has admin-level access (ADMIN or SUPER_ADMIN).
 */
export function isAdminRole(role: string | undefined): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

/**
 * Check if a role is SUPER_ADMIN.
 */
export function isSuperAdmin(role: string | undefined): boolean {
  return role === "SUPER_ADMIN";
}

/**
 * Server-side guard: require authenticated admin or super admin.
 * Throws if not authenticated or not admin-level.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!isAdminRole(session.user.role)) throw new Error("Forbidden");
  return session;
}

/**
 * Server-side guard: require SUPER_ADMIN only.
 * Throws if not authenticated or not super admin.
 */
export async function requireSuperAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!isSuperAdmin(session.user.role)) throw new Error("Forbidden");
  return session;
}
