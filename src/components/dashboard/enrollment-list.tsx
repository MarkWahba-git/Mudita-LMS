import { Link } from "@/i18n/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface EnrollmentListProps {
  enrollments: Array<{
    id: string;
    progress: number;
    status: string;
    course: {
      id: string;
      title: string;
      slug: string;
      thumbnail: string | null;
      category: string;
    };
  }>;
}

export function EnrollmentList({ enrollments }: EnrollmentListProps) {
  if (enrollments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
        <BookOpen className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">No courses yet</p>
        <Link
          href="/courses"
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          Browse courses
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y rounded-xl border bg-white">
      {enrollments.map((enrollment) => (
        <li key={enrollment.id}>
          <Link
            href={`/student/courses`}
            className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg">
              📚
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{enrollment.course.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <Progress value={enrollment.progress} className="h-1.5 flex-1" />
                <span className="shrink-0 text-xs text-muted-foreground">
                  {enrollment.progress}%
                </span>
              </div>
            </div>
            <Badge
              variant={enrollment.status === "COMPLETED" ? "default" : "secondary"}
              className="shrink-0 text-xs"
            >
              {enrollment.status === "COMPLETED" ? "Done" : "In progress"}
            </Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}
