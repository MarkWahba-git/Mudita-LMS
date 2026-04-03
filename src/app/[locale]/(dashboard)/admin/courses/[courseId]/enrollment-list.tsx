"use client";

import { useState, useTransition } from "react";
import { adminEnrollUser, adminUnenrollUser } from "@/actions/enrollment.actions";
import { useRouter } from "@/i18n/navigation";

interface Enrollment {
  id: string;
  userId: string;
  status: string;
  progress: number;
  enrolledAt: string | Date;
  user: {
    name: string;
    email: string;
  };
}

interface EnrollmentListProps {
  courseId: string;
  enrollments: Enrollment[];
}

export function EnrollmentList({ courseId, enrollments }: EnrollmentListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      // We need to look up user by email first — use a simple fetch approach
      // For now, we'll pass userId directly since the action expects it
      // This requires the admin to know the userId — let's improve this
      const res = await adminEnrollUser(email.trim(), courseId);
      if (!res.success) {
        setError(res.error || "Failed to enroll user");
      } else {
        setEmail("");
        setShowAddForm(false);
        router.refresh();
      }
    });
  }

  function handleUnenroll(userId: string) {
    if (!confirm("Remove this student from the course?")) return;
    startTransition(async () => {
      await adminUnenrollUser(userId, courseId);
      router.refresh();
    });
  }

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    EXPIRED: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Enrolled Students ({enrollments.length})
        </h2>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {showAddForm ? "Cancel" : "+ Enroll Student"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleEnroll} className="flex gap-2 items-start">
          <div className="flex-1">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="User ID (from Users page)"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              required
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {isPending ? "Enrolling..." : "Enroll"}
          </button>
        </form>
      )}

      {enrollments.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No students enrolled yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Student</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
                <th className="px-4 py-2.5 text-left font-medium">Progress</th>
                <th className="px-4 py-2.5 text-left font-medium">Enrolled</th>
                <th className="px-4 py-2.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-medium">{enrollment.user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {enrollment.user.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[enrollment.status] ?? "bg-gray-100"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {enrollment.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleUnenroll(enrollment.userId)}
                      disabled={isPending}
                      className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                    >
                      Remove
                    </button>
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
