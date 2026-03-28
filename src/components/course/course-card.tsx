import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { BookOpen, Users, Clock } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    title: string;
    thumbnail: string | null;
    level: string;
    ageGroup: string;
    category: string;
    duration: number | null;
    lessonCount: number;
    enrollmentCount: number;
  };
}

const categoryGradients: Record<string, string> = {
  math: "from-blue-500 to-indigo-600",
  coding: "from-green-500 to-emerald-600",
  science: "from-purple-500 to-violet-600",
  robotics: "from-orange-500 to-red-600",
  engineering: "from-yellow-500 to-amber-600",
  ai: "from-cyan-500 to-blue-600",
  electronics: "from-teal-500 to-green-600",
  biology: "from-lime-500 to-green-600",
  chemistry: "from-pink-500 to-rose-600",
  physics: "from-slate-500 to-gray-600",
};

const categoryIcons: Record<string, string> = {
  math: "∑",
  coding: "</>",
  science: "🔬",
  robotics: "🤖",
  engineering: "⚙️",
  ai: "🧠",
  electronics: "⚡",
  biology: "🧬",
  chemistry: "⚗️",
  physics: "⚛️",
};

const ageGroupLabels: Record<string, string> = {
  AGES_3_5: "Ages 3-5",
  AGES_6_8: "Ages 6-8",
  AGES_9_12: "Ages 9-12",
  AGES_13_15: "Ages 13-15",
  AGES_16_18: "Ages 16-18",
};

const levelLabels: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function CourseCard({ course }: CourseCardProps) {
  const gradient =
    categoryGradients[course.category] ?? "from-gray-500 to-gray-600";
  const icon = categoryIcons[course.category] ?? "📚";

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div
          className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${gradient}`}
        >
          <span className="text-5xl opacity-80">{icon}</span>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-xs">
              {course.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">
            {course.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {ageGroupLabels[course.ageGroup] ?? course.ageGroup}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {levelLabels[course.level] ?? course.level}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="flex items-center gap-4 border-t px-4 py-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.lessonCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.enrollmentCount}
          </span>
          {course.duration != null && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}m
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
