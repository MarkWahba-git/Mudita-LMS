import { db } from "@/lib/db";

export async function getTutors(filters?: {
  subject?: string;
  language?: string;
}) {
  try {
    const where: Record<string, unknown> = { isVerified: true };
    if (filters?.subject) {
      where.subjects = { has: filters.subject };
    }
    if (filters?.language) {
      where.languages = { has: filters.language };
    }
    return await db.tutorProfile.findMany({
      where,
      include: { user: { select: { id: true, name: true, avatar: true, email: true } } },
      orderBy: { rating: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getTutorByUserId(userId: string) {
  try {
    return await db.tutorProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, avatar: true, email: true } },
        availability: true,
      },
    });
  } catch {
    return null;
  }
}

export async function getTutorById(tutorId: string) {
  try {
    return await db.tutorProfile.findUnique({
      where: { id: tutorId },
      include: {
        user: { select: { id: true, name: true, avatar: true, email: true } },
        availability: true,
      },
    });
  } catch {
    return null;
  }
}

export async function updateTutorAvailability(
  tutorId: string,
  slots: { dayOfWeek: number; startTime: string; endTime: string; timezone: string }[]
) {
  try {
    await db.tutorAvailability.deleteMany({ where: { tutorId } });
    await db.tutorAvailability.createMany({
      data: slots.map((s) => ({ ...s, tutorId })),
    });
    return { success: true };
  } catch {
    return { error: "Failed to update availability" };
  }
}
