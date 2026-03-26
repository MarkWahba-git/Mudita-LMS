import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export async function generateCertificate(userId: string, courseId: string) {
  try {
    const existing = await db.certificate.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) return existing;

    const verificationCode = randomBytes(12).toString("hex").toUpperCase();
    return await db.certificate.create({
      data: { userId, courseId, verificationCode, issuedAt: new Date() },
    });
  } catch {
    return null;
  }
}

export async function getCertificates(userId: string) {
  try {
    return await db.certificate.findMany({
      where: { userId },
      include: {
        course: { select: { title: true, slug: true, thumbnail: true } },
      },
      orderBy: { issuedAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function verifyCertificate(code: string) {
  try {
    return await db.certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: { select: { name: true } },
        course: { select: { title: true } },
      },
    });
  } catch {
    return null;
  }
}
