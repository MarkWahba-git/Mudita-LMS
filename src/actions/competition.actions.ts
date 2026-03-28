"use server";

import { auth } from "@/lib/auth";
import { registerForCompetition as registerForCompetitionService } from "@/services/competition.service";
import { revalidatePath } from "next/cache";

export async function registerForCompetition(competitionId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Not authenticated" };

    const result = await registerForCompetitionService(session.user.id, competitionId);
    if (!result) return { success: false, error: "Failed to register for competition" };

    revalidatePath("/competitions");
    return { success: true };
  } catch (error) {
    console.error("registerForCompetition action error:", error);
    return { success: false, error: "Failed to register" };
  }
}
