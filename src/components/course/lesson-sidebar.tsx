import { Link } from "@/i18n/navigation";
import { CheckCircle, Circle, PlayCircle } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration?: number | null;
  order: number;
}

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: string[];
  courseSlug: string;
}

export function LessonSidebar({
  lessons,
  currentLessonId,
  completedLessonIds,
  courseSlug,
}: LessonSidebarProps) {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <nav className="w-72 shrink-0 rounded-xl border bg-white">
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Course Content</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {completedLessonIds.length}/{lessons.length} lessons completed
        </p>
      </div>
      <ul className="divide-y">
        {sorted.map((lesson) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const isCurrent = lesson.id === currentLessonId;
          return (
            <li key={lesson.id}>
              <Link
                href={`/student/learn/${courseSlug}/${lesson.id}`}
                className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted ${
                  isCurrent ? "bg-primary/5 font-medium text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </span>
                <span className="flex-1 leading-snug">{lesson.title}</span>
                {lesson.duration && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {Math.round(lesson.duration / 60)}m
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
