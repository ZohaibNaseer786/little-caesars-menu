export default function BlogPostLoading() {
  return (
    <main className="bg-white">
      <section className="bg-[#f4f6f8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-2">
          <div>
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-8 h-14 max-w-xl animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-14 max-w-lg animate-pulse rounded bg-slate-200" />
            <div className="mt-5 h-5 max-w-2xl animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[832px] space-y-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-5 animate-pulse rounded bg-slate-200" />
          ))}
        </div>
      </section>
    </main>
  )
}
