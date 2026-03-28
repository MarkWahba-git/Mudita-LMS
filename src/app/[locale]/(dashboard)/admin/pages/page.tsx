import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export const metadata = { title: "CMS Pages | Admin | Mudita LMS" };

export default async function AdminPagesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  let pages: Array<{ id: string; title: string; slug: string; isPublished: boolean; updatedAt: Date }> = [];
  try {
    pages = await db.page.findMany({ orderBy: { updatedAt: "desc" } });
  } catch { /* no db */ }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">CMS Pages</h1>
        <p className="text-muted-foreground">{pages.length} pages</p>
      </div>

      {pages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <FileText className="mb-3 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No CMS pages yet</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">/{p.slug}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.isPublished ? "default" : "secondary"}>
                      {p.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
