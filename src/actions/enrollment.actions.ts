"use server";

import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-helpers";
import { enrollUser, unenroll } from "@/services/enrollment.service";
import {
  markLessonComplete,
  recalculateProgress,
} from "@/services/progress.service";
import {
  enrollInCourseSchema,
  adminEnrollSchema,
  adminUnenrollSchema,
  markLessonDoneSchema,
} from "@/validators/action.schemas";
import { revalidatePath } from "next/cache";

export async function enrollInCourse(courseId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const parsed = enrollInCourseSchema.safeParse({ courseId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const enrollment = await enrollUser(session.user.id, parsed.data.courseId);
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

    const parsed = markLessonDoneSchema.safeParse({ lessonId, courseId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const progress = await markLessonComplete(session.user.id, parsed.data.lessonId);
    if (!progress) {
      return { success: false, error: "Failed to mark lesson complete" };
    }

    const updatedProgress = await recalculateProgress(
      session.user.id,
      parsed.data.courseId
    );

    return { success: true, data: { progress: updatedProgress } };
  } catch (error) {
    console.error("markLessonDone action error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function adminEnrollUser(userId: string, courseId: string) {
  try {
    await requireAdmin();
    const parsed = adminEnrollSchema.safeParse({ userId, courseId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const enrollment = await enrollUser(parsed.data.userId, parsed.data.courseId);
    if (!enrollment) {
      return { success: false, error: "Failed to enroll user (may already be enrolled)" };
    }

    revalidatePath("/admin/courses");
    return { success: true, data: enrollment };
  } catch (error) {
    console.error("adminEnrollUser error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function adminUnenrollUser(userId: string, courseId: string) {
  try {
    await requireAdmin();
    const parsed = adminUnenrollSchema.safeParse({ userId, courseId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const result = await unenroll(parsed.data.userId, parsed.data.courseId);
    if (!result.success) {
      return { success: false, error: "Failed to unenroll user" };
    }

    revalidatePath("/admin/courses");
    return { success: true };
  } catch (error) {
    console.error("adminUnenrollUser error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
