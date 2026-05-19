import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Little Caesars Menu 2026 | Deals, Pizza & Nutrition',
  description:
    'Browse a Little Caesars menu guide with updated prices, deals, calories, pizza specials, nutrition and location information.',
  alternates: { canonical: 'https://littlecaesarsmenu.com' }
}

const hero = {
  pizza: '/images/home/four-n-one-stix.png'
}

const latestPosts = [
  {
    title: 'Little Caesars Menu 2026 - Updated Prices, Deals & Combos',
    image: '/images/home/four-n-one-stix.png',
    date: 'May 19, 2026',
    excerpt:
      'A complete guide to pizzas, Crazy Bread, wings, drinks, desserts, HOT-N-READY specials, calories and current value picks.'
  },
  {
    title: 'Little Caesars Deals 2026 - Coupons, Codes & Meal Offers',
    image: '/images/home/four-n-one-meal-deal.png',
    date: 'May 13, 2026',
    excerpt:
      'Track weekly deals, promo codes, delivery savings and popular bundles in one simple Little Caesars savings guide.'
  },
  {
    title: 'Little Caesars Nutrition Facts - Calories & Allergens',
    image: '/images/home/more-for-999.png',
    date: 'May 8, 2026',
    excerpt:
      'Compare calories, sodium, macros and allergen notes across pizzas, sides, wings, sauces and drinks before you order.'
  }
]

const categories = [
  { title: 'Pizza', body: 'Round, deep dish, stuffed crust and specialty pizzas', href: '/menu', icon: 'slice', tone: 'orange' },
  { title: 'Sides', body: 'Crazy Bread, combos, puffs, dips and sauces', href: '/menu/sides', icon: 'plus', tone: 'dark' },
  { title: 'Deals', body: 'Coupons, meal bundles and limited-time offers', href: '/deals', icon: 'tag', tone: 'orange' },
  { title: 'Nutrition', body: 'Calories, macros, sodium and allergen tables', href: '/nutrition', icon: 'spark', tone: 'dark' },
  { title: 'Stores', body: 'Find nearby Little Caesars locations and hours', href: '/stores', icon: 'pin', tone: 'orange' }
]

const popularMenus = [
  {
    title: 'Four-N-One Stix',
    image: '/images/home/four-n-one-stix.png',
    badge: '#1 Rated',
    body: 'Bacon, cheese, jalapeno and pepperoni sections with bold value pricing.',
    meta: 'Featured'
  },
  {
    title: 'More for $9.99 Menu',
    image: '/images/home/more-for-999.png',
    badge: 'Top Pick',
    body: 'Mix and match fan-favorite value items from the Little Caesars menu.',
    meta: 'Value Menu'
  },
  {
    title: 'Four-N-One Meal Deal',
    image: '/images/home/four-n-one-meal-deal.png',
    badge: 'Trending',
    body: 'A large classic, Crazy Combo, Pepsi product and Four-N-One Stix.',
    meta: 'Combo Deal'
  },
  {
    title: 'Explore Full Menu',
    image: '/images/home/value-banner-desktop.png',
    badge: 'All Items',
    body: 'Browse pizzas, wings, sides, drinks, desserts, dips and nutrition info.',
    meta: 'All Categories'
  }
]

const guides = [
  {
    title: 'Best Little Caesars Meals Under $10',
    body: 'Find filling pizzas, snacks and value combos that keep the total low.',
    href: '/menu',
    icon: 'dollar'
  },
  {
    title: 'Lower Calorie Menu Picks',
    body: 'Compare slices, wings and sides with clear calorie and nutrition notes.',
    href: '/nutrition',
    icon: 'heart'
  },
  {
    title: 'Family Deals Guide',
    body: 'Plan pizza night with bundles, promo codes and easy group meal picks.',
    href: '/deals',
    icon: 'group'
  }
]

const trustItems = [
  { title: 'Verified Prices', body: 'Menu prices and deals organized for quick checking', color: 'bg-emerald-500', icon: 'check' },
  { title: 'Updated Often', body: 'Fresh menu updates, offers and nutrition references', color: 'bg-blue-500', icon: 'refresh' },
  { title: 'Complete Menu', body: 'Pizza, sides, wings, sauces, drinks and desserts', color: 'bg-[#F56600]', icon: 'menu' },
  { title: 'Easy to Compare', body: 'Cards, tables and guides built for fast decisions', color: 'bg-amber-400', icon: 'shield' }
]

const dealRows = [
  { brand: 'Little Caesars', title: '$3 off orders of $18+', code: '3OFF18', badge: '$3 OFF', tone: 'orange' },
  { brand: 'Delivery', title: '$4 off delivery orders of $24+', code: 'DELIVERY4YOU', badge: '$4 OFF', tone: 'navy' },
  { brand: 'Meal Deal', title: 'Four-N-One Stix meal bundle', code: 'MEALDEAL', badge: 'Bundle', tone: 'orange' },
  { brand: 'Value Menu', title: 'Get 2 favorites for $9.99', code: 'VALUE999', badge: '$9.99', tone: 'green' }
]

function Icon({ name }: { name: string }) {
  if (name === 'slice') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M5 21 19 3l2 18H5Z" />
        <path d="M12.4 11.2h.1M16.8 16.5h.1M10.1 17.2h.1" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'tag') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="m20 13-7 7L4 11V4h7l9 9Z" />
        <path d="M8.5 8.5h.1" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'spark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      </svg>
    )
  }

  if (name === 'pin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    )
  }

  if (name === 'dollar') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M15 9.2c-.7-.8-1.8-1.2-3-1.2-1.5 0-2.7.8-2.7 2s1 1.8 2.9 2.1c1.9.4 2.8 1 2.8 2.3s-1.3 2.2-3 2.2c-1.5 0-2.8-.5-3.6-1.5" />
      </svg>
    )
  }

  if (name === 'heart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M20.8 8.6c0 5.5-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
      </svg>
    )
  }

  if (name === 'group') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a5 5 0 0 1 10 0M14 20a4 4 0 0 1 7 0" />
      </svg>
    )
  }

  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16.5 9" />
      </svg>
    )
  }

  if (name === 'refresh') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M20 12a8 8 0 0 1-13.4 5.9M4 12A8 8 0 0 1 17.4 6.1" />
        <path d="M7 18H3v-4M17 6h4v4" />
      </svg>
    )
  }

  if (name === 'menu') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M7 3h10v18H7V3Z" />
        <path d="M10 7h4M10 11h4M10 15h4" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
        <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
        <path d="m8.8 12 2.1 2.1 4.3-5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-current stroke-2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
          <span className="h-1 w-8 rounded-full bg-[#F56600]" />
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#F56600]">{eyebrow}</p>
        </div>
      )}
      <h2 className="font-display text-3xl font-black leading-tight text-[#111827] sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{subtitle}</p>}
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="bg-white text-[#111827]">
      <section className="bg-[#f4f6f8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1152px] overflow-hidden rounded-[22px] bg-[#172033] shadow-[0_22px_60px_-34px_rgba(17,24,39,0.75)] lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col justify-center px-8 py-10 text-white sm:px-10 lg:px-12">
            <span className="mb-4 inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#F56600]">
              Verified Prices
            </span>
            <h1 className="font-display text-4xl font-black leading-[1.05] sm:text-5xl">
              Little Caesars Menu with Prices in the United States
              <span className="mt-2 block text-[#F56600]">Updated May 2026</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Your quick source for Little Caesars menu prices, calories, deals and fan-favorite picks. From HOT-N-READY pizza to Crazy Bread, we organize every menu detail.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-lg bg-[#F56600] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(245,102,0,0.28)] transition hover:bg-[#D94F00]">
                Browse Full Menu
              </Link>
              <Link href="/deals" className="rounded-lg border-2 border-white px-5 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#172033]">
                Top Deals
              </Link>
            </div>
          </div>
          <div className="relative min-h-[300px] bg-[linear-gradient(120deg,#fff4ec,#ffffff)] lg:min-h-[360px]">
            <Image
              src={hero.pizza}
              alt="Little Caesars Four-N-One Stix pizza"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain p-6 sm:p-8"
            />
            <span className="absolute right-5 top-5 rounded-full bg-[#F56600] px-4 py-2 text-xs font-black uppercase text-white">Updated 2026</span>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px]">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Latest Posts" title="Most Recent Menu Updates" subtitle="Stay updated with Little Caesars prices, deals and nutrition guides" />
            <Link href="/menu" className="hidden text-sm font-bold text-[#F56600] hover:text-[#D94F00] sm:inline-flex">View All &rarr;</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article key={post.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_-22px_rgba(15,23,42,0.8)]">
                <div className="relative h-52 bg-slate-100">
                  <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-4" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#FFE1CC] px-3 py-1 text-xs font-bold text-[#F56600]">Menu Guides</span>
                  <span className="absolute right-4 top-4 rounded-full bg-[#F56600] px-3 py-1 text-xs font-black text-white">FEATURED</span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-400">{post.date} · Little Caesars Menu Team</p>
                  <h3 className="mt-4 text-lg font-black leading-snug text-[#111827]">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <Link href="/menu" className="mt-5 inline-flex text-sm font-bold text-[#F56600] hover:text-[#D94F00]">Read More &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px]">
          <SectionHeading centered title="Browse Menus by Category" subtitle="Find exactly what you are craving with organized Little Caesars menu sections" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_24px_-22px_rgba(15,23,42,0.8)] transition hover:-translate-y-1 hover:border-[#F56600]"
              >
                <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white ${category.tone === 'orange' ? 'bg-[#F56600]' : 'bg-[#334155]'}`}>
                  <Icon name={category.icon} />
                </span>
                <h3 className="mt-5 text-lg font-black text-[#111827]">{category.title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{category.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px]">
          <SectionHeading centered eyebrow="Most Popular" title="Top Rated Little Caesars Menus" subtitle="Most searched menu sections with verified prices and clear details" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularMenus.map((menu) => (
              <article key={menu.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_26px_-22px_rgba(15,23,42,0.9)]">
                <div className="relative h-44 bg-white">
                  <Image src={menu.image} alt={menu.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-3" />
                  <span className="absolute right-3 top-3 rounded-full bg-[#F56600] px-3 py-1 text-xs font-black text-white">{menu.badge}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#111827]">{menu.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{menu.body}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">{menu.meta}</span>
                    <Link href="/menu" className="font-bold text-[#F56600] hover:text-[#D94F00]">View Menu &rarr;</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px]">
          <SectionHeading centered title="Smart Pizza Guides" subtitle="Make informed choices with curated Little Caesars menu guides" />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <article key={guide.title} className={`rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_38px_-28px_rgba(15,23,42,0.9)] ${index === 1 ? 'border-t-4 border-t-[#334155]' : 'border-t-4 border-t-[#F56600]'}`}>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE1CC] text-[#F56600]">
                  <Icon name={guide.icon} />
                </span>
                <h3 className="mt-8 text-2xl font-black text-[#111827]">{guide.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{guide.body}</p>
                <Link href={guide.href} className="mt-7 inline-flex text-base font-bold text-[#F56600] hover:text-[#D94F00]">
                  Explore Guide &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#172033] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px] text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Why Trust Little Caesars Menu?</h2>
          <p className="mt-3 text-lg text-slate-300">A reliable source for quick menu, price and nutrition information</p>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item.title}>
                <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white ${item.color}`}>
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6f8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1088px]">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHeading eyebrow="Save Money" title="This Week's Top Little Caesars Deals" subtitle="Promo codes and value deals organized for fast checking." />
            <Link href="/deals" className="text-sm font-bold text-[#F56600] hover:text-[#D94F00]">View All Deals &rarr;</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {dealRows.map((deal) => (
              <article key={deal.code} className="flex items-center gap-4 rounded-xl border border-[#FFE1CC] bg-white p-4 shadow-[0_8px_20px_-22px_rgba(15,23,42,0.8)]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#FFD2B8] bg-white text-[#F56600]">
                  <Icon name="tag" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-400">{deal.brand}</p>
                  <h3 className="truncate text-sm font-black text-[#111827] sm:text-base">{deal.title}</h3>
                </div>
                <span className="hidden rounded-md bg-[#F56600] px-3 py-2 text-xs font-black text-white sm:inline-flex">{deal.badge}</span>
                <span className="rounded-lg border border-dashed border-[#FFB680] bg-[#FFF3EA] px-3 py-2 text-sm font-black tracking-[0.08em] text-[#111827]">
                  {deal.code}
                </span>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/deals" className="inline-flex rounded-full border-2 border-[#F56600] px-8 py-4 text-sm font-bold text-[#F56600] transition hover:bg-[#F56600] hover:text-white">
              Browse All Little Caesars Deals &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[832px]">
          <h2 className="text-2xl font-black text-[#111827] sm:text-3xl">Your Complete Guide to Little Caesars Menus and Prices</h2>
          <p className="mt-5 text-base leading-8 text-slate-700">
            Little Caesars Menu is built as a practical guide for current menu information, prices, calories, deals and popular combinations. Browse pizzas, sides, wings, sauces, drinks and desserts, compare nutrition details, and find the best value meals before your next pickup or delivery order.
          </p>
        </div>
      </section>
    </main>
  )
}
