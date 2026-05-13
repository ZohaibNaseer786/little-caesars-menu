'use client'

import { FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { StoreCard } from '@/components/store/StoreCard'
import { useStoreSearch } from '@/hooks/useStore'

export function StoreLocator() {
  const search = useStoreSearch()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = String(formData.get('query') ?? '').trim()
    if (query) search.mutate(query)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="store-query">Enter your address or zip code</label>
          <input
            id="store-query"
            name="query"
            className="min-h-12 rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange"
            placeholder="Enter your address or zip code"
          />
          <Button type="submit" disabled={search.isPending}>
            {search.isPending ? 'Searching' : 'Search'}
          </Button>
        </form>
      </div>

      <div className="mt-6 grid gap-4">
        {search.isPending &&
          Array.from({ length: 3 }).map((_, index) => <LoadingSkeleton key={index} className="h-36 w-full" />)}
        {search.data?.map((store) => <StoreCard key={store.id} store={store} />)}
        {!search.isPending && !search.data && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
            <h2 className="font-display text-2xl font-bold text-navy">Search for Little Caesars locations</h2>
            <p className="mt-2 text-slate-600">Enter an address or zip code to view nearby store information.</p>
          </div>
        )}
        {search.isSuccess && search.data.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
            <h2 className="font-display text-2xl font-semibold text-navy">No locations found</h2>
            <p className="mt-2 text-slate-600">Try another city, address or zip code.</p>
          </div>
        )}
      </div>
    </div>
  )
}
