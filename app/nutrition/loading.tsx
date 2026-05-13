import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

const flyerAspectRatio = '1275 / 1650'

export default function NutritionLoading() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="mx-auto w-full max-w-[2048px] px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <LoadingSkeleton className="mx-auto mb-4 h-4 w-44 rounded-none sm:mx-0" />
        <LoadingSkeleton className="mx-auto h-8 w-80 max-w-full rounded-none" />
      </section>

      <section className="mx-auto grid w-full max-w-[2048px] grid-cols-1 items-start gap-x-8 gap-y-10 px-0 pb-12 sm:px-6 md:grid-cols-2 xl:grid-cols-3 2xl:px-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="mx-auto w-full max-w-[680px] bg-white md:max-w-none" style={{ aspectRatio: flyerAspectRatio }}>
            <LoadingSkeleton className="h-full w-full rounded-none" />
          </div>
        ))}
      </section>
    </div>
  )
}
