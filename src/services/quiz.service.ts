import { db } from "@/lib/db";

export async function getQuizByLessonId(lessonId: string) {
  try {
    const quiz = await db.quiz.findUnique({
      where: { lessonId },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: {
            answers: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    return quiz;
  } catch (error) {
    console.error("Failed to get quiz by lesson id:", error);
    return null;
  }
}

export async function getQuizById(quizId: string) {
  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: {
            answers: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });
    return quiz;
  } catch (error) {
    console.error("Failed to get quiz by id:", error);
    return null;
  }
}

export async function submitAttempt(
  userId: string,
  quizId: string,
  answers: Record<string, string>
) {
  try {
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!quiz) return null;

    let totalPoints = 0;
    let earnedPoints = 0;
    const questionResults: Array<{
      questionId: string;
      correct: boolean;
      correctAnswerId: string;
      selectedAnswerId: string;
    }> = [];

    for (const question of quiz.questions) {
      totalPoints += question.points;
      const selectedAnswerId = answers[question.id];
      const correctAnswer = question.answers.find((a) => a.isCorrect);

      const isCorrect = correctAnswer
        ? selectedAnswerId === correctAnswer.id
        : false;

      if (isCorrect) {
        earnedPoints += question.points;
      }

      questionResults.push({
        questionId: question.id,
        correct: isCorrect,
        correctAnswerId: correctAnswer?.id ?? "",
        selectedAnswerId: selectedAnswerId ?? "",
      });
    }

    const score =
      totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;

    const attempt = await db.quizAttempt.create({
      data: {
        quizId,
        userId,
        score,
        passed,
        answers: questionResults,
        completedAt: new Date(),
      },
    });

    return {
      attemptId: attempt.id,
      score,
      passed,
      totalPoints,
      earnedPoints,
      passingScore: quiz.passingScore,
      questionResults,
    };
  } catch (error) {
    console.error("Failed to submit quiz attempt:", error);
    return null;
  }
}

export async function getUserAttempts(userId: string, quizId: string) {
  try {
    const attempts = await db.quizAttempt.findMany({
      where: { userId, quizId },
      orderBy: { startedAt: "desc" },
    });
    return attempts;
  } catch (error) {
    console.error("Failed to get user attempts:", error);
    return [];
  }
}
