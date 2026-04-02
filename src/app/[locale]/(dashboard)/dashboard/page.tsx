"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import type { Role } from "@/config/navigation";
import { Loader2 } from "lucide-react";

const roleRedirectMap: Record<Role, string> = {
  STUDENT: "/student",
  PARENT: "/parent",
  TUTOR: "/tutor",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin",
  B2B_PARTNER: "/admin",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const role = (session?.user as { role?: Role } | undefined)?.role;
    if (role && roleRedirectMap[role]) {
      router.replace(roleRedirectMap[role]);
    }
  }, [session, status, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  );
}
