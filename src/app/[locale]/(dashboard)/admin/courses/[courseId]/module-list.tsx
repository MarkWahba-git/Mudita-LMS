"use client";

import { useState, useTransition } from "react";
import { Link } from "@/i18n/navigation";
import { createModule, deleteModule } from "@/actions/course-content.actions";

interface Lesson {
  id: string;
  title: string;
  type: string;
  order: number;
  isFree: boolean;
  duration: number | null;
  videoUrl: string | null;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Props {
  courseId: string;
  modules: Module[];
}

const TYPE_ICONS: Record<string, string> = {
  VIDEO: "🎥",
  TEXT: "📄",
  QUIZ: "📝",
  INTERACTIVE: "🧪",
  ASSIGNMENT: "📋",
};

export function ModuleList({ courseId, modules }: Props) {
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleAddModule() {
    if (!newModuleTitle.trim()) return;
    startTransition(async () => {
      const result = await createModule({
        courseId,
        title: newModuleTitle.trim(),
        order: modules.length,
      });
      if (result.success) {
        setNewModuleTitle("");
        setShowAddModule(false);
      } else {
        alert(result.error);
      }
    });
  }

  function handleDeleteModule(moduleId: string) {
    if (!confirm("Delete this module and all its lessons?")) return;
    setDeletingId(moduleId);
    startTransition(async () => {
      const result = await deleteModule(moduleId);
      if (!result.success) alert(result.error);
      setDeletingId(null);
    });
  }

  function formatDuration(seconds: number | null) {
    if (!seconds) return "";
    const mins = Math.floor(seconds / 60);
    return `${mins}m`;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Modules & Lessons</h2>
        <button
          onClick={() => setShowAddModule(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          + Add Module
        </button>
      </div>

      {/* Add module form */}
      {showAddModule && (
        <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
          <input
            type="text"
            placeholder="Module title..."
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddModule()}
            autoFocus
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddModule}
            disabled={pending || !newModuleTitle.trim()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {pending ? "Adding..." : "Add"}
          </button>
          <button
            onClick={() => { setShowAddModule(false); setNewModuleTitle(""); }}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Module list */}
      {modules.length === 0 && !showAddModule ? (
        <div className="rounded-lg border bg-white p-8 text-center text-muted-foreground">
          No modules yet. Add your first module to start building course content.
        </div>
      ) : (
        modules.map((mod) => (
          <div key={mod.id} className="rounded-lg border bg-white">
            {/* Module header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {mod.order + 1}
                </span>
                <h3 className="font-semibold">{mod.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/courses/${courseId}/modules/${mod.id}/edit`}
                  className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/courses/${courseId}/modules/${mod.id}/lessons/new`}
                  className="rounded px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
                >
                  + Lesson
                </Link>
                <button
                  onClick={() => handleDeleteModule(mod.id)}
                  disabled={pending && deletingId === mod.id}
                  className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === mod.id ? "..." : "Delete"}
                </button>
              </div>
            </div>

            {/* Lesson list */}
            {mod.lessons.length === 0 ? (
              <div className="px-4 py-4 text-center text-sm text-muted-foreground">
                No lessons yet.{" "}
                <Link
                  href={`/admin/courses/${courseId}/modules/${mod.id}/lessons/new`}
                  className="text-primary hover:underline"
                >
                  Add a lesson
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base" title={lesson.type}>
                        {TYPE_ICONS[lesson.type] ?? "📄"}
                      </span>
                      <div>
                        <span className="text-sm font-medium">{lesson.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{lesson.type}</span>
                          {lesson.duration && <span>&middot; {formatDuration(lesson.duration)}</span>}
                          {lesson.isFree && (
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-green-800">Free</span>
                          )}
                          {lesson.videoUrl && <span>&middot; Has video</span>}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/admin/courses/${courseId}/modules/${mod.id}/lessons/${lesson.id}/edit`}
                      className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
