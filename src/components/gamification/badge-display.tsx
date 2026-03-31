import { CheckCircle, Lock, Sparkles } from "lucide-react";

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
      className={`group relative overflow-hidden rounded-2xl border-2 bg-card p-6 text-center transition-all ${
        earned
          ? "border-amber-300 shadow-md hover:shadow-lg hover-lift"
          : "border-border opacity-60 grayscale hover:opacity-80"
      }`}
    >
      {/* Earned glow effect */}
      {earned && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-transparent" />
      )}

      {/* Status icon */}
      {earned ? (
        <div className="absolute right-3 top-3">
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-600" />
            <span className="text-[10px] font-semibold text-green-700">Earned</span>
          </div>
        </div>
      ) : (
        <div className="absolute right-3 top-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Badge icon */}
      <div
        className={`relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl transition-transform group-hover:scale-110 ${
          earned
            ? "bg-gradient-to-br from-amber-100 to-orange-100 shadow-inner"
            : "bg-muted"
        }`}
      >
        {badge.icon || "🏅"}
        {earned && (
          <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-400 animate-sparkle" />
        )}
      </div>

      <h3 className="relative font-display text-sm font-bold text-foreground">{badge.name}</h3>
      <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {badge.description}
      </p>

      {badge.points && (
        <div className="relative mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          +{badge.points} XP
        </div>
      )}

      {earned && earnedAt && (
        <p className="relative mt-2 text-[11px] text-green-600 font-medium">
          {new Date(earnedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
