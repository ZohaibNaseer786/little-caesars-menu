'use client'

import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { useDeals } from '@/hooks/useDeals'
import type { Deal } from '@/types'

function isCurrentPublicDeal(deal: Deal, asOfDate: string) {
  return deal.isAvailable !== false && !deal.isAppOnly && (!deal.validUntil || deal.validUntil >= asOfDate)
}

function priceLabel(deal: Deal) {
  if (deal.price > 0) return `$${deal.price.toFixed(2)}`
  if (deal.discountValue > 0) return `$${deal.discountValue.toFixed(0)} OFF`
  return 'Public offer'
}

function expirationLabel(deal: Deal) {
  if (!deal.validUntil) return 'Availability and prices vary by participating location.'
  return `Listed through ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${deal.validUntil}T00:00:00`))}.`
}

function FeaturedDeal({ deal }: { deal: Deal }) {
  return (
    <article className="relative min-h-[390px] overflow-hidden bg-orange p-5 text-black sm:min-h-[460px] sm:p-8">
      <div className="absolute inset-x-0 top-0 h-[64%]">
        <ImageWithFallback src={deal.image} alt={`${deal.title} public deal`} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain object-top" />
      </div>
      <div className="relative z-10 flex min-h-[350px] flex-col justify-end sm:min-h-[400px]">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-black">Featured public deal</p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase leading-[0.96] text-white sm:text-6xl">{deal.title}</h2>
        <p className="mt-3 max-w-xl text-sm font-bold leading-6">{deal.description}</p>
      </div>
    </article>
  )
}

function PublicDealCard({ deal, label }: { deal: Deal; label: string }) {
  return (
    <article
      className="relative min-h-[390px] p-3 sm:min-h-[460px] sm:p-4"
      style={{ backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.2) 1.2px, transparent 1.8px)', backgroundSize: '14px 14px' }}
    >
      <div className="relative flex h-full min-h-[366px] flex-col items-center bg-white px-5 pb-7 pt-10 text-center sm:min-h-[428px] sm:px-9">
        <div className="absolute -top-4 left-1/2 flex h-8 w-48 -translate-x-1/2 items-center justify-center bg-black px-5 text-xs font-black uppercase text-white [clip-path:polygon(8%_0,92%_0,100%_50%,92%_100%,8%_100%,0_50%)]">
          {label}
        </div>
        <div className="relative h-28 w-full max-w-[280px] sm:h-36">
          <ImageWithFallback src={deal.image} alt={`${deal.title} deal image`} fill sizes="280px" className="object-contain" />
        </div>
        <p className="mt-5 font-display text-4xl font-black uppercase leading-none text-orange sm:text-5xl">{priceLabel(deal)}</p>
        <h2 className="mt-4 font-display text-xl font-black uppercase leading-tight text-orange sm:text-2xl">{deal.title}</h2>
        <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-slate-700">{deal.description}</p>
        {deal.promoCode && (
          <div className="mt-5 border-2 border-dashed border-orange px-5 py-3">
            <span className="text-xs font-black uppercase text-slate-500">Promo code</span>
            <strong className="ml-3 font-display text-xl font-black uppercase text-black">{deal.promoCode}</strong>
          </div>
        )}
        <p className="mt-auto pt-5 text-xs font-bold text-slate-500">{expirationLabel(deal)}</p>
      </div>
    </article>
  )
}

function DealGuideCard() {
  return (
    <article className="relative flex min-h-[390px] items-center justify-center overflow-hidden border-2 border-orange bg-white px-6 py-10 text-center sm:min-h-[460px]">
      <div className="absolute -left-16 top-8 h-48 w-28 rounded-r-full bg-orange" />
      <div className="absolute -bottom-16 right-12 h-48 w-28 rounded-t-full bg-orange" />
      <div className="relative z-10 max-w-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange font-display text-lg font-black uppercase leading-none text-white">
          Deal<br />Guide
        </div>
        <h2 className="mt-7 font-display text-3xl font-black uppercase leading-tight text-orange sm:text-5xl">How Public Deals Work</h2>
        <p className="mx-auto mt-5 max-w-sm text-base font-semibold leading-7 text-black">
          National offers can be visible to everyone. Store and delivery-area offers may appear only after a location is selected. We exclude account-only promotions.
        </p>
        <p className="mt-6 text-sm font-bold text-slate-600">Always confirm price, eligibility and expiration on the official checkout page.</p>
      </div>
    </article>
  )
}

export function DealsPageClient({ initialDeals, asOfDate }: { initialDeals: Deal[]; asOfDate: string }) {
  const dealsQuery = useDeals(initialDeals)
  const deals = (dealsQuery.data ?? initialDeals).filter((deal) => isCurrentPublicDeal(deal, asOfDate))
  const featured = deals.find((deal) => /meal deal|four-n-one/i.test(deal.title)) ?? deals[0]
  const supporting = deals.filter((deal) => deal.id !== featured?.id).slice(0, 2)

  return (
    <main className="bg-white px-4 py-8 text-black sm:py-12">
      <header className="mx-auto mb-8 max-w-[1180px] sm:mb-10">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Public savings guide</p>
        <h1 className="mt-2 font-display text-3xl font-black sm:text-5xl">Little Caesars Deals, Coupons and Promo Codes</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">
          Browse general public offers without signing in. Deal prices, dates and eligibility can vary by store, delivery area and participating location.
        </p>
        <p className="mt-2 text-sm font-bold text-slate-500">Reviewed July 15, 2026.</p>
      </header>

      <div className="mx-auto grid max-w-[1180px] gap-6 sm:gap-9 lg:grid-cols-2">
        {featured ? <FeaturedDeal deal={featured} /> : <DealGuideCard />}
        {supporting[0] ? <PublicDealCard deal={supporting[0]} label="Public offer" /> : <DealGuideCard />}
        {supporting[1] ? <PublicDealCard deal={supporting[1]} label="More value" /> : <DealGuideCard />}
        <DealGuideCard />
      </div>
    </main>
  )
}
