import { db } from "@/lib/db";

/**
 * Returns one row per conversation partner, with the most recent message
 * and the count of unread messages for the given user.
 */
export async function getInbox(userId: string) {
  try {
    // Get all messages where user is sender or receiver
    const messages = await db.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true, role: true } },
        receiver: { select: { id: true, name: true, avatar: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Group by conversation partner and keep the latest message per partner
    const conversationMap = new Map<
      string,
      {
        partnerId: string;
        partnerName: string | null;
        partnerAvatar: string | null;
        partnerRole: string;
        lastMessage: string;
        lastMessageAt: Date;
        unreadCount: number;
      }
    >();

    for (const msg of messages) {
      const partnerId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      const partner = msg.senderId === userId ? msg.receiver : msg.sender;

      if (!conversationMap.has(partnerId)) {
        conversationMap.set(partnerId, {
          partnerId,
          partnerName: partner.name,
          partnerAvatar: partner.avatar,
          partnerRole: partner.role,
          lastMessage: msg.body,
          lastMessageAt: msg.createdAt,
          unreadCount: 0,
        });
      }

      // Count unread messages sent TO this user from this partner
      const existing = conversationMap.get(partnerId)!;
      if (!msg.isRead && msg.receiverId === userId) {
        existing.unreadCount += 1;
      }
    }

    return Array.from(conversationMap.values()).sort(
      (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Returns all messages between two users, oldest first (for chat display).
 */
export async function getThread(userId: string, otherUserId: string) {
  try {
    return await db.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "asc" },
    });
  } catch {
    return [];
  }
}

/**
 * Send a message from senderId to receiverId.
 */
export async function sendMessage(
  senderId: string,
  receiverId: string,
  body: string,
  subject?: string
) {
  return await db.message.create({
    data: { senderId, receiverId, body, subject: subject || null },
  });
}

/**
 * Mark all messages from otherUserId to userId as read.
 */
export async function markThreadAsRead(userId: string, otherUserId: string) {
  return await db.message.updateMany({
    where: { senderId: otherUserId, receiverId: userId, isRead: false },
    data: { isRead: true },
  });
}

/**
 * Get basic user info to seed the new-message recipient selector.
 * Returns tutors for students, and students for tutors.
 */
export async function getMessageableUsers(currentUserId: string, currentRole: string) {
  try {
    // Students can message tutors; tutors can message their students
    let roleFilter: string;
    if (currentRole === "STUDENT") roleFilter = "TUTOR";
    else if (currentRole === "TUTOR") roleFilter = "STUDENT";
    else roleFilter = "STUDENT"; // Admins can message anyone — default to students

    return await db.user.findMany({
      where: { role: roleFilter as never, isActive: true, id: { not: currentUserId } },
      select: { id: true, name: true, avatar: true, role: true },
      orderBy: { name: "asc" },
      take: 100,
    });
  } catch {
    return [];
  }
}
