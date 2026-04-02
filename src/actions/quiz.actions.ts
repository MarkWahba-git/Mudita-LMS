"use server";

import { auth } from "@/lib/auth";
import { submitAttempt } from "@/services/quiz.service";
import { submitQuizAttemptSchema } from "@/validators/action.schemas";

export async function submitQuizAttempt(
  quizId: string,
  answers: Record<string, string>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const parsed = submitQuizAttemptSchema.safeParse({ quizId, answers });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const result = await submitAttempt(session.user.id, parsed.data.quizId, parsed.data.answers);
    if (!result) {
      return { success: false, error: "Failed to submit quiz attempt" };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("submitQuizAttempt action error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
