import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getCompetitionBySlug } from "@/services/competition.service";
import { registerForCompetition } from "@/actions/competition.actions";

interface CompetitionDetailPageProps {
  params: Promise<{ slug: string }>;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  UPCOMING: { label: "Upcoming", color: "bg-blue-100 text-blue-700" },
  REGISTRATION_OPEN: { label: "Registration Open", color: "bg-green-100 text-green-700" },
  IN_PROGRESS: { label: "In Progress", color: "bg-green-100 text-green-700" },
  JUDGING: { label: "Judging", color: "bg-yellow-100 text-yellow-700" },
  COMPLETED: { label: "Completed", color: "bg-gray-100 text-gray-600" },
};

export default async function CompetitionDetailPage({
  params,
}: CompetitionDetailPageProps) {
  const { slug } = await params;
  const competition = await getCompetitionBySlug(slug);
  if (!competition) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const isRegistered = userId
    ? competition.registrations.some((r) => r.userId === userId)
    : false;

  const config = statusConfig[competition.status] ?? {
    label: competition.status,
    color: "bg-gray-100 text-gray-600",
  };

  const canRegister =
    competition.status === "UPCOMING" || competition.status === "REGISTRATION_OPEN";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <a
        href="/competitions"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        ← Back to Competitions
      </a>

      <div className="space-y-4">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-3xl font-bold flex-1">{competition.title}</h1>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-xl border bg-card p-5 text-sm">
          <div>
            <p className="text-muted-foreground">Start</p>
            <p className="font-medium">{new Date(competition.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">End</p>
            <p className="font-medium">{new Date(competition.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Registration Ends</p>
            <p className="font-medium">{new Date(competition.registrationEnd).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Participants</p>
            <p className="font-medium">
              {competition.registrations.length}
              {competition.maxParticipants ? ` / ${competition.maxParticipants}` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="text-muted-foreground whitespace-pre-line">{competition.description}</p>
      </div>

      {competition.rules && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Rules</h2>
          <p className="text-muted-foreground whitespace-pre-line">{competition.rules}</p>
        </div>
      )}

      {competition.prizes && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Prizes</h2>
          <div className="rounded-xl border bg-card p-5">
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {JSON.stringify(competition.prizes, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card p-6">
        {!userId ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-3">Sign in to register for this competition.</p>
            <a
              href="/login"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Sign In
            </a>
          </div>
        ) : isRegistered ? (
          <div className="text-center">
            <p className="text-2xl">✅</p>
            <p className="mt-2 font-semibold text-green-700">You are registered!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Good luck in the competition!
            </p>
          </div>
        ) : canRegister ? (
          <div className="text-center">
            <p className="font-semibold mb-3">Ready to compete?</p>
            <form
              action={async () => {
                "use server";
                await registerForCompetition(competition.id);
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Register Now
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Registration is not currently open.
          </p>
        )}
      </div>
    </div>
  );
}
