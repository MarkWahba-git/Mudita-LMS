"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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

    const passwordHash = await bcrypt.hash(data.password, 12);

    const child = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
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

    await db.parentChild.delete({
      where: {
        parentId_childId: {
          parentId: session.user.id,
          childId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("removeChild action error:", error);
    return { success: false, error: "Failed to remove child" };
  }
}
