"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { addChildAccountSchema, removeChildSchema } from "@/validators/action.schemas";

export async function addChildAccount(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const parsed = addChildAccountSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    const child = await db.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: "STUDENT",
      },
    });

    await db.parentChild.create({
      data: {
        parentId: session.user.id,
        childId: child.id,
      },
    });

    return { success: true, data: { childId: child.id } };
  } catch (error) {
    console.error("addChildAccount action error:", error);
    return { success: false, error: "Failed to add child account" };
  }
}

export async function removeChild(childId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const parsed = removeChildSchema.safeParse({ childId });
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

    await db.parentChild.delete({
      where: {
        parentId_childId: {
          parentId: session.user.id,
          childId: parsed.data.childId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("removeChild action error:", error);
    return { success: false, error: "Failed to remove child" };
  }
}
