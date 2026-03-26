import { db } from "@/lib/db";

export async function awardPoints(
  userId: string,
  action: string,
  points: number,
  metadata?: Record<string, unknown>
) {
  try {
    return await db.pointTransaction.create({
      data: { userId, action, points, metadata: metadata ?? {} },
    });
  } catch {
    return null;
  }
}

export async function getUserPoints(userId: string) {
  try {
    const result = await db.pointTransaction.aggregate({
      where: { userId },
      _sum: { points: true },
    });
    return result._sum.points ?? 0;
  } catch {
    return 0;
  }
}

export async function getUserBadges(userId: string) {
  try {
    return await db.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { awardedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getAllBadges() {
  try {
    return await db.badge.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export async function checkAndAwardBadges(userId: string) {
  try {
    const [totalPoints, enrollmentCount, badgesAlreadyEarned] =
      await Promise.all([
        getUserPoints(userId),
        db.enrollment.count({ where: { userId } }),
        db.userBadge.findMany({
          where: { userId },
          select: { badgeId: true },
        }),
      ]);

    const earnedBadgeIds = new Set(badgesAlreadyEarned.map((b) => b.badgeId));
    const allBadges = await db.badge.findMany();

    for (const badge of allBadges) {
      if (earnedBadgeIds.has(badge.id)) continue;
      const criteria = badge.criteria as Record<string, unknown>;
      let earned = false;

      if (criteria?.minPoints && totalPoints >= Number(criteria.minPoints)) {
        earned = true;
      }
      if (
        criteria?.minEnrollments &&
        enrollmentCount >= Number(criteria.minEnrollments)
      ) {
        earned = true;
      }

      if (earned) {
        await db.userBadge.create({
          data: { userId, badgeId: badge.id },
        });
      }
    }
  } catch {
    // silently fail — badge awarding is non-critical
  }
}

export async function getLeaderboard(limit: number = 10) {
  try {
    const results = await db.pointTransaction.groupBy({
      by: ["userId"],
      _sum: { points: true },
      orderBy: { _sum: { points: "desc" } },
      take: limit,
    });

    const userIds = results.map((r) => r.userId);
    const users = await db.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, avatar: true },
    });

    const userMap = new Map(users.map((u) => [u.id, u]));

    return results.map((r, i) => ({
      rank: i + 1,
      user: userMap.get(r.userId) ?? { id: r.userId, name: "Unknown", avatar: null },
      totalPoints: r._sum.points ?? 0,
    }));
  } catch {
    return [];
  }
}
