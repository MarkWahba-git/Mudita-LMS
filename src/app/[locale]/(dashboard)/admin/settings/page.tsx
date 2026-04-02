import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole, isSuperAdmin } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { SettingsForm } from "./settings-form";
import { AddSettingForm } from "./add-setting-form";

export const metadata = { title: "System Settings | Admin" };

const CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  email: "Email",
  payments: "Payments",
  branding: "Branding",
  notifications: "Notifications",
};

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard");

  const canEdit = isSuperAdmin(session.user.role);

  const settings = await db.systemSetting.findMany({
    orderBy: [{ category: "asc" }, { key: "asc" }],
  }).catch(() => []);

  // Group by category
  type Setting = { id: string; key: string; value: string; type: string; category: string; label: string; description: string | null; updatedAt: Date };
  const grouped: Record<string, Setting[]> = {};
  for (const s of settings) {
    const cat = s.category || "general";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  }

  const categories = Object.keys(grouped).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          {settings.length} settings across {categories.length} categories
        </p>
      </div>

      {settings.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-muted-foreground">
            No settings defined yet. {canEdit ? "Add settings below or run the seed script." : "Ask a Super Admin to configure settings."}
          </p>
        </div>
      ) : (
        categories.map((category) => (
          <div key={category} className="rounded-lg border bg-white">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">
                {CATEGORY_LABELS[category] || category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
            </div>
            <div className="p-6">
              <SettingsForm settings={grouped[category]} canEdit={canEdit} />
            </div>
          </div>
        ))
      )}

      {canEdit && (
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Add Setting</h2>
          <AddSettingForm />
        </div>
      )}
    </div>
  );
}
