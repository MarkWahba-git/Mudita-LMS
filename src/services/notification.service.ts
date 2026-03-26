import { db } from "@/lib/db";

export async function createNotification(
  userId: string,
  data: { title: string; message: string; type?: string; link?: string }
) {
  try {
    return await db.notification.create({
      data: {
        userId,
        title: data.title,
        message: data.message,
        type: data.type ?? "INFO",
        link: data.link,
      },
    });
  } catch {
    return null;
  }
}

export async function getNotifications(userId: string, limit = 50) {
  try {
    return await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function markAsRead(notificationId: string) {
  try {
    return await db.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  } catch {
    return null;
  }
}

export async function markAllAsRead(userId: string) {
  try {
    await db.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function getUnreadCount(userId: string) {
  try {
    return await db.notification.count({
      where: { userId, isRead: false },
    });
  } catch {
    return 0;
  }
}
