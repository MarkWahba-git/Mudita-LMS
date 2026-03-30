import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Mudita LMS",
  description:
    "Explore flexible pricing plans for Mudita LMS STEM education programs for children ages 3-18.",
};
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function PricingPage() {
  const t = useTranslations("pricing");

  const plans = [
    { key: "free", featured: false },
    { key: "pro", featured: true },
    { key: "school", featured: false },
  ] as const;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {plans.map((plan) => {
          const features = t.raw(`${plan.key}.features`) as string[];

          return (
            <Card
              key={plan.key}
              className={`relative flex flex-col ${
                plan.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Recommended
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle>{t(`${plan.key}.name`)}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {t(`${plan.key}.price`)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}/ {t(`${plan.key}.period`)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link
                  href="/register"
                  className={`flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    plan.featured
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border border-input bg-background hover:bg-muted"
                  }`}
                >
                  {t(`${plan.key}.cta`)}
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
