import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getQuizById } from "@/services/quiz.service";
import { QuizPlayer } from "@/components/quiz/quiz-player";

interface QuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const quiz = await getQuizById(quizId);
  if (!quiz) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <QuizPlayer quiz={quiz} />
    </div>
  );
}
