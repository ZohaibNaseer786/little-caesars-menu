import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function StoresLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <LoadingSkeleton className="h-12 w-full" />
      <div className="mt-6 grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingSkeleton key={index} className="h-36 w-full" />
        ))}
      </div>
    </div>
  )
}
