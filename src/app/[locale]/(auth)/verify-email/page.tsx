"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail, sendVerificationEmail } from "@/actions/email-verification.actions";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "no-token">(
    token ? "loading" : "no-token"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!token) return;

    verifyEmail(token).then((result) => {
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Verification failed");
      }
    });
  }, [token]);

  async function handleResend() {
    if (!email) return;
    setResending(true);
    await sendVerificationEmail(email);
    setResending(false);
    setResent(true);
  }

  // Loading state
  if (status === "loading") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">Verifying your email...</h2>
        </CardContent>
      </Card>
    );
  }

  // Success
  if (status === "success") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h2 className="text-xl font-semibold">Email verified!</h2>
          <p className="text-sm text-muted-foreground">
            Your email has been verified. You can now log in.
          </p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Error (invalid/expired token)
  if (status === "error") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <XCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold">Verification failed</h2>
          <p className="text-sm text-muted-foreground">{errorMsg}</p>
          {email && (
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={resending || resent}
            >
              {resending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : resent ? (
                "Sent!"
              ) : (
                "Resend verification email"
              )}
            </Button>
          )}
          <Link href="/login">
            <Button variant="ghost">Back to Login</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // No token — landing page after registration
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <Mail className="h-12 w-12 text-primary" />
        <h2 className="text-xl font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ve sent a verification link to{" "}
          {email ? <strong>{email}</strong> : "your email"}. Click the link to
          activate your account.
        </p>
        {email && !resent && (
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Resend verification email"
            )}
          </Button>
        )}
        {resent && (
          <p className="text-sm text-green-600">Verification email sent!</p>
        )}
        <Link href="/login">
          <Button variant="ghost">Back to Login</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
