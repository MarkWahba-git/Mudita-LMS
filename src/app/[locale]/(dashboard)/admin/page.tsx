import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Users, BookOpen, GraduationCap, Calendar } from "lucide-react";

export const metadata = { title: "Admin Dashboard | Mudita LMS" };

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const [userCount, courseCount, enrollmentCount, bookingCount] = await Promise.all([
    db.user.count().catch(() => 0),
    db.course.count().catch(() => 0),
    db.enrollment.count().catch(() => 0),
    db.booking.count().catch(() => 0),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={userCount}
          icon={<Users className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Courses"
          value={courseCount}
          icon={<BookOpen className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Enrollments"
          value={enrollmentCount}
          icon={<GraduationCap className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Bookings"
          value={bookingCount}
          icon={<Calendar className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="/admin/users"
          className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <Users className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-semibold">Manage Users</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            View, edit roles, and manage user accounts.
          </p>
        </a>
        <a
          href="/admin/courses"
          className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <BookOpen className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-semibold">Manage Courses</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and publish courses.
          </p>
        </a>
        <a
          href="/admin/badges"
          className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <GraduationCap className="mb-3 h-8 w-8 text-primary" />
          <h3 className="font-semibold">Manage Badges</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage gamification badges.
          </p>
        </a>
      </div>
    </div>
  );
}
