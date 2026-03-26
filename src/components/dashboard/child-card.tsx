import { Link } from "@/i18n/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ChildCardProps {
  child: {
    id: string;
    name: string;
    avatar: string | null;
    enrollments: Array<{
      progress: number;
      status: string;
      course: { title: string };
    }>;
  };
}

export function ChildCard({ child }: ChildCardProps) {
  const totalEnrollments = child.enrollments.length;
  const completed = child.enrollments.filter((e) => e.status === "COMPLETED").length;
  const avgProgress =
    totalEnrollments > 0
      ? Math.round(
          child.enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrollments
        )
      : 0;

  const initials = child.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      href={`/parent/children/${child.id}`}
      className="block rounded-xl border bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {child.avatar ? (
            <img src={child.avatar} alt={child.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{child.name}</p>
          <p className="text-sm text-muted-foreground">
            {totalEnrollments} course{totalEnrollments !== 1 ? "s" : ""} · {completed} completed
          </p>
        </div>
      </div>

      {totalEnrollments > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Overall progress</span>
            <span>{avgProgress}%</span>
          </div>
          <Progress value={avgProgress} className="h-2" />
        </div>
      )}
    </Link>
  );
}
