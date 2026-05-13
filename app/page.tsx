import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Little Caesars Menu 2026 | Deals, Pizza & Nutrition',
  description:
    'Browse a Little Caesars-style homepage with current featured deals, menu links, pizza specials, nutrition and location information.',
  alternates: { canonical: 'https://littlecaesarsmenu.com' }
}

const hero = {
  valueBanner: '/images/home/value-banner-desktop.png',
  valueBannerMobile: '/images/home/value-banner-mobile.png',
  pizza: '/images/home/four-n-one-stix.png'
}

const deals = [
  {
    title: 'More for $9.99 Menu',
    image: '/images/home/more-for-999.png',
    headline: 'Get 2 favs for $9.99!',
    body: 'Get more from our More for $9.99 Menu.',
    note: '**See below.',
    button: 'black'
  },
  {
    title: '$19.99 Four-N-One Stix Meal Deal',
    image: '/images/home/four-n-one-meal-deal.png',
    headline: 'Four-N-One Stix + Large Classic',
    body: 'Plus Crazy Combo & 2L PEPSI-COLA',
    note: '***See below.',
    button: 'orange'
  },
  {
    title: '$3 Off $18 or more',
    image: '/images/home/three-off-18.png',
    headline: 'Get $3 off your order of $18+',
    body: 'Use Code: 3OFF18',
    note: '‡See below.',
    button: 'black'
  }
]

const promoTiles = [
  {
    alt: 'Fundraising made deliciously easy',
    href: '/stores',
    image: '/images/home/fundraising.png'
  },
  {
    alt: 'Become a franchisee today',
    href: 'https://franchise.littlecaesars.com',
    image: '/images/home/franchise.jpg'
  },
  {
    alt: 'Join our eClub',
    href: '/deals',
    image: '/images/home/eclub.png'
  }
]

export default function HomePage() {
  return (
    <div className="bg-white text-navy">
      <section
        className="border-b border-lc-border bg-white px-4 py-7 sm:py-9"
        style={{ backgroundImage: 'url(/images/start-your-order/lc-slice-bg.png)' }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
          <h1 className="font-display text-2xl font-black uppercase leading-none tracking-normal text-black sm:text-3xl">
            Start Your Order
          </h1>
          <div className="flex w-full max-w-xl items-center justify-center gap-5 sm:gap-8">
            <Link href="/stores" className="flex min-h-16 flex-1 items-center justify-center bg-orange px-7 text-xl font-black uppercase text-white transition hover:bg-orange-soft sm:min-h-20 sm:text-2xl">
              Pickup
            </Link>
            <span className="relative h-20 w-1.5 shrink-0 bg-black sm:h-24">
              <span className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-b-[12px] border-x-transparent border-b-black" />
              <span className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[12px] border-x-transparent border-t-black" />
            </span>
            <Link href="/stores" className="flex min-h-16 flex-1 items-center justify-center bg-orange px-7 text-xl font-black uppercase text-white transition hover:bg-orange-soft sm:min-h-20 sm:text-2xl">
              Delivery
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-[22px] border-white bg-[#f6eee8]">
        <Link href="/menu" className="relative hidden aspect-[1440/100] w-full overflow-hidden md:block" aria-label="Proud to be best value in pizza">
          <Image
            src={hero.valueBanner}
            alt="Proud to be best value in pizza versus the top 4 national pizza chains"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Link>
        <Link href="/menu" className="relative block aspect-[390/100] w-full overflow-hidden md:hidden" aria-label="Proud to be best value in pizza">
          <Image
            src={hero.valueBannerMobile}
            alt="Proud to be best value in pizza versus the top 4 national pizza chains"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Link>
      </section>

      <section className="bg-orange px-4 py-8 lg:py-10">
        <div className="mx-auto grid max-w-[1500px] items-center gap-8 lg:grid-cols-[1.25fr_0.9fr]">
          <div className="relative min-h-[260px] sm:min-h-[390px] lg:min-h-[500px]">
            <Image
              src={hero.pizza}
              alt="Four-N-One Stix pizza with bacon, cheese, jalapeno and pepperoni sections"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain"
            />
          </div>
          <div>
            <Link href="/menu" className="block bg-[#ffe0d1] p-6 text-center text-black shadow-[0_8px_0_rgba(0,0,0,0.08)] sm:p-8 lg:p-10" aria-label="View Four-N-One Stix in the menu">
              <div className="flex items-start justify-center gap-3">
                <span className="pt-5 text-5xl font-black leading-none sm:text-6xl">$</span>
                <span className="font-display text-[7rem] font-black leading-[0.72] tracking-normal sm:text-[9rem]">7</span>
                <span className="pt-7 text-5xl font-black leading-none sm:text-6xl">
                  99
                </span>
                <div className="ml-1 text-left">
                  <p className="whitespace-nowrap font-display text-xl font-black leading-none sm:text-2xl">Hot-N-Ready 4-8PM</p>
                  <p className="font-display text-5xl font-black uppercase leading-[0.9] text-orange sm:text-6xl">
                    <span className="block whitespace-nowrap">Four-N-</span>
                    <span className="block whitespace-nowrap">One Stix</span>
                  </p>
                </div>
              </div>
              <h2 className="mt-7 font-display text-2xl font-black uppercase sm:text-3xl">It’s all stix!</h2>
              <p className="mt-4 text-xl font-semibold sm:text-2xl">Bacon | Cheese | Jalapeño | Pepperoni</p>
              <p className="mt-6 text-sm font-bold">*See details below.</p>
            </Link>
            <Link href="/menu" className="mt-4 flex min-h-16 items-center justify-center bg-black px-6 text-2xl font-black uppercase text-white transition hover:bg-orange-soft">
              Order Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1320px] gap-7 md:grid-cols-3">
          {deals.map((deal) => (
            <article key={deal.title} className="flex min-h-full flex-col bg-white text-center">
              <Link href="/deals" className="block bg-[#f5f1ed] p-5">
                <div className="relative h-[210px] sm:h-[240px]">
                  <Image src={deal.image} alt={deal.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
                </div>
                <h2 className="mt-5 font-display text-xl font-black uppercase sm:text-2xl">{deal.headline}</h2>
                <p className="mt-3 text-xl font-semibold sm:text-2xl">{deal.body}</p>
                <p className="mt-5 text-sm font-bold">{deal.note}</p>
              </Link>
              <Link
                href="/deals"
                className={`flex min-h-16 items-center justify-center rounded-b-lg px-6 text-2xl font-black uppercase text-white transition ${
                  deal.button === 'orange' ? 'bg-orange hover:bg-orange-soft' : 'bg-black hover:bg-orange'
                }`}
              >
                Order Now
              </Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-14 grid max-w-[1500px] gap-6 md:grid-cols-3 lg:gap-12">
          {promoTiles.map((tile) => {
            const external = tile.href.startsWith('http')
            const className = 'relative block h-[92px] border-2 border-lc-border bg-white transition hover:border-orange'
            const image = (
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-contain p-3"
              />
            )

            return external ? (
              <a key={tile.alt} href={tile.href} target="_blank" rel="noreferrer" className={className}>
                {image}
              </a>
            ) : (
              <Link key={tile.alt} href={tile.href} className={className}>
                {image}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
