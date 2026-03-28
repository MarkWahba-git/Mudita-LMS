import { CheckCircle, Lock } from "lucide-react";

interface BadgeDisplayProps {
  badge: {
    id: string;
    name: string;
    description: string;
    icon: string;
    points?: number;
  };
  earned: boolean;
  earnedAt?: Date | null;
}

export function BadgeDisplay({ badge, earned, earnedAt }: BadgeDisplayProps) {
  return (
    <div
      className={`relative rounded-xl border bg-card p-5 text-center transition-all ${
        earned ? "border-primary/30 shadow-sm" : "opacity-50 grayscale"
      }`}
    >
      {earned && (
        <div className="absolute right-3 top-3">
          <CheckCircle className="h-4 w-4 text-green-500" />
        </div>
      )}
      {!earned && (
        <div className="absolute right-3 top-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      <div
        className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
          earned ? "bg-primary/10" : "bg-muted"
        }`}
      >
        {badge.icon || "🏅"}
      </div>

      <h3 className="font-semibold text-sm">{badge.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{badge.description}</p>

      {earned && earnedAt && (
        <p className="mt-2 text-xs text-green-600">
          Earned {new Date(earnedAt).toLocaleDateString()}
        </p>
      )}
      {!earned && (
        <p className="mt-2 text-xs text-muted-foreground">Locked</p>
      )}
    </div>
  );
}
