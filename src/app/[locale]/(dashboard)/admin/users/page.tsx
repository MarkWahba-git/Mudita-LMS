import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { DataTable } from "@/components/shared/data-table";

export const metadata = { title: "Manage Users | Admin" };

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard");

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const tableData = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.isActive ? "Active" : "Inactive",
    joined: new Date(u.createdAt).toLocaleDateString(),
  }));

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row: Record<string, unknown>) => (
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {String(row.role)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {String(row.status)}
        </span>
      ),
    },
    { key: "joined", label: "Joined" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">{users.length} total users</p>
      </div>
      <DataTable
        columns={columns}
        data={tableData as Record<string, unknown>[]}
        emptyMessage="No users found."
      />
    </div>
  );
}
