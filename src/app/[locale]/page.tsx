import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  GraduationCap,
  Users,
  BarChart3,
  Globe,
  BookOpen,
  Award,
  Rocket,
  ArrowRight,
} from "lucide-react";

const stats = [
  { value: "5,000+", key: "students" },
  { value: "120+", key: "courses" },
  { value: "50+", key: "tutors" },
  { value: "30+", key: "countries" },
];

const ageGroups = [
  { range: "3–5", label: "Early Learners", color: "bg-pink-100 text-pink-700", emoji: "🧒" },
  { range: "6–8", label: "Kids", color: "bg-blue-100 text-blue-700", emoji: "👦" },
  { range: "9–12", label: "Juniors", color: "bg-green-100 text-green-700", emoji: "🧑" },
  { range: "13–18", label: "Teens", color: "bg-purple-100 text-purple-700", emoji: "🎓" },
];

const whyReasons = [
  { icon: GraduationCap, titleKey: "whyReason1Title", descKey: "whyReason1Desc", color: "text-blue-500" },
  { icon: BookOpen, titleKey: "whyReason2Title", descKey: "whyReason2Desc", color: "text-purple-500" },
  { icon: BarChart3, titleKey: "whyReason3Title", descKey: "whyReason3Desc", color: "text-green-500" },
  { icon: Globe, titleKey: "whyReason4Title", descKey: "whyReason4Desc", color: "text-orange-500" },
];

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col">
      {/* Navbar placeholder for home - will be replaced in public layout */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">Mudita</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {tc("enrollNow").replace("Enroll Now", "Courses")}
            </Link>
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {tc("login")}
            </Link>
            <Link href="/register" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
              {tc("register")}
            </Link>
          </nav>
        </div>
      </header>

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
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-colors"
              >
                {tc("learnMore")}
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient blobs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t(`stats.${stat.key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Age Groups */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">{t("ageGroups")}</h2>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ageGroups.map((group) => (
              <Link
                key={group.range}
                href="/courses"
                className="group flex flex-col items-center rounded-2xl border border-border p-8 text-center transition-all hover:border-primary hover:shadow-lg"
              >
                <span className="text-4xl">{group.emoji}</span>
                <span className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-semibold ${group.color}`}>
                  {group.range}
                </span>
                <span className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  {group.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Mudita */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">{t("whyMudita")}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyReasons.map((reason) => (
              <div key={reason.titleKey} className="rounded-2xl bg-white p-8 shadow-sm">
                <reason.icon className={`h-10 w-10 ${reason.color}`} />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{t(reason.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(reason.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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

      {/* Footer placeholder */}
      <footer className="border-t bg-foreground py-12 text-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-white">Mudita</span>
            </div>
            <p className="text-sm">© 2026 Mudita. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
