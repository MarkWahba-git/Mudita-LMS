"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema, type RegisterInput } from "@/validators/auth.schema";
import { rateLimit, REGISTER_RATE_LIMIT } from "@/lib/rate-limit";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, email, password, role } = parsed.data;

  const rl = rateLimit(`auth:register:${email.toLowerCase()}`, REGISTER_RATE_LIMIT);
  if (!rl.success) {
    return { error: "Too many attempts. Please try again later." };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: role as "STUDENT" | "PARENT" | "TUTOR",
    },
  });

  return { success: true, userId: user.id };
}
