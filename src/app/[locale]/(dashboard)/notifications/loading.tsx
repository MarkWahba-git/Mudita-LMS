import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-1 h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      <div className="rounded-xl border bg-card overflow-hidden divide-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-3 px-5 py-4">
            <Skeleton className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-3 w-12 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
