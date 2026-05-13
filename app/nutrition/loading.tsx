import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const flyerAspectRatio = '1275 / 1650'

export default function NutritionLoading() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="mx-auto w-full max-w-[1280px] px-5 pb-7 pt-9 sm:px-6 sm:pb-8 sm:pt-12 xl:px-3">
        <LoadingSkeleton className="h-11 w-72 max-w-full rounded-none" />
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-y-4 px-0 pb-8 sm:grid-cols-2 sm:gap-y-0 sm:px-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="mx-auto w-full max-w-[720px] bg-white p-4 sm:max-w-none" style={{ aspectRatio: flyerAspectRatio }}>
            <LoadingSkeleton className="h-full w-full rounded-none" />
          </div>
        ))}
      </section>
    </div>
  )
}
