import { db } from "@/lib/db";

export async function markLessonComplete(userId: string, lessonId: string) {
  try {
    const progress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        completed: true,
        lastAccess: new Date(),
      },
      create: {
        userId,
        lessonId,
        completed: true,
        lastAccess: new Date(),
      },
    });
    return progress;
  } catch (error) {
    console.error("Failed to mark lesson complete:", error);
    return null;
  }
}

export async function recalculateProgress(userId: string, courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!course) return null;

    const allLessonIds = course.modules.flatMap((m) =>
      m.lessons.map((l) => l.id)
    );
    const totalLessons = allLessonIds.length;

    if (totalLessons === 0) return 0;

    const completedCount = await db.lessonProgress.count({
      where: {
        userId,
        lessonId: { in: allLessonIds },
        completed: true,
      },
    });

    const progressPercent = Math.round((completedCount / totalLessons) * 100);

    const enrollment = await db.enrollment.update({
      where: {
        userId_courseId: { userId, courseId },
      },
      data: {
        progress: progressPercent,
        ...(progressPercent === 100
          ? { status: "COMPLETED", completedAt: new Date() }
          : {}),
      },
    });

    return enrollment.progress;
  } catch (error) {
    console.error("Failed to recalculate progress:", error);
    return null;
  }
}

export async function getLessonProgress(userId: string, courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!course) return [];

    const allLessonIds = course.modules.flatMap((m) =>
      m.lessons.map((l) => l.id)
    );

    const progress = await db.lessonProgress.findMany({
      where: {
        userId,
        lessonId: { in: allLessonIds },
      },
    });

    return progress;
  } catch (error) {
    console.error("Failed to get lesson progress:", error);
    return [];
  }
}
