import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export async function generateCertificate(userId: string, courseId: string) {
  try {
    const existing = await db.certificate.findFirst({
      where: { userId, courseId },
    });
    if (existing) return existing;

    const code = randomBytes(12).toString("hex").toUpperCase();
    return await db.certificate.create({
      data: { userId, courseId, code, issuedAt: new Date() },
    });
  } catch {
    return null;
  }
}

export async function getCertificates(userId: string) {
  try {
    const certs = await db.certificate.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
    });

    // Manually fetch course info since Certificate has no course relation
    const courseIds = [...new Set(certs.map((c) => c.courseId))];
    const courses = await db.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, title: true, slug: true, thumbnail: true },
    });
    const courseMap = new Map(courses.map((c) => [c.id, c]));

    return certs.map((cert) => ({
      ...cert,
      course: courseMap.get(cert.courseId) ?? { id: cert.courseId, title: "Unknown Course", slug: "", thumbnail: null },
    }));
  } catch {
    return [];
  }
}

export async function verifyCertificate(verificationCode: string) {
  try {
    const cert = await db.certificate.findUnique({
      where: { code: verificationCode },
      include: { user: { select: { name: true } } },
    });
    if (!cert) return null;

    const course = await db.course.findUnique({
      where: { id: cert.courseId },
      select: { title: true },
    });

    return { ...cert, course };
  } catch {
    return null;
  }
}
