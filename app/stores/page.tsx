import type { Metadata } from 'next'
import { StoreLocator } from '@/components/store/StoreLocator'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Near Me | Locations, Hours & Store Guide',
  description: 'Find Little Caesars near me, locations, hours, store details, menu prices, deals and nutrition in an informational guide.',
  keywords: ['littlecaesars near me', 'Little Caesars locations', 'Little Caesars hours', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/stores') }
}

export default function StoresPage() {
  return (
    <div>
      <section className="container-shell pt-6">
        <div className="rounded-3xl bg-navy p-5 text-white shadow-card sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-muted">Store locator</p>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-white min-[380px]:text-4xl sm:text-5xl">Find a Little Caesars Location</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/80">
            Search by address or zip code, choose a store, then browse the menu guide for that location.
          </p>
        </div>
      </section>
      <StoreLocator />
      <section className="container-shell pb-14">
        <div className="grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-navy">Little Caesars near me: locations and hours</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Search with a street address, city or ZIP code to find nearby Little Caesars locations. Store hours, pickup options, delivery zones, menu prices and deal participation can differ by restaurant, especially on holidays.
            </p>
            <p className="mt-4 leading-7 text-slate-700">
              Looking for <strong>Little Caesars cerca de mí</strong>? Enter your current city or ZIP code above, then confirm the address and today&apos;s hours with the selected restaurant before traveling.
            </p>
          </div>
          <div className="grid gap-5">
            <div>
              <h3 className="text-lg font-black text-navy">What time does Little Caesars open and close?</h3>
              <p className="mt-2 leading-7 text-slate-700">Hours are set by each location. Many stores open near lunch and close in the evening, but local and holiday schedules vary.</p>
            </div>
            <div>
              <h3 className="text-lg font-black text-navy">Are menu prices the same at every location?</h3>
              <p className="mt-2 leading-7 text-slate-700">No. Prices, delivery fees and promotions can vary by region, store, order type and participating-location rules.</p>
            </div>
            <div>
              <h3 className="text-lg font-black text-navy">Does every store offer delivery?</h3>
              <p className="mt-2 leading-7 text-slate-700">Delivery availability depends on the store and address. Confirm the delivery area after selecting a location.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
