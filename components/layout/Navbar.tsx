'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const topNavItems = [
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'Advertise', href: '/contact' },
  { label: 'Submit a Restaurant', href: '/contact' }
]

const navItems = [
  { label: 'Restaurant Menus', href: '/menu', hasDropdown: true },
  { label: 'Menus with Prices', href: '/menu', hasDropdown: true },
  { label: 'Meal Planner', href: '/menu', hasDropdown: true },
  { label: 'Deals & Coupons', href: '/deals', hasDropdown: true },
  { label: 'Blogs & Guides', href: '/blog', hasDropdown: true },
  { label: 'More Menus', href: '/menu', hasDropdown: true },
  { label: 'Latest Updates', href: '/blog', highlight: true }
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2.5">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2.5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Navigation Bar */}
      <div className="hidden border-b border-slate-200 bg-[#1F2937] px-4 py-3 sm:block lg:px-8">
        <div className="mx-auto max-w-[1216px] flex items-center justify-between text-sm">
          <div className="flex gap-6">
            {topNavItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            <Link href="/stores" className="text-slate-300 transition hover:text-white">
              Contact
            </Link>
            <Link href="/" className="text-slate-300 transition hover:text-white">
              About
            </Link>
            <Link href="/deals" className="rounded-full bg-[#F56600] px-4 py-1 text-xs font-bold text-white transition hover:bg-[#D94F00]">
              Coupons & Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-slate-200 bg-white px-3 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1216px] items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#172033] transition hover:bg-slate-100 lg:hidden"
          >
            <span className="h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current" />
          </button>

          <Link href="/" aria-label="Little Caesars Menu home" className="flex min-w-0 shrink items-center sm:shrink-0">
            <Image
              src="/images/little-caesars-logo.svg"
              alt="Little Caesars Menu"
              width={190}
              height={54}
              priority
              className="h-7 w-auto max-w-[120px] sm:h-8 sm:max-w-[160px]"
            />
          </Link>

          <form className="mx-auto hidden w-full max-w-[384px] md:block" action="/menu">
            <label htmlFor="site-search" className="sr-only">
              Search menus, prices, and restaurants
            </label>
            <div className="flex h-10 items-center rounded-full border border-slate-300 bg-white pl-5 pr-1.5 shadow-sm transition focus-within:border-[#F56600]">
              <input
                id="site-search"
                name="q"
                placeholder="Search menus, prices, and restaurants..."
                className="min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-slate-400"
              />
              <button type="submit" aria-label="Search" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F56600] text-white transition hover:bg-[#D94F00]">
                <SearchIcon />
              </button>
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/stores" className="hidden text-sm font-semibold text-[#172033] transition hover:text-[#F56600] lg:inline-flex">
              Contact
            </Link>
            <Link href="/deals" className="rounded-lg bg-[#F56600] px-4 py-2 text-xs font-bold text-white shadow-[0_8px_20px_rgba(245,102,0,0.24)] transition hover:bg-[#D94F00] sm:text-sm">
              Coupons & Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Navigation Menu */}
      <nav className="hidden border-t border-slate-100 bg-white lg:block" aria-label="Primary navigation">
        <div className="mx-auto max-w-[1216px] px-4 lg:px-8">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className={`flex items-center gap-1 px-4 py-4 text-sm font-semibold transition ${
                    item.highlight ? 'text-[#F56600]' : 'text-slate-700 hover:text-[#F56600]'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronIcon />}
                </button>

                {item.hasDropdown && item.label === 'Restaurant Menus' && (
                  <div className="absolute left-0 top-full hidden w-[900px] border-t-4 border-[#F56600] bg-white shadow-2xl group-hover:block">
                    <div className="grid grid-cols-4 gap-8 p-8">
                      <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">PIZZAS</p>
                        <div className="space-y-3">
                          <Link href="/item/emb-sns" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Slices-N-Stix®
                          </Link>
                          <Link href="/item/emb-snsbacon" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Slices-N-Stix® Bacon
                          </Link>
                          <Link href="/item/emb-snsjal" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Slices-N-Stix® Jalapeño
                          </Link>
                          <Link href="/item/emb-tpep" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Thin Crust Pepperoni
                          </Link>
                          <Link href="/item/hnr-thinchs" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Thin Crust Cheese
                          </Link>
                          <Link href="/item/emb-scpep" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Stuffed Crust Pepperoni
                          </Link>
                          <Link href="/item/emb-5mfp" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            5 Meat Feast®
                          </Link>
                          <Link href="/item/bnr-cus" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Create Your Own Pizza
                          </Link>
                          <Link href="/menu/large-round-pizzas" className="mt-3 inline-block text-sm font-bold text-[#F56600] transition hover:text-[#D94F00]">
                            All Pizzas →
                          </Link>
                        </div>
                      </div>

                      <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">SIDES & BREAD</p>
                        <div className="space-y-3">
                          <Link href="/item/hnr-crzbr" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Crazy Bread®
                          </Link>
                          <Link href="/item/hnr-crzsrc" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Crazy Sauce®
                          </Link>
                          <Link href="/item/hnr-craspep" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Pepperoni Crazy Puffs®
                          </Link>
                          <Link href="/item/hnr-crasches" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            4 Cheese Crazy Puffs®
                          </Link>
                          <Link href="/item/hnr-4nonestix" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Four-N-One™ Stix
                          </Link>
                          <Link href="/item/hnr-us406117" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Four-N-One™ Stix Combo
                          </Link>
                          <Link href="/menu/sides" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Dips & Sauces
                          </Link>
                          <Link href="/menu/sides" className="mt-3 inline-block text-sm font-bold text-[#F56600] transition hover:text-[#D94F00]">
                            All Sides →
                          </Link>
                        </div>
                      </div>

                      <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">VALUE MENU</p>
                        <div className="space-y-3">
                          <Link href="/item/hnr-us700517" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Four-N-One™ Combo
                          </Link>
                          <Link href="/item/hnr-us700491" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Pepperoni + Crazy Puffs
                          </Link>
                          <Link href="/item/hnr-us700489" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Cheese + Pepperoni Puffs
                          </Link>
                          <Link href="/item/hnr-us700488" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Cheese + 4 Cheese Puffs
                          </Link>
                          <Link href="/item/hnr-us700481p" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Slices-N-Stix® + Pepsi®
                          </Link>
                          <Link href="/item/hnr-us700485or" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Caesar Wings® - Oven Roasted
                          </Link>
                          <Link href="/item/hnr-us700485bq" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Caesar Wings® - BBQ
                          </Link>
                          <Link href="/item/hnr-us700485gp" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Caesar Wings® - Garlic Parmesan
                          </Link>
                          <Link href="/menu/more-for-10-99-menu" className="mt-3 inline-block text-sm font-bold text-[#F56600] transition hover:text-[#D94F00]">
                            All Value Menu →
                          </Link>
                        </div>
                      </div>

                      <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">EXPLORE MORE</p>
                        <div className="space-y-3">
                          <Link href="/menu/detroit-style-deep-dish-pizzas" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Detroit-Style Deep Dish
                          </Link>
                          <Link href="/menu/limited-time-offer" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Limited Time Offers
                          </Link>
                          <Link href="/nutrition" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Nutrition Information
                          </Link>
                          <Link href="/stores" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Find a Location
                          </Link>
                          <Link href="/deals" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Coupons & Deals
                          </Link>
                          <Link href="/blog" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Menu Guides
                          </Link>
                          <Link href="/menu" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            View All Items
                          </Link>
                          <Link href="/menu" className="mt-3 inline-block text-sm font-bold text-[#F56600] transition hover:text-[#D94F00]">
                            Full Menu →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {item.hasDropdown && item.label !== 'Restaurant Menus' && (
                  <div className="absolute left-0 hidden min-w-[280px] border-t-2 border-[#F56600] bg-white shadow-lg group-hover:block">
                    <Link href={item.href} className="block px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#F56600]">
                      View All {item.label}
                    </Link>
                    <div className="border-t border-slate-100 px-6 py-4 space-y-2">
                      {item.label === 'Menus with Prices' && (
                        <>
                          <Link href="/menu/pizza" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Pizza Menus & Prices
                          </Link>
                          <Link href="/menu/sides" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Sides & Appetizers
                          </Link>
                          <Link href="/menu/wings" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Wings & Tenders
                          </Link>
                          <Link href="/nutrition" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Nutrition Information
                          </Link>
                        </>
                      )}
                      {item.label === 'Meal Planner' && (
                        <>
                          <Link href="/deals?type=combo" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Combo Meals
                          </Link>
                          <Link href="/deals?type=bundle" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Bundle Deals
                          </Link>
                          <Link href="/nutrition" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Healthy Options
                          </Link>
                          <Link href="/menu" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Meal Customizer
                          </Link>
                        </>
                      )}
                      {item.label === 'Deals & Coupons' && (
                        <>
                          <Link href="/deals?sort=newest" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Latest Offers
                          </Link>
                          <Link href="/deals?type=promo" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Promo Codes
                          </Link>
                          <Link href="/deals?type=coupon" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Printable Coupons
                          </Link>
                          <Link href="/deals?type=seasonal" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Seasonal Specials
                          </Link>
                        </>
                      )}
                      {item.label === 'Blogs & Guides' && (
                        <>
                          <Link href="/blog?category=prices" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Price Guides
                          </Link>
                          <Link href="/blog?category=nutrition" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Nutrition Guides
                          </Link>
                          <Link href="/blog?category=locations" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Store Locator
                          </Link>
                          <Link href="/blog?category=deals" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Deal Alerts
                          </Link>
                        </>
                      )}
                      {item.label === 'More Menus' && (
                        <>
                          <Link href="/menu/pizza" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Pizza & Specialty Items
                          </Link>
                          <Link href="/menu/desserts" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Desserts & Drinks
                          </Link>
                          <Link href="/menu/limited" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Limited Time Offers
                          </Link>
                          <Link href="/stores" className="block text-sm text-slate-700 transition hover:text-[#F56600]">
                            Find a Location
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden sm:px-6">
          <form action="/menu" className="mb-4">
            <div className="flex h-11 items-center rounded-full border border-slate-300 bg-white pl-5 pr-1">
              <input name="q" placeholder="Search menus, prices, and restaurants..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button type="submit" aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F56600] text-white">
                <SearchIcon />
              </button>
            </div>
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    item.highlight ? 'text-[#F56600]' : 'text-[#172033] hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
