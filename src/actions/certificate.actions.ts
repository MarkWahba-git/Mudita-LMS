"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { generateCertificate } from "@/services/certificate.service";
import { cuidSchema } from "@/validators/action.schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const issueCertificateSchema = z.object({
  userId: cuidSchema,
  courseId: cuidSchema,
});

export async function adminIssueCertificate(userId: string, courseId: string) {
  try {
    await requireAdmin();
    const parsed = issueCertificateSchema.safeParse({ userId, courseId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const cert = await generateCertificate(parsed.data.userId, parsed.data.courseId);
    if (!cert) {
      return { success: false, error: "Failed to issue certificate" };
    }

    revalidatePath("/admin/certificates");
    return { success: true, data: cert };
  } catch (error) {
    console.error("adminIssueCertificate error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function adminRevokeCertificate(certificateId: string) {
  try {
    await requireAdmin();
    const parsed = cuidSchema.safeParse(certificateId);
    if (!parsed.success) return { success: false, error: "Invalid certificate ID" };

    await db.certificate.delete({ where: { id: parsed.data } });

    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error) {
    console.error("adminRevokeCertificate error:", error);
    return { success: false, error: "Failed to revoke certificate" };
  }
}
