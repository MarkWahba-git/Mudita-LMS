import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { LessonForm } from "../lesson-form";

export const metadata = { title: "New Lesson | Admin" };

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard");

  const { courseId, moduleId } = await params;

  const [course, mod] = await Promise.all([
    db.course.findUnique({ where: { id: courseId }, select: { id: true, title: true } }),
    db.module.findUnique({
      where: { id: moduleId },
      select: { id: true, title: true, courseId: true, _count: { select: { lessons: true } } },
    }),
  ]);

  if (!course || !mod || mod.courseId !== courseId) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/courses" className="hover:text-foreground">Courses</Link>
        <span>/</span>
        <Link href={`/admin/courses/${courseId}`} className="hover:text-foreground">{course.title}</Link>
        <span>/</span>
        <span>{mod.title}</span>
        <span>/</span>
        <span className="text-foreground font-medium">New Lesson</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">New Lesson</h1>
        <p className="text-muted-foreground">Add a lesson to &quot;{mod.title}&quot;.</p>
      </div>

      <LessonForm
        mode="create"
        courseId={courseId}
        moduleId={moduleId}
        nextOrder={mod._count.lessons}
      />
    </div>
  );
}
