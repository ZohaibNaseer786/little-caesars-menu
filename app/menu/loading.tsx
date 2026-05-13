import { MenuCardSkeleton } from '@/components/menu/MenuCardSkeleton'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

export default function MenuLoading() {
  return (
    <>
      <section className="bg-white">
        <div className="container-shell py-8">
          <LoadingSkeleton className="h-10 w-80 max-w-full" />
          <LoadingSkeleton className="mt-4 h-5 w-full max-w-2xl" />
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <MenuCardSkeleton key={index} />
        ))}
      </div>
    </>
  )
}
