'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useAppStore'
import type { StoreSearchResult } from '@/hooks/useStore'

export function StoreCard({ store }: { store: StoreSearchResult }) {
  const router = useRouter()
  const setStoreId = useAppStore((state) => state.setStoreId)
  const today = store.hours.monday

  function selectStore() {
    setStoreId(store.id)
    router.push('/menu')
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-bold text-navy">{store.name}</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${store.currentlyOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-orange'}`}>
              {store.currentlyOpen ? 'Open' : 'Closed'}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {store.address.line1}, {store.address.city}, {store.address.state} {store.address.postalCode}
          </p>
          <p className="mt-2 text-sm font-bold text-navy">
            Hours: {today.open} - {today.close}
            {typeof store.distance === 'number' ? ` • ${store.distance.toFixed(1)} mi` : ''}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-extrabold uppercase text-navy">
            {store.features.pickup && <span className="rounded-full bg-cream px-2 py-1">Pickup</span>}
            {store.features.delivery && <span className="rounded-full bg-cream px-2 py-1">Delivery</span>}
            {store.features.pizzaPortal && <span className="rounded-full bg-cream px-2 py-1">Pizza Portal</span>}
          </div>
        </div>
        <Button onClick={selectStore}>View Menu</Button>
      </div>
    </article>
  )
}
