'use client'

import Image from 'next/image'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { useDeals } from '@/hooks/useDeals'
import type { Deal } from '@/types'

type CouponDeal = {
  eyebrow: string
  image: string
  imageAlt: string
  amount: string
  headline: string
  instructions: string
  code: string
  note: string
}

const mealCreative = {
  title: 'Four-N-One™ Stix Meal Deal',
  subtitle: 'Four-N-One Stix + Large Classic + Crazy Combo® + 2L PEPSI-COLA® Product',
  image: 'https://banners.littlecaesars.com/us/banner-assets/1f6871fb-0299-42b0-85d3-f6854d1dd820.png'
}

const defaultCoupons: CouponDeal[] = [
  {
    eyebrow: 'SAVE HERE!',
    image: 'https://mobilestatic.littlecaesars.com/weborderingimages/4a10fa34-207e-4db4-ba42-30e3c7907318.jpg',
    imageAlt: 'Four-N-One Stix meal deal items',
    amount: '$3 OFF',
    headline: 'YOUR ORDER OF $18 OR MORE',
    instructions: 'ADD ITEMS TO CART • CODE APPLIED AT CHECKOUT',
    code: '3OFF18',
    note: 'Read more'
  },
  {
    eyebrow: 'GET DELIVERY!',
    image: 'https://mobilestatic.littlecaesars.com/weborderingimages/4f19503b-3c2f-4322-af48-b471e48e47c0.jpg',
    imageAlt: 'Little Caesars delivery deal items',
    amount: '$4 OFF DELIVERY',
    headline: 'WITH YOUR ORDER OF $24 OR MORE',
    instructions: 'ADD ITEMS TO CART • CODE APPLIED AT CHECKOUT',
    code: 'DELIVERY4YOU',
    note: 'Read more'
  }
]

function asDeals(value: unknown): Deal[] {
  return Array.isArray(value)
    ? (value.filter((deal) => deal && typeof deal === 'object' && typeof (deal as { title?: unknown }).title === 'string') as Deal[])
    : []
}

function findDeal(deals: Deal[], matcher: (deal: Deal) => boolean) {
  return deals.find((deal) => deal.isAvailable !== false && !deal.isAppOnly && matcher(deal))
}

function couponFromDeal(fallback: CouponDeal, deal?: Deal): CouponDeal {
  if (!deal) {
    return fallback
  }

  const discountValue = deal.discountValue || deal.originalPrice || 0
  const amount =
    fallback.code === 'DELIVERY4YOU'
      ? `$${discountValue || 4} OFF DELIVERY`
      : `$${discountValue || 3} OFF`
  const minimumOrder = deal.minimumOrder || (fallback.code === 'DELIVERY4YOU' ? 24 : 18)

  return {
    ...fallback,
    eyebrow: deal.badge || fallback.eyebrow,
    image: deal.image || fallback.image,
    imageAlt: `${deal.title} deal`,
    amount,
    headline: fallback.code === 'DELIVERY4YOU' ? `WITH YOUR ORDER OF $${minimumOrder} OR MORE` : `YOUR ORDER OF $${minimumOrder} OR MORE`,
    instructions: deal.description || fallback.instructions,
    code: deal.promoCode || fallback.code
  }
}

function MealDealFeature({ deal }: { deal?: Deal }) {
  return (
    <article className="relative min-h-[420px] overflow-hidden bg-orange p-7 text-black sm:min-h-[440px] lg:min-h-[460px]">
      <div className="absolute inset-x-0 top-0 h-[74%]">
        <ImageWithFallback
          src={mealCreative.image}
          alt="Four-N-One Stix Meal Deal pizza, Crazy Bread and Pepsi"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-contain object-top"
        />
      </div>
      <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-end">
        <h2 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-normal text-white sm:text-6xl lg:text-7xl">
          Four-N-One<span className="ml-2 font-sans text-3xl italic normal-case text-black sm:text-4xl">Stix</span>
          <span className="block">Meal Deal</span>
        </h2>
        <p className="mt-2 text-xs font-bold sm:text-sm">{deal?.description || mealCreative.subtitle}</p>
      </div>
    </article>
  )
}

function CouponCard({ coupon }: { coupon: CouponDeal }) {
  return (
    <article
      className="relative min-h-[420px] p-4"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.2) 1.2px, transparent 1.8px)',
        backgroundSize: '14px 14px'
      }}
    >
      <div className="relative flex h-full min-h-[388px] flex-col items-center bg-white px-5 pb-6 pt-9 text-center sm:px-8">
        <div className="absolute -top-4 left-1/2 flex h-8 w-44 -translate-x-1/2 items-center justify-center bg-black px-5 text-sm font-black uppercase text-white [clip-path:polygon(8%_0,92%_0,100%_50%,92%_100%,8%_100%,0_50%)]">
          {coupon.eyebrow}
        </div>
        <div className="relative h-28 w-56 sm:h-32 sm:w-64">
          <ImageWithFallback
            src={coupon.image}
            alt={coupon.imageAlt}
            fill
            sizes="260px"
            className="object-contain"
          />
        </div>
        <h2 className="mt-5 font-display text-4xl font-black uppercase leading-none text-orange sm:text-5xl">{coupon.amount}</h2>
        <p className="mt-3 font-display text-xl font-black uppercase leading-tight text-orange sm:text-2xl">{coupon.headline}</p>
        <p className="mt-7 text-xs font-black uppercase text-black">{coupon.instructions}</p>
        <div className="mt-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <strong className="font-display text-3xl font-black uppercase tracking-normal text-black sm:text-4xl">{coupon.code}</strong>
          <span className="hidden h-12 w-px bg-black/40 sm:block" />
          <button
            type="button"
            className="min-h-12 border-2 border-orange bg-white px-7 text-sm font-black uppercase text-orange transition hover:bg-orange hover:text-white"
          >
            Apply Code
          </button>
        </div>
        <button type="button" className="mt-auto self-end text-xs font-black text-orange transition hover:text-black">
          {coupon.note} <span aria-hidden="true">⌄</span>
        </button>
      </div>
    </article>
  )
}

function ExclusiveDealsCard() {
  return (
    <article className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-2 border-orange bg-white px-8 py-12 text-center">
      <span className="absolute -left-20 top-4 h-48 w-28 rounded-r-full bg-orange" />
      <span className="absolute -left-16 bottom-14 h-44 w-28 rounded-r-full bg-orange" />
      <span className="absolute -bottom-20 right-14 h-52 w-28 rounded-t-full bg-orange" />
      <span className="absolute -right-12 bottom-28 h-40 w-24 rounded-l-full bg-orange" />
      <div className="relative z-10 max-w-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange text-center font-display text-xl font-black uppercase leading-none text-white">
          Crazy!<br />Crazy!<br />Deals
        </div>
        <h2 className="mt-7 font-display text-4xl font-black uppercase leading-tight text-orange sm:text-5xl">
          Want Access To
          <span className="block font-sans text-4xl italic normal-case text-black sm:text-5xl">Exclusive Deals?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-lg font-semibold leading-7 text-black">
          Subscribe for access to exclusive offers, promotions and Crazy!Crazy!® Deals
        </p>
        <button type="button" className="mt-7 min-h-12 bg-black px-8 text-base font-black uppercase text-white transition hover:bg-orange">
          Subscribe Now
        </button>
      </div>
    </article>
  )
}

export function DealsPageClient() {
  const dealsQuery = useDeals()
  const deals = asDeals(dealsQuery.data)
  const mealDeal = findDeal(deals, (deal) => deal.title.toLowerCase().includes('four-n-one') && deal.title.toLowerCase().includes('meal'))
  const saveDeal = findDeal(deals, (deal) => deal.promoCode === '3OFF18' || deal.title.toLowerCase().includes('$3 off'))
  const deliveryDeal = findDeal(deals, (deal) => deal.promoCode === 'DELIVERY4YOU' || deal.title.toLowerCase().includes('delivery'))
  const coupons = [couponFromDeal(defaultCoupons[0], saveDeal), couponFromDeal(defaultCoupons[1], deliveryDeal)]

  return (
    <main className="bg-white px-4 py-8 text-black sm:py-12">
      <div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-2">
        {dealsQuery.isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="min-h-[420px] bg-white p-4">
                <LoadingSkeleton className="h-full min-h-[390px] w-full rounded-none" />
              </div>
            ))}
          </>
        ) : (
          <>
            <MealDealFeature deal={mealDeal} />
            <CouponCard coupon={coupons[0]} />
            <CouponCard coupon={coupons[1]} />
            <ExclusiveDealsCard />
          </>
        )}
      </div>
    </main>
  )
}
