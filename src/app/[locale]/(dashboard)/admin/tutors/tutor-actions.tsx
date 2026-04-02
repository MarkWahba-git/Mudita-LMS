"use client";

import { useTransition } from "react";
import { verifyTutor, rejectTutor, deleteTutorProfile } from "@/actions/tutor.actions";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

export function VerifyTutorButton({ tutorId }: { tutorId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(async () => {
        const result = await verifyTutor(tutorId);
        if (!result.success) alert(result.error);
      })}
      disabled={isPending}
      className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
      title="Approve tutor"
    >
      <CheckCircle className="h-3.5 w-3.5" />
      Approve
    </button>
  );
}

export function RejectTutorButton({ tutorId }: { tutorId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(async () => {
        const result = await rejectTutor(tutorId);
        if (!result.success) alert(result.error);
      })}
      disabled={isPending}
      className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
      title="Revoke verification"
    >
      <XCircle className="h-3.5 w-3.5" />
      Revoke
    </button>
  );
}

export function DeleteTutorButton({ tutorId, name }: { tutorId: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete tutor profile for "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteTutorProfile(tutorId);
      if (!result.success) alert(result.error);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete tutor profile"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
