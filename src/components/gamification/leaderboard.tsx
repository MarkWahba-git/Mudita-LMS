import { Avatar } from "@/components/ui/avatar";

interface LeaderboardEntry {
  rank: number;
  user: { id?: string; name: string; avatar: string | null };
  totalPoints: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const rankEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export function Leaderboard({ entries }: LeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
        No leaderboard data yet.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="divide-y">
        {entries.map((entry) => {
          const initials = entry.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div
              key={entry.rank}
              className="flex items-center gap-4 px-5 py-3"
            >
              <span className="w-8 text-center text-lg font-bold">
                {rankEmoji[entry.rank] ?? `#${entry.rank}`}
              </span>
              <Avatar
                src={entry.user.avatar ?? undefined}
                fallback={initials}
                size="sm"
              />
              <span className="flex-1 font-medium">{entry.user.name}</span>
              <span className="text-sm font-semibold text-amber-600">
                ⭐ {new Intl.NumberFormat().format(entry.totalPoints)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
