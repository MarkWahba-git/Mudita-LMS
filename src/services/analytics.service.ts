import { db } from "@/lib/db";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function getAdminAnalytics() {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const thirtyDaysAgo = daysAgo(30);

  const [
    // Totals
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalBookings,
    totalProducts,
    totalCertificates,
    pendingTutors,
    // This month
    usersThisMonth,
    enrollmentsThisMonth,
    certificatesThisMonth,
    // Last month
    usersLastMonth,
    enrollmentsLastMonth,
    certificatesLastMonth,
    // Role distribution
    roleDistribution,
    // Enrollment status distribution
    enrollmentStatusDist,
    // Course status distribution
    courseStatusDist,
    // Top courses by enrollment
    topCourses,
    // Recent enrollments
    recentEnrollments,
    // Recent certificates
    recentCertificates,
    // Enrollments last 30 days (for chart)
    enrollments30d,
    // Users last 30 days (for chart)
    users30d,
    // Completion rate
    completedEnrollments,
    // Active students (enrolled in at least 1 active course)
    activeStudents,
  ] = await Promise.all([
    db.user.count(),
    db.course.count(),
    db.enrollment.count(),
    db.booking.count(),
    db.product.count(),
    db.certificate.count(),
    db.tutorProfile.count({ where: { isVerified: false } }),

    db.user.count({ where: { createdAt: { gte: thisMonthStart } } }),
    db.enrollment.count({ where: { enrolledAt: { gte: thisMonthStart } } }),
    db.certificate.count({ where: { issuedAt: { gte: thisMonthStart } } }),

    db.user.count({
      where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
    }),
    db.enrollment.count({
      where: { enrolledAt: { gte: lastMonthStart, lte: lastMonthEnd } },
    }),
    db.certificate.count({
      where: { issuedAt: { gte: lastMonthStart, lte: lastMonthEnd } },
    }),

    db.user.groupBy({ by: ["role"], _count: true }),
    db.enrollment.groupBy({ by: ["status"], _count: true }),
    db.course.groupBy({ by: ["status"], _count: true }),

    db.course.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        slug: true,
        _count: { select: { enrollments: true } },
      },
      orderBy: { enrollments: { _count: "desc" } },
      take: 5,
    }),

    db.enrollment.findMany({
      orderBy: { enrolledAt: "desc" },
      take: 8,
      select: {
        id: true,
        enrolledAt: true,
        status: true,
        progress: true,
        user: { select: { name: true, email: true } },
        course: { select: { title: true, slug: true } },
      },
    }),

    db.certificate.findMany({
      orderBy: { issuedAt: "desc" },
      take: 5,
      select: {
        id: true,
        code: true,
        issuedAt: true,
        user: { select: { name: true } },
      },
    }),

    db.enrollment.findMany({
      where: { enrolledAt: { gte: thirtyDaysAgo } },
      select: { enrolledAt: true },
      orderBy: { enrolledAt: "asc" },
    }),

    db.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),

    db.enrollment.count({ where: { status: "COMPLETED" } }),

    db.enrollment.groupBy({
      by: ["userId"],
      where: { status: "ACTIVE" },
      _count: true,
    }),
  ]);

  // Build 30-day chart data
  const enrollmentsByDay = buildDailyChart(
    enrollments30d.map((e) => e.enrolledAt),
    30
  );
  const usersByDay = buildDailyChart(
    users30d.map((u) => u.createdAt),
    30
  );

  // Compute trends
  function trend(current: number, previous: number) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  return {
    totals: {
      users: totalUsers,
      courses: totalCourses,
      enrollments: totalEnrollments,
      bookings: totalBookings,
      products: totalProducts,
      certificates: totalCertificates,
      pendingTutors,
      activeStudents: activeStudents.length,
      completionRate:
        totalEnrollments > 0
          ? Math.round((completedEnrollments / totalEnrollments) * 100)
          : 0,
    },
    trends: {
      users: trend(usersThisMonth, usersLastMonth),
      enrollments: trend(enrollmentsThisMonth, enrollmentsLastMonth),
      certificates: trend(certificatesThisMonth, certificatesLastMonth),
    },
    thisMonth: {
      users: usersThisMonth,
      enrollments: enrollmentsThisMonth,
      certificates: certificatesThisMonth,
    },
    roleDistribution: roleDistribution.map((r) => ({
      role: r.role,
      count: r._count,
    })),
    enrollmentStatusDist: enrollmentStatusDist.map((e) => ({
      status: e.status,
      count: e._count,
    })),
    courseStatusDist: courseStatusDist.map((c) => ({
      status: c.status,
      count: c._count,
    })),
    topCourses: topCourses.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      enrollments: c._count.enrollments,
    })),
    recentEnrollments,
    recentCertificates,
    charts: {
      enrollmentsByDay,
      usersByDay,
    },
  };
}

function buildDailyChart(dates: Date[], days: number) {
  const counts: Record<string, number> = {};
  const result: { date: string; label: string; count: number }[] = [];

  for (const d of dates) {
    const key = d.toISOString().slice(0, 10);
    counts[key] = (counts[key] || 0) + 1;
  }

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    result.push({ date: key, label, count: counts[key] || 0 });
  }

  return result;
}
