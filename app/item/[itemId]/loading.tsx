import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function ItemLoading() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_460px] lg:px-8">
      <LoadingSkeleton className="aspect-[4/3] w-full" />
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <LoadingSkeleton className="h-8 w-3/4" />
        <LoadingSkeleton className="mt-4 h-5 w-1/3" />
        <LoadingSkeleton className="mt-6 h-32 w-full" />
        <LoadingSkeleton className="mt-6 h-12 w-full rounded-full" />
      </div>
    </div>
  )
}
