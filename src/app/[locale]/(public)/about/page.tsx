import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Mudita LMS",
  description:
    "Learn about Mudita LMS, our mission, vision, and the team behind STEM education for children ages 3-18.",
};

export default function AboutPage() {
  const t = useTranslations("about");

  const team = [
    { nameKey: "team.member1.name", roleKey: "team.member1.role" },
    { nameKey: "team.member2.name", roleKey: "team.member2.role" },
    { nameKey: "team.member3.name", roleKey: "team.member3.role" },
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </section>

      {/* Mission Section */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">{t("mission.title")}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("mission.text")}
        </p>
      </section>

      {/* Vision Section */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">{t("vision.title")}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("vision.text")}
        </p>
      </section>

      {/* Team Section */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold">
          {t("team.title")}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {team.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                {t(member.nameKey)}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(member.roleKey)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
