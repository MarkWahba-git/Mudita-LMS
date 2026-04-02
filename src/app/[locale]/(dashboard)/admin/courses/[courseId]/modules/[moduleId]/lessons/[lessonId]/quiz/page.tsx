import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Link } from "@/i18n/navigation";
import { QuizBuilder } from "./quiz-builder";

export const metadata = { title: "Quiz Builder | Admin" };

export default async function QuizBuilderPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; lessonId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard");

  const { courseId, moduleId, lessonId } = await params;

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: {
      id: true,
      title: true,
      module: {
        select: {
          id: true,
          title: true,
          courseId: true,
          course: { select: { id: true, title: true } },
        },
      },
      quiz: {
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: { answers: { orderBy: { order: "asc" } } },
          },
          _count: { select: { attempts: true } },
        },
      },
    },
  }).catch(() => null);

  if (!lesson || lesson.module.courseId !== courseId || lesson.module.id !== moduleId) notFound();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/courses" className="hover:text-foreground">Courses</Link>
        <span>/</span>
        <Link href={`/admin/courses/${courseId}`} className="hover:text-foreground">
          {lesson.module.course.title}
        </Link>
        <span>/</span>
        <span>{lesson.module.title}</span>
        <span>/</span>
        <span>{lesson.title}</span>
        <span>/</span>
        <span className="text-foreground font-medium">Quiz</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Quiz Builder</h1>
        <p className="text-muted-foreground">
          Manage the quiz for &quot;{lesson.title}&quot;
          {lesson.quiz && ` \u2014 ${lesson.quiz._count.attempts} attempt(s)`}
        </p>
      </div>

      <QuizBuilder
        lessonId={lessonId}
        courseId={courseId}
        quiz={lesson.quiz ? {
          id: lesson.quiz.id,
          title: lesson.quiz.title,
          passingScore: lesson.quiz.passingScore,
          timeLimit: lesson.quiz.timeLimit,
          questions: lesson.quiz.questions.map((q) => ({
            id: q.id,
            text: q.text,
            textAr: q.textAr ?? "",
            textDe: q.textDe ?? "",
            type: q.type,
            points: q.points,
            order: q.order,
            explanation: q.explanation ?? "",
            answers: q.answers.map((a) => ({
              id: a.id,
              text: a.text,
              textAr: a.textAr ?? "",
              textDe: a.textDe ?? "",
              isCorrect: a.isCorrect,
            })),
          })),
        } : null}
      />
    </div>
  );
}
