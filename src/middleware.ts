import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication (any role)
const AUTH_REQUIRED_PREFIXES = ["/student", "/parent", "/tutor", "/admin"];

// Admin roles that can access /admin routes
const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN", "B2B_PARTNER"];

// Role-to-dashboard mapping
const ROLE_DASHBOARDS: Record<string, string> = {
  STUDENT: "/student",
  PARENT: "/parent",
  TUTOR: "/tutor",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin",
  B2B_PARTNER: "/admin",
};

// Role-to-allowed-prefixes mapping
const ROLE_ALLOWED: Record<string, string[]> = {
  STUDENT: ["/student"],
  PARENT: ["/parent"],
  TUTOR: ["/tutor"],
  ADMIN: ["/admin"],
  SUPER_ADMIN: ["/admin"],
  B2B_PARTNER: ["/admin"],
};

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar|de)(\/|$)/, "/");
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const strippedPath = stripLocale(pathname);

  // Check if this is a protected dashboard route
  const needsAuth = AUTH_REQUIRED_PREFIXES.some((prefix) =>
    strippedPath.startsWith(prefix)
  );

  // For non-protected routes, just run i18n middleware
  if (!needsAuth) {
    return intlMiddleware(req);
  }

  // Decode session token for protected routes
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token?.id) {
    // Not authenticated — redirect to login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (token.role as string) || "STUDENT";

  // Check admin routes
  const isAdminRoute = strippedPath.startsWith("/admin");
  if (isAdminRoute && !ADMIN_ROLES.includes(role)) {
    const dashboard = ROLE_DASHBOARDS[role] || "/student";
    return NextResponse.redirect(new URL(dashboard, req.url));
  }

  // Check role-specific routes
  const allowedPaths = ROLE_ALLOWED[role] || ["/student"];
  const isAllowed = allowedPaths.some((prefix) =>
    strippedPath.startsWith(prefix)
  );

  if (!isAllowed) {
    const dashboard = ROLE_DASHBOARDS[role] || "/student";
    return NextResponse.redirect(new URL(dashboard, req.url));
  }

  // Authorized — run i18n middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/",
    "/(en|ar|de)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
