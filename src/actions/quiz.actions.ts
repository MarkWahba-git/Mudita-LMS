"use server";

import { auth } from "@/lib/auth";
import { submitAttempt } from "@/services/quiz.service";

export async function submitQuizAttempt(
  quizId: string,
  answers: Record<string, string>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const result = await submitAttempt(session.user.id, quizId, answers);
    if (!result) {
      return { success: false, error: "Failed to submit quiz attempt" };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("submitQuizAttempt action error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
