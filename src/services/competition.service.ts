import { db } from "@/lib/db";

export async function getCompetitions(filters?: { status?: string; ageGroup?: string }) {
  try {
    const where: Record<string, unknown> = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.ageGroup) where.ageGroup = filters.ageGroup;

    return await db.competition.findMany({
      where,
      orderBy: { startDate: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getCompetitionBySlug(slug: string) {
  try {
    return await db.competition.findUnique({
      where: { slug },
      include: {
        registrations: { select: { id: true, userId: true } },
      },
    });
  } catch {
    return null;
  }
}

export async function registerForCompetition(userId: string, competitionId: string) {
  try {
    return await db.competitionRegistration.create({
      data: { userId, competitionId },
    });
  } catch {
    return null;
  }
}
