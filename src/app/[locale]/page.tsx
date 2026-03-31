import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  Globe,
  Search,
  Trophy,
  Video,
  Wrench,
  Gamepad2,
  ArrowRight,
  CheckCircle2,
  Quote,
  Building2,
  Monitor,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mudita — Joyful STEM Learning for Children Ages 3–18",
  description:
    "Interactive STEM courses, live expert tutoring, and hands-on science kits for children ages 3 to 18. Available in English, Arabic, and German.",
};

const stats = [
  { value: "5,000+", key: "students" },
  { value: "120+", key: "courses" },
  { value: "50+", key: "tutors" },
  { value: "30+", key: "countries" },
];

const ageGroups = [
  {
    range: "3–5",
    label: "Early Learners",
    color: "bg-pink-100 text-pink-700 border-pink-200",
    iconBg: "bg-pink-50",
    icon: "🧒",
  },
  {
    range: "6–8",
    label: "Kids",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    iconBg: "bg-blue-50",
    icon: "👦",
  },
  {
    range: "9–12",
    label: "Juniors",
    color: "bg-green-100 text-green-700 border-green-200",
    iconBg: "bg-green-50",
    icon: "🧑",
  },
  {
    range: "13–18",
    label: "Teens",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    iconBg: "bg-purple-50",
    icon: "🎓",
  },
];

const howSteps = [
  { num: "1", icon: Search, titleKey: "howStep1Title", descKey: "howStep1Desc" },
  { num: "2", icon: BookOpen, titleKey: "howStep2Title", descKey: "howStep2Desc" },
  { num: "3", icon: Trophy, titleKey: "howStep3Title", descKey: "howStep3Desc" },
];

const differentiators = [
  { icon: Video, titleKey: "whyReason1Title", descKey: "whyReason1Desc", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Wrench, titleKey: "whyReason2Title", descKey: "whyReason2Desc", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: BarChart3, titleKey: "whyReason3Title", descKey: "whyReason3Desc", color: "text-green-500", bg: "bg-green-50" },
  { icon: Globe, titleKey: "whyReason4Title", descKey: "whyReason4Desc", color: "text-orange-500", bg: "bg-orange-50" },
];

const testimonials = [
  { quoteKey: "testimonial1Quote", nameKey: "testimonial1Name", roleKey: "testimonial1Role" },
  { quoteKey: "testimonial2Quote", nameKey: "testimonial2Name", roleKey: "testimonial2Role" },
  { quoteKey: "testimonial3Quote", nameKey: "testimonial3Name", roleKey: "testimonial3Role" },
];

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:shadow-xl"
              >
                {t("heroCta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-colors"
              >
                {t("heroCtaSecondary")}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground">
            {t("trustBar")}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`stats.${stat.key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            {t("howItWorks")}
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {howSteps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-md">
                  {step.num}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t("ageGroups")}</h2>
            <p className="mt-4 text-muted-foreground">{t("ageGroupsSubtitle")}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ageGroups.map((group) => (
              <Link
                key={group.range}
                href="/courses"
                className="group flex flex-col items-center rounded-2xl border border-border p-8 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <span className="text-4xl">{group.icon}</span>
                <span
                  className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-semibold ${group.color}`}
                >
                  Ages {group.range}
                </span>
                <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  {group.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Mudita Different */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            {t("whyMudita")}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div key={item.titleKey} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{t(item.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
            {t("testimonials")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.nameKey}
                className="rounded-2xl border border-border p-8"
              >
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t(item.quoteKey)}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{t(item.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(item.roleKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Schools Teaser */}
      <section className="bg-foreground py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">{t("forSchools")}</h2>
              <p className="mt-4 text-lg text-white/70">{t("forSchoolsDesc")}</p>
              <Link
                href="/for-schools"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/90 transition-colors"
              >
                {t("forSchoolsCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Monitor, label: "Admin Dashboard" },
                { icon: GraduationCap, label: "120+ Courses" },
                { icon: BarChart3, label: "Analytics & Reports" },
                { icon: Gamepad2, label: "Gamified Learning" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="rounded-xl bg-white/10 p-5"
                >
                  <feature.icon className="h-6 w-6 text-white/80" />
                  <p className="mt-2 text-sm font-medium text-white/80">{feature.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("ctaTitle")}</h2>
          <p className="mt-4 text-lg text-white/80">{t("ctaSubtitle")}</p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:bg-white/90 transition-all"
          >
            {t("ctaButton")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
