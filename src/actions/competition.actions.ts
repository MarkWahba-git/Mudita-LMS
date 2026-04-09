"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers";
import {
  registerForCompetition as registerForCompetitionService,
  updateRegistrationScore,
  calculateRanks,
} from "@/services/competition.service";
import {
  registerForCompetitionSchema,
  updateScoreSchema,
} from "@/validators/action.schemas";
import { db } from "@/lib/db";

export async function registerForCompetition(competitionId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const parsed = registerForCompetitionSchema.safeParse({ competitionId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const result = await registerForCompetitionService(session.user.id, parsed.data.competitionId);
    if (!result) return { success: false, error: "Failed to register for competition" };

    revalidatePath("/competitions");
    return { success: true };
  } catch (error) {
    console.error("registerForCompetition action error:", error);
    return { success: false, error: "Failed to register" };
  }
}

/**
 * Admin: set a score for one participant registration.
 */
export async function updateParticipantScore(registrationId: string, score: number) {
  try {
    await requireAdmin();

    const parsed = updateScoreSchema.safeParse({ registrationId, score });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await updateRegistrationScore(parsed.data.registrationId, parsed.data.score);

    // Find the competition to revalidate the correct paths
    const reg = await db.competitionRegistration.findUnique({
      where: { id: parsed.data.registrationId },
      select: { competitionId: true },
    });

    if (reg) {
      revalidatePath(`/admin/competitions/${reg.competitionId}`);
    }

    return { success: true };
  } catch (error) {
    console.error("updateParticipantScore error:", error);
    return { success: false, error: "Failed to update score" };
  }
}

/**
 * Admin: recalculate and save ranks for all scored participants.
 */
export async function calculateCompetitionRanks(competitionId: string) {
  try {
    await requireAdmin();

    await calculateRanks(competitionId);

    // Fetch the competition slug for path revalidation
    const competition = await db.competition.findUnique({
      where: { id: competitionId },
      select: { slug: true },
    });

    revalidatePath(`/admin/competitions/${competitionId}`);
    if (competition?.slug) {
      revalidatePath(`/competitions/${competition.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error("calculateCompetitionRanks error:", error);
    return { success: false, error: "Failed to calculate ranks" };
  }
}
