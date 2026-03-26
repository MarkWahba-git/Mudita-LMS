import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { getStudentStats } from "@/services/user.service";
import { getUserEnrollments } from "@/services/enrollment.service";
import { StatsCard } from "@/components/dashboard/stats-card";
import { EnrollmentList } from "@/components/dashboard/enrollment-list";
import { BookOpen, Award, Star, FileText } from "lucide-react";

export const metadata = { title: "Student Dashboard | Mudita LMS" };

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect({ href: "/login", locale: "en" });

  const [stats, enrollments] = await Promise.all([
    getStudentStats(session.user.id),
    getUserEnrollments(session.user.id),
  ]);

  const inProgress = enrollments.filter((e) => e.status !== "COMPLETED");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {session.user.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">Here's your learning overview.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Courses Enrolled"
          value={stats.enrollments}
          icon={<BookOpen className="h-5 w-5" />}
          color="blue"
        />
        <StatsCard
          title="Badges Earned"
          value={stats.badges}
          icon={<Award className="h-5 w-5" />}
          color="yellow"
        />
        <StatsCard
          title="Total Points"
          value={stats.totalPoints}
          icon={<Star className="h-5 w-5" />}
          color="purple"
        />
        <StatsCard
          title="Certificates"
          value={stats.certificates}
          icon={<FileText className="h-5 w-5" />}
          color="green"
        />
      </div>

      {/* Continue Learning */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Continue Learning</h2>
        </div>
        <EnrollmentList enrollments={inProgress} />
      </div>
    </div>
  );
}
