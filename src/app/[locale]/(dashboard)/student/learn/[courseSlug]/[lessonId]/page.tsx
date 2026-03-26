import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCourseBySlug } from "@/services/course.service";
import { getLessonProgress } from "@/services/progress.service";
import { LessonSidebar } from "@/components/course/lesson-sidebar";
import { VideoPlayer } from "@/components/course/video-player";
import { MarkCompleteButton } from "@/components/course/mark-complete-button";

interface LessonPageProps {
  params: Promise<{ courseSlug: string; lessonId: string; locale: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const course = await getCourseBySlug(courseSlug);
  if (!course) notFound();

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const lesson = allLessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();

  const progressRecords = await getLessonProgress(session.user.id, course.id);
  const completedLessonIds = progressRecords
    .filter((p) => p.completed)
    .map((p) => p.lessonId);

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{course.title}</p>
          <h1 className="text-xl font-bold">{lesson.title}</h1>
        </div>

        {lesson.videoUrl ? (
          <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-muted text-muted-foreground">
            No video available
          </div>
        )}

        {lesson.content && (
          <div className="mt-6 rounded-xl border bg-white p-6">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <MarkCompleteButton
            lessonId={lessonId}
            courseId={course.id}
            isCompleted={completedLessonIds.includes(lessonId)}
            nextLessonId={nextLesson?.id}
            courseSlug={courseSlug}
          />
        </div>
      </div>

      {/* Sidebar */}
      <LessonSidebar
        lessons={allLessons}
        currentLessonId={lessonId}
        completedLessonIds={completedLessonIds}
        courseSlug={courseSlug}
      />
    </div>
  );
}
