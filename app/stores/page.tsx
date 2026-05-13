import type { Metadata } from 'next'
import { StoreLocator } from '@/components/store/StoreLocator'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Little Caesars Near Me | Locations & Menu Guide',
  description: 'Find Little Caesars locations and browse menu prices, deals and nutrition in an informational guide.',
  alternates: { canonical: 'https://littlecaesarsmenu.com/stores' }
}

export default function StoresPage() {
  return (
    <div>
      <section className="container-shell pt-6">
        <div className="rounded-3xl bg-navy p-5 text-white shadow-card sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-muted">Store locator</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">Find a Little Caesars Location</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/80">
            Search by address or zip code, choose a store, then browse the menu guide for that location.
          </p>
        </div>
      </section>
      <StoreLocator />
    </div>
  )
}
