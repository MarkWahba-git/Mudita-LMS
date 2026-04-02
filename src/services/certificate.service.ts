import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { sendCertificateEmail } from "@/lib/email";

export async function generateCertificate(userId: string, courseId: string) {
  try {
    const existing = await db.certificate.findFirst({
      where: { userId, courseId },
    });
    if (existing) return existing;

    const code = randomBytes(12).toString("hex").toUpperCase();
    const cert = await db.certificate.create({
      data: { userId, courseId, code, issuedAt: new Date() },
    });

    // Send certificate email (non-blocking)
    try {
      const [user, course] = await Promise.all([
        db.user.findUnique({ where: { id: userId }, select: { email: true, name: true } }),
        db.course.findUnique({ where: { id: courseId }, select: { title: true } }),
      ]);
      if (user?.email && course) {
        sendCertificateEmail(user.email, user.name || "Student", course.title, code).catch(() => null);
      }
    } catch {
      // non-critical
    }

    return cert;
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
