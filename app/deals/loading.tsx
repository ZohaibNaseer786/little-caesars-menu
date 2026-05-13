import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function DealsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <LoadingSkeleton className="h-10 w-72 max-w-full" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} className="h-80 w-full" />
        ))}
      </div>
    </div>
  )
}
