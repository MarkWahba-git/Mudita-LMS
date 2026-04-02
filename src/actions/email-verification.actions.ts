"use server";

import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { sendEmailVerification } from "@/lib/email";

/**
 * Send a verification email to the user.
 * Called after registration.
 */
export async function sendVerificationEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, emailVerified: true },
    });

    if (!user || user.emailVerified) {
      return { success: true }; // Already verified or doesn't exist
    }

    // Delete existing tokens
    await db.verificationToken.deleteMany({
      where: { identifier: `email-verify:${user.email}` },
    });

    // Generate token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.verificationToken.create({
      data: {
        identifier: `email-verify:${user.email}`,
        token,
        expires,
      },
    });

    await sendEmailVerification(user.email, token);

    return { success: true };
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
    return { success: false, error: "Failed to send verification email" };
  }
}

/**
 * Verify the email with the provided token.
 */
export async function verifyEmail(token: string) {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid verification link" };
    }

    if (verificationToken.expires < new Date()) {
      await db.verificationToken.delete({ where: { token } });
      return { success: false, error: "Verification link has expired. Please request a new one." };
    }

    const email = verificationToken.identifier.replace("email-verify:", "");

    await db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    await db.verificationToken.delete({ where: { token } });

    return { success: true };
  } catch (error) {
    console.error("verifyEmail error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
