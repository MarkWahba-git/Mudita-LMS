import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DataTable } from "@/components/shared/data-table";
import { Link } from "@/i18n/navigation";

export const metadata = { title: "Manage Courses | Admin" };

export default async function AdminCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const courses = await db.course.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      ageGroup: true,
      level: true,
      isFree: true,
      price: true,
      _count: { select: { enrollments: true } },
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const tableData = courses.map((c) => ({
    id: c.id,
    title: c.title,
    status: c.status,
    ageGroup: c.ageGroup,
    level: c.level,
    price: c.isFree ? "Free" : `$${Number(c.price).toFixed(2)}`,
    enrollments: c._count.enrollments,
    created: new Date(c.createdAt).toLocaleDateString(),
  }));

  const statusColors: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    ARCHIVED: "bg-gray-100 text-gray-600",
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "status",
      label: "Status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[String(row.status)] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {String(row.status)}
        </span>
      ),
    },
    { key: "ageGroup", label: "Age Group" },
    { key: "level", label: "Level" },
    { key: "price", label: "Price" },
    { key: "enrollments", label: "Enrollments" },
    { key: "created", label: "Created" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground">{courses.length} total courses</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + New Course
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={tableData as Record<string, unknown>[]}
        emptyMessage="No courses found."
      />
    </div>
  );
}
