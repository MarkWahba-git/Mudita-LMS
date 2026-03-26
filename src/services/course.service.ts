import { db } from "@/lib/db";

interface CourseFilters {
  ageGroup?: string;
  category?: string;
  level?: string;
  search?: string;
}

export function getLocalizedField<
  T extends Record<string, unknown>,
>(entity: T, field: string, locale: string): string {
  if (locale === "ar" && entity[`${field}Ar`]) {
    return entity[`${field}Ar`] as string;
  }
  if (locale === "de" && entity[`${field}De`]) {
    return entity[`${field}De`] as string;
  }
  return (entity[field] as string) ?? "";
}

export async function getCourses(filters: CourseFilters = {}) {
  try {
    const where: Record<string, unknown> = {
      status: "PUBLISHED",
    };

    if (filters.ageGroup) {
      where.ageGroup = filters.ageGroup;
    }
    if (filters.category) {
      where.category = filters.category;
    }
    if (filters.level) {
      where.level = filters.level;
    }
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const courses = await db.course.findMany({
      where,
      include: {
        modules: {
          include: {
            _count: {
              select: { lessons: true },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return courses.map((course) => {
      const lessonCount = course.modules.reduce(
        (sum, mod) => sum + mod._count.lessons,
        0
      );
      return {
        ...course,
        lessonCount,
        enrollmentCount: course._count.enrollments,
      };
    });
  } catch {
    return [];
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const course = await db.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              include: {
                quiz: {
                  select: {
                    id: true,
                    title: true,
                    passingScore: true,
                    timeLimit: true,
                    _count: { select: { questions: true } },
                  },
                },
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!course) return null;

    const lessonCount = course.modules.reduce(
      (sum, mod) => sum + mod.lessons.length,
      0
    );

    const totalDuration = course.modules.reduce(
      (sum, mod) =>
        sum +
        mod.lessons.reduce((lSum, lesson) => lSum + (lesson.duration ?? 0), 0),
      0
    );

    return {
      ...course,
      lessonCount,
      totalDuration,
      enrollmentCount: course._count.enrollments,
    };
  } catch {
    return null;
  }
}

export async function getFeaturedCourses(limit: number = 6) {
  try {
    const courses = await db.course.findMany({
      where: { status: "PUBLISHED" },
      include: {
        modules: {
          include: {
            _count: {
              select: { lessons: true },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { enrollments: { _count: "desc" } },
      take: limit,
    });

    return courses.map((course) => {
      const lessonCount = course.modules.reduce(
        (sum, mod) => sum + mod._count.lessons,
        0
      );
      return {
        ...course,
        lessonCount,
        enrollmentCount: course._count.enrollments,
      };
    });
  } catch {
    return [];
  }
}
