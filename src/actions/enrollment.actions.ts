"use server";

import { auth } from "@/lib/auth";
import { enrollUser } from "@/services/enrollment.service";
import {
  markLessonComplete,
  recalculateProgress,
} from "@/services/progress.service";

export async function enrollInCourse(courseId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const enrollment = await enrollUser(session.user.id, courseId);
    if (!enrollment) {
      return { success: false, error: "Failed to enroll" };
    }

    return { success: true, data: enrollment };
  } catch (error) {
    console.error("enrollInCourse action error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function markLessonDone(lessonId: string, courseId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const progress = await markLessonComplete(session.user.id, lessonId);
    if (!progress) {
      return { success: false, error: "Failed to mark lesson complete" };
    }

    const updatedProgress = await recalculateProgress(
      session.user.id,
      courseId
    );

    return { success: true, data: { progress: updatedProgress } };
  } catch (error) {
    console.error("markLessonDone action error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
