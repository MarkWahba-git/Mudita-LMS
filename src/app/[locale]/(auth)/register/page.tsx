"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/validators/auth.schema";
import { registerUser } from "@/actions/auth.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { Loader2, GraduationCap, Users, BookOpen } from "lucide-react";

const roles = [
  { value: "STUDENT" as const, icon: GraduationCap, key: "roleStudent" },
  { value: "PARENT" as const, icon: Users, key: "roleParent" },
  { value: "TUTOR" as const, icon: BookOpen, key: "roleTutor" },
];

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "STUDENT" },
  });

  const selectedRole = watch("role");

  async function onSubmit(data: RegisterInput) {
    setLoading(true);
    setError("");

    const result = await registerUser(data);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Auto sign in after registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Redirect to verify email page
    router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{t("registerTitle")}</CardTitle>
        <CardDescription>{t("registerSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-2">
            <Label>{t("role")}</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setValue("role", role.value)}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-sm transition-colors ${
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <role.icon className="h-5 w-5" />
                  {t(role.key)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("registerTitle")}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t("orContinueWith")}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          {t("google")}
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t("loginTitle")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
