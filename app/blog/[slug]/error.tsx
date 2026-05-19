'use client'

export default function BlogPostError({ reset }: { reset: () => void }) {
  return (
    <main className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-black text-[#111827]">Guide could not load</h1>
      <p className="mt-3 text-slate-600">Try reloading this Little Caesars guide.</p>
      <button type="button" onClick={reset} className="mt-8 rounded-full bg-[#F56600] px-7 py-3 text-sm font-black text-white transition hover:bg-[#D94F00]">
        Try Again
      </button>
    </main>
  )
}
