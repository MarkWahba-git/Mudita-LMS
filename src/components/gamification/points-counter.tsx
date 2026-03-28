interface PointsCounterProps {
  points: number;
}

export function PointsCounter({ points }: PointsCounterProps) {
  const formatted = new Intl.NumberFormat().format(points);

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
      <span>⭐</span>
      <span>{formatted} pts</span>
    </div>
  );
}
