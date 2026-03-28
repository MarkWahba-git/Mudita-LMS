import { Link } from "@/i18n/navigation";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  passingScore: number;
  courseSlug?: string;
  onRetry?: () => void;
}

export function QuizResults({
  score,
  totalQuestions,
  passingScore,
  courseSlug,
  onRetry,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= passingScore;

  return (
    <div className="flex flex-col items-center py-8 text-center">
      {passed ? (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Trophy className="h-10 w-10 text-green-600" />
        </div>
      ) : (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-500" />
        </div>
      )}

      <h2 className="text-2xl font-bold">
        {passed ? "Congratulations!" : "Better luck next time!"}
      </h2>
      <p className="mt-1 text-muted-foreground">
        {passed ? "You passed the quiz." : `You need ${passingScore}% to pass.`}
      </p>

      <div className="mt-6 flex gap-8">
        <div className="text-center">
          <p className="text-4xl font-bold text-primary">{percentage}%</p>
          <p className="mt-1 text-sm text-muted-foreground">Your score</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold">
            {score}/{totalQuestions}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Correct answers</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
        )}
        {courseSlug ? (
          <Link
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            <CheckCircle className="h-4 w-4" />
            Back to course
          </Link>
        ) : (
          <Link
            href="/student/courses"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            My courses
          </Link>
        )}
      </div>
    </div>
  );
}
