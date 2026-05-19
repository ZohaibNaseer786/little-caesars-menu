export default function BlogLoading() {
  return (
    <main className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1216px]">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-5 h-12 max-w-xl animate-pulse rounded bg-slate-200" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="h-48 animate-pulse bg-slate-100" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="h-6 animate-pulse rounded bg-slate-200" />
                <div className="h-4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
