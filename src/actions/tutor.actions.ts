"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTutorByUserId, updateTutorAvailability } from "@/services/tutor.service";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";

export async function submitTutorApplication(data: {
  bio: string;
  hourlyRate: number;
  subjects: string[];
  languages: string[];
  headline?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const existing = await getTutorByUserId(session.user.id);
    if (existing) return { success: false, error: "Tutor profile already exists" };

    await db.tutorProfile.create({
      data: {
        userId: session.user.id,
        bio: data.bio,
        hourlyRate: data.hourlyRate,
        subjects: data.subjects,
        languages: data.languages,
        headline: data.headline,
      },
    });

    revalidatePath("/tutor");
    return { success: true };
  } catch (error) {
    console.error("submitTutorApplication error:", error);
    return { success: false, error: "Failed to submit application" };
  }
}

export async function updateTutorProfile(data: {
  bio?: string;
  hourlyRate?: number;
  subjects?: string[];
  languages?: string[];
  headline?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const tutor = await getTutorByUserId(session.user.id);
    if (!tutor) return { success: false, error: "Tutor profile not found" };

    await db.tutorProfile.update({
      where: { id: tutor.id },
      data: {
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.hourlyRate !== undefined && { hourlyRate: data.hourlyRate }),
        ...(data.subjects !== undefined && { subjects: data.subjects }),
        ...(data.languages !== undefined && { languages: data.languages }),
        ...(data.headline !== undefined && { headline: data.headline }),
      },
    });

    revalidatePath("/tutor/profile");
    return { success: true };
  } catch (error) {
    console.error("updateTutorProfile error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function setAvailability(
  slots: { dayOfWeek: number; startTime: string; endTime: string; timezone: string }[]
) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const tutor = await getTutorByUserId(session.user.id);
    if (!tutor) return { success: false, error: "Tutor profile not found" };

    const result = await updateTutorAvailability(tutor.id, slots);
    if ("error" in result) return { success: false, error: result.error };

    revalidatePath("/tutor/availability");
    return { success: true };
  } catch (error) {
    console.error("setAvailability error:", error);
    return { success: false, error: "Failed to update availability" };
  }
}

// ── Admin actions ───────────────────────────────────────────────────────

export async function verifyTutor(tutorProfileId: string) {
  try {
    await requireAdmin();
    await db.tutorProfile.update({
      where: { id: tutorProfileId },
      data: { isVerified: true },
    });
    revalidatePath("/admin/tutors");
    return { success: true };
  } catch (error) {
    console.error("verifyTutor error:", error);
    return { success: false, error: "Failed to verify tutor" };
  }
}

export async function rejectTutor(tutorProfileId: string) {
  try {
    await requireAdmin();
    await db.tutorProfile.update({
      where: { id: tutorProfileId },
      data: { isVerified: false },
    });
    revalidatePath("/admin/tutors");
    return { success: true };
  } catch (error) {
    console.error("rejectTutor error:", error);
    return { success: false, error: "Failed to reject tutor" };
  }
}

export async function deleteTutorProfile(tutorProfileId: string) {
  try {
    await requireAdmin();
    await db.tutorProfile.delete({ where: { id: tutorProfileId } });
    revalidatePath("/admin/tutors");
    return { success: true };
  } catch (error) {
    console.error("deleteTutorProfile error:", error);
    return { success: false, error: "Failed to delete tutor profile" };
  }
}
