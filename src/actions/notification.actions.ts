"use server";

import { auth } from "@/lib/auth";
import { markAsRead, markAllAsRead } from "@/services/notification.service";

export async function markNotificationRead(id: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  await markAsRead(id);
  return { success: true };
}

export async function markAllNotificationsRead() {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };
  await markAllAsRead(session.user.id);
  return { success: true };
}
