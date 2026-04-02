import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { ModuleEditForm } from "./module-edit-form";

export const metadata = { title: "Edit Module | Admin" };

export default async function EditModulePage({
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
      select: { id: true, title: true, titleAr: true, titleDe: true, order: true, courseId: true },
    }),
  ]);

  if (!course || !mod || mod.courseId !== courseId) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/courses" className="hover:text-foreground">Courses</Link>
        <span>/</span>
        <Link href={`/admin/courses/${courseId}`} className="hover:text-foreground">{course.title}</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Edit Module</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Edit Module</h1>
        <p className="text-muted-foreground">Update module title and translations.</p>
      </div>

      <ModuleEditForm
        courseId={courseId}
        module={{
          id: mod.id,
          title: mod.title,
          titleAr: mod.titleAr ?? "",
          titleDe: mod.titleDe ?? "",
          order: mod.order,
        }}
      />
    </div>
  );
}
