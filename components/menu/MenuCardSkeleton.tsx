import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export function MenuCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-card">
      <LoadingSkeleton className="aspect-video w-full" />
      <LoadingSkeleton className="mt-4 h-4 w-3/4" />
      <LoadingSkeleton className="mt-2 h-4 w-1/2" />
      <LoadingSkeleton className="mt-5 h-10 w-full rounded-full" />
    </div>
  )
}
