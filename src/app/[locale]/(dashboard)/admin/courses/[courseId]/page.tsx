import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { ModuleList } from "./module-list";

export const metadata = { title: "Course Content | Admin" };

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard");

  const { courseId } = await params;

  const course = await db.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      ageGroup: true,
      level: true,
      category: true,
      isFree: true,
      price: true,
      _count: { select: { enrollments: true } },
      modules: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          order: true,
          lessons: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              type: true,
              order: true,
              isFree: true,
              duration: true,
              videoUrl: true,
              quiz: { select: { id: true } },
            },
          },
        },
      },
    },
  }).catch(() => null);

  if (!course) notFound();

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const statusColors: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    ARCHIVED: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/courses" className="hover:text-foreground">Courses</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{course.title}</span>
      </div>

      {/* Course header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[course.status] ?? "bg-gray-100"}`}>
              {course.status}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">
            {course.modules.length} modules &middot; {totalLessons} lessons &middot; {course._count.enrollments} enrollments
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="inline-flex items-center rounded-lg border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Edit Course
          </Link>
        </div>
      </div>

      {/* Course quick info */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-muted-foreground">Age Group</div>
          <div className="font-medium">{course.ageGroup.replace("AGES_", "").replace("_", "-")}</div>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-muted-foreground">Level</div>
          <div className="font-medium">{course.level.charAt(0) + course.level.slice(1).toLowerCase()}</div>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-muted-foreground">Category</div>
          <div className="font-medium">{course.category}</div>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-muted-foreground">Price</div>
          <div className="font-medium">{course.isFree ? "Free" : `$${Number(course.price).toFixed(2)}`}</div>
        </div>
      </div>

      {/* Module + Lesson management */}
      <ModuleList courseId={course.id} modules={course.modules} />
    </div>
  );
}
