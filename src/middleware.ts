import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/navigation";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const intlMiddleware = createIntlMiddleware(routing);

// Role-to-path mapping for dashboard routes
const ROLE_ROUTES: Record<string, string[]> = {
  STUDENT: ["/student"],
  PARENT: ["/parent"],
  TUTOR: ["/tutor"],
  ADMIN: ["/admin"],
  SUPER_ADMIN: ["/admin"],
  B2B_PARTNER: ["/admin"],
};

// Routes that require authentication (any role)
const AUTH_REQUIRED_PREFIXES = ["/student", "/parent", "/tutor", "/admin"];

// Routes restricted to admin roles only
const ADMIN_PREFIXES = ["/admin"];

// Admin roles
const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN", "B2B_PARTNER"];

async function getTokenPayload(req: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;

  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return payload as { id?: string; role?: string; name?: string; email?: string };
  } catch {
    // Invalid or expired token
    return null;
  }
}

function stripLocale(pathname: string): string {
  // Remove locale prefix (e.g., /en/student → /student, /ar/admin → /admin)
  const localePattern = /^\/(en|ar|de)(\/|$)/;
  return pathname.replace(localePattern, "/");
}

export default async function middleware(req: NextRequest) {
  // Run i18n middleware first
  const intlResponse = intlMiddleware(req);

  const pathname = req.nextUrl.pathname;
  const strippedPath = stripLocale(pathname);

  // Check if this is a protected dashboard route
  const needsAuth = AUTH_REQUIRED_PREFIXES.some((prefix) =>
    strippedPath.startsWith(prefix)
  );

  if (!needsAuth) {
    return intlResponse;
  }

  // Decode JWT for auth check
  const payload = await getTokenPayload(req);

  if (!payload?.id) {
    // Not authenticated — redirect to login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = payload.role || "STUDENT";

  // Check admin routes
  const isAdminRoute = ADMIN_PREFIXES.some((prefix) =>
    strippedPath.startsWith(prefix)
  );
  if (isAdminRoute && !ADMIN_ROLES.includes(role)) {
    // Non-admin trying to access admin routes
    const dashboardUrl = new URL(`/${role.toLowerCase()}`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Check role-specific routes (student accessing /tutor, etc.)
  const allowedPaths = ROLE_ROUTES[role] || [];
  const isAllowed = allowedPaths.some((prefix) =>
    strippedPath.startsWith(prefix)
  );

  if (!isAllowed) {
    // Redirect to user's own dashboard
    const ownDashboard = allowedPaths[0] || "/student";
    const redirectUrl = new URL(ownDashboard, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|ar|de)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
