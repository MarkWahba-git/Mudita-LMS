import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadgeDisplay } from "@/components/gamification/badge-display";
import { createBadge } from "@/actions/admin.actions";

export const metadata = { title: "Manage Badges | Admin" };

export default async function AdminBadgesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const badges = await db.badge.findMany({ orderBy: { name: "asc" } }).catch(() => []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Badges</h1>
        <p className="text-muted-foreground">{badges.length} badge{badges.length !== 1 ? "s" : ""} configured</p>
      </div>

      {badges.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {badges.map((badge) => (
            <BadgeDisplay
              key={badge.id}
              badge={badge}
              earned={true}
            />
          ))}
        </div>
      )}

      <div className="rounded-xl border bg-card p-6 max-w-lg">
        <h2 className="mb-1 text-lg font-semibold">Create New Badge</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Define a new achievement badge for students.
        </p>
        <form
          action={async (fd: FormData) => {
            "use server";
            const name = fd.get("name") as string;
            const description = fd.get("description") as string;
            const icon = fd.get("icon") as string;
            const minPoints = fd.get("minPoints") as string;
            const minEnrollments = fd.get("minEnrollments") as string;
            const points = parseInt(fd.get("points") as string) || 0;

            const criteria: Record<string, unknown> = {};
            if (minPoints) criteria.minPoints = parseInt(minPoints);
            if (minEnrollments) criteria.minEnrollments = parseInt(minEnrollments);

            await createBadge({ name, description, icon, criteria, points });
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name *</label>
            <input
              name="name"
              required
              placeholder="First Steps"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Description *</label>
            <input
              name="description"
              required
              placeholder="Complete your first course"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Icon (emoji) *</label>
            <input
              name="icon"
              required
              placeholder="🏅"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Min Points (criteria)
              </label>
              <input
                name="minPoints"
                type="number"
                min="0"
                placeholder="100"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Min Enrollments (criteria)
              </label>
              <input
                name="minEnrollments"
                type="number"
                min="0"
                placeholder="1"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Points Awarded
            </label>
            <input
              name="points"
              type="number"
              min="0"
              placeholder="50"
              defaultValue="0"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Create Badge
          </button>
        </form>
      </div>
    </div>
  );
}
