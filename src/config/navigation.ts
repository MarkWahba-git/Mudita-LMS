export const publicNavItems = [
  { href: "/courses", labelKey: "nav.courses" },
  { href: "/how-it-works", labelKey: "nav.howItWorks" },
  { href: "/for-schools", labelKey: "nav.forSchools" },
  { href: "/pricing", labelKey: "nav.pricing" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export type Role = "STUDENT" | "PARENT" | "TUTOR" | "ADMIN" | "SUPER_ADMIN" | "B2B_PARTNER";

export const dashboardNavItems: Record<
  Role,
  { href: string; labelKey: string; icon: string }[]
> = {
  STUDENT: [
    { href: "/student", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/student/courses", labelKey: "nav.myCourses", icon: "BookOpen" },
    { href: "/student/badges", labelKey: "nav.badges", icon: "Award" },
    {
      href: "/student/certificates",
      labelKey: "nav.certificates",
      icon: "GraduationCap",
    },
    { href: "/student/bookings", labelKey: "nav.bookings", icon: "Calendar" },
  ],
  PARENT: [
    { href: "/parent", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/parent/children", labelKey: "nav.children", icon: "Users" },
    { href: "/parent/orders", labelKey: "nav.orders", icon: "ShoppingBag" },
  ],
  TUTOR: [
    { href: "/tutor", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/tutor/profile", labelKey: "nav.profile", icon: "User" },
    {
      href: "/tutor/availability",
      labelKey: "nav.availability",
      icon: "Clock",
    },
    { href: "/tutor/bookings", labelKey: "nav.bookings", icon: "Calendar" },
    { href: "/tutor/students", labelKey: "nav.students", icon: "Users" },
  ],
  ADMIN: [
    { href: "/admin", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/admin/users", labelKey: "nav.users", icon: "Users" },
    { href: "/admin/courses", labelKey: "nav.courses", icon: "BookOpen" },
    { href: "/admin/products", labelKey: "nav.products", icon: "Package" },
    {
      href: "/admin/competitions",
      labelKey: "nav.competitions",
      icon: "Trophy",
    },
    { href: "/admin/badges", labelKey: "nav.badges", icon: "Award" },
    { href: "/admin/pages", labelKey: "nav.pages", icon: "FileText" },
    { href: "/admin/tutors", labelKey: "nav.tutors", icon: "ShieldCheck" },
    { href: "/admin/roles", labelKey: "nav.roles", icon: "Lock" },
    { href: "/admin/settings", labelKey: "nav.settings", icon: "Settings" },
  ],
  SUPER_ADMIN: [
    { href: "/admin", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/admin/users", labelKey: "nav.users", icon: "Users" },
    { href: "/admin/courses", labelKey: "nav.courses", icon: "BookOpen" },
    { href: "/admin/products", labelKey: "nav.products", icon: "Package" },
    { href: "/admin/competitions", labelKey: "nav.competitions", icon: "Trophy" },
    { href: "/admin/badges", labelKey: "nav.badges", icon: "Award" },
    { href: "/admin/pages", labelKey: "nav.pages", icon: "FileText" },
    { href: "/admin/tutors", labelKey: "nav.tutors", icon: "ShieldCheck" },
    { href: "/admin/roles", labelKey: "nav.roles", icon: "Lock" },
    { href: "/admin/settings", labelKey: "nav.settings", icon: "Settings" },
  ],
  B2B_PARTNER: [
    { href: "/admin", labelKey: "nav.dashboard", icon: "LayoutDashboard" },
    { href: "/admin/users", labelKey: "nav.users", icon: "Users" },
  ],
};
