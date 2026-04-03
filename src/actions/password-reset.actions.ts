"use server";

import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, FORGOT_PASSWORD_RATE_LIMIT } from "@/lib/rate-limit";
import { z } from "zod";

const requestResetSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Request a password reset. Always returns success to prevent email enumeration.
 */
export async function requestPasswordReset(email: string) {
  const parsed = requestResetSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: true }; // Don't reveal validation errors
  }

  const normalizedEmail = parsed.data.email.toLowerCase();

  // Rate limit by email
  const rl = rateLimit(`auth:reset:${normalizedEmail}`, FORGOT_PASSWORD_RATE_LIMIT);
  if (!rl.success) {
    return { success: true }; // Don't reveal rate limiting
  }

  try {
    // Find user
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true },
    });

    // Always return success even if user doesn't exist
    if (!user) {
      return { success: true };
    }

    // Delete any existing tokens for this user
    await db.verificationToken.deleteMany({
      where: { identifier: `pwd-reset:${user.email}` },
    });

    // Generate token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.verificationToken.create({
      data: {
        identifier: `pwd-reset:${user.email}`,
        token,
        expires,
      },
    });

    // Send email
    await sendPasswordResetEmail(user.email, token);

    return { success: true };
  } catch (error) {
    console.error("requestPasswordReset error:", error);
    return { success: true }; // Don't reveal errors
  }
}

/**
 * Complete the password reset with a valid token.
 */
export async function resetPassword(token: string, password: string) {
  const parsed = resetPasswordSchema.safeParse({ token, password });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    // Find the token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token: parsed.data.token },
    });

    if (!verificationToken) {
      return { success: false, error: "Invalid or expired reset link" };
    }

    // Check expiry
    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await db.verificationToken.delete({
        where: { token: parsed.data.token },
      });
      return { success: false, error: "Reset link has expired. Please request a new one." };
    }

    // Extract email from identifier
    const email = verificationToken.identifier.replace("pwd-reset:", "");

    // Hash new password
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    // Update user password
    await db.user.update({
      where: { email },
      data: { passwordHash },
    });

    // Delete the used token
    await db.verificationToken.delete({
      where: { token: parsed.data.token },
    });

    return { success: true };
  } catch (error) {
    console.error("resetPassword error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
