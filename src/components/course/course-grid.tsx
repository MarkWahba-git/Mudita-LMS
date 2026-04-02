import { CourseCard } from "@/components/course/course-card";

interface CourseGridProps {
  courses: Array<{
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
    isFree?: boolean;
    price?: unknown;
    currency?: string;
  }>;
}

export function CourseGrid({ courses }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <div className="mb-4 text-5xl">📚</div>
        <h3 className="mb-2 text-lg font-semibold text-muted-foreground">
          No courses found
        </h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or check back later for new courses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
