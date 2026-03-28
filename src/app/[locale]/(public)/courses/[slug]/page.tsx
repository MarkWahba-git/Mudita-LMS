import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getCourseBySlug } from "@/services/course.service";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Award, ChevronDown, Play } from "lucide-react";

interface CourseDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | Mudita LMS`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const [course, session] = await Promise.all([getCourseBySlug(slug), auth()]);

  if (!course) notFound();

  const totalMinutes = Math.round((course.totalDuration ?? 0) / 60);

  const ageLabel: Record<string, string> = {
    AGES_3_5: "3–5",
    AGES_6_8: "6–8",
    AGES_9_12: "9–12",
    AGES_13_15: "13–15",
    AGES_16_18: "16–18",
  };

  const levelColors: Record<string, string> = {
    BEGINNER: "bg-green-100 text-green-800",
    INTERMEDIATE: "bg-yellow-100 text-yellow-800",
    ADVANCED: "bg-red-100 text-red-800",
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/courses" className="hover:text-primary">
                Courses
              </Link>
              <span>/</span>
              <span>{course.title}</span>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {course.ageGroup && (
                <Badge variant="secondary">Ages {ageLabel[course.ageGroup] ?? course.ageGroup}</Badge>
              )}
              {course.level && (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    levelColors[course.level] ?? "bg-gray-100 text-gray-800"
                  }`}
                >
                  {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                </span>
              )}
              {course.category && (
                <Badge variant="outline">{course.category}</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>

            <p className="mt-4 text-muted-foreground">{course.description}</p>

            {/* Stats row */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessonCount} lessons</span>
              </div>
              {totalMinutes > 0 && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{totalMinutes} min total</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{course.enrollmentCount} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Certificate included</span>
              </div>
            </div>
          </div>

          {/* Enroll Card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="mb-4 w-full rounded-lg object-cover aspect-video"
                />
              ) : (
                <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-muted">
                  <Play className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              <div className="mb-4 text-center">
                <span className="text-3xl font-bold">
                  {course.isFree ? "Free" : course.price ? `$${course.price}` : "Free"}
                </span>
              </div>

              {session?.user ? (
                <Link
                  href={`/student/courses`}
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Enroll Now
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Sign up to Enroll
                </Link>
              )}
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Full lifetime access
              </p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-bold">Course Content</h2>
          {course.modules.length === 0 ? (
            <p className="text-muted-foreground">No content available yet.</p>
          ) : (
            <div className="divide-y rounded-xl border bg-white">
              {course.modules.map((mod) => (
                <details key={mod.id} className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium hover:bg-muted">
                    <span>{mod.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {mod.lessons.length} lessons
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </div>
                  </summary>
                  <ul className="divide-y border-t bg-muted/30">
                    {mod.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-muted-foreground"
                      >
                        <Play className="h-3.5 w-3.5 shrink-0" />
                        <span className="flex-1">{lesson.title}</span>
                        {lesson.duration && (
                          <span>{Math.round(lesson.duration / 60)}m</span>
                        )}
                        {lesson.isFree && (
                          <Badge variant="secondary" className="text-xs">
                            Free preview
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
