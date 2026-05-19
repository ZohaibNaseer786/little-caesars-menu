'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/menu', label: 'Little Caesars Menu' },
  { href: '/menu', label: 'Menu Types' },
  { href: '/nutrition', label: 'Meal Planner' },
  { href: '/deals', label: 'Latest Menu Updates', highlight: true },
  { href: '/stores', label: 'Find a Store' },
  { href: '/nutrition', label: 'Nutrition' }
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2.5">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex h-16 max-w-[1216px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#172033] transition hover:bg-slate-100 lg:hidden"
        >
          <span className="h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current" />
        </button>

        <Link href="/" aria-label="Little Caesars Menu home" className="flex shrink-0 items-center">
          <Image
            src="/images/little-caesars-logo.svg"
            alt="Little Caesars Menu"
            width={190}
            height={54}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <form className="mx-auto hidden w-full max-w-[448px] md:block" action="/menu">
          <label htmlFor="site-search" className="sr-only">
            Search menus, prices, and restaurants
          </label>
          <div className="flex h-10 items-center rounded-full border border-slate-300 bg-white pl-5 pr-1 shadow-sm transition focus-within:border-[#F56600]">
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/stores" className="hidden text-sm font-semibold text-[#172033] transition hover:text-[#F56600] sm:inline-flex">
            Contact
          </Link>
          <Link href="/deals" className="rounded-full bg-[#F56600] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(245,102,0,0.24)] transition hover:bg-[#D94F00]">
            Coupons & Deals
          </Link>
        </div>
      </div>

      <nav className="hidden border-t border-slate-100 bg-white lg:block" aria-label="Primary navigation">
        <div className="mx-auto flex h-12 max-w-[880px] items-center justify-center gap-8 px-4">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href)

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={`text-sm font-semibold transition hover:text-[#F56600] ${
                  item.highlight ? 'text-[#F56600]' : active ? 'text-[#111827]' : 'text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden">
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
              <Link
                key={`${item.href}-${item.label}-mobile`}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
                  pathname.startsWith(item.href) ? 'bg-[#172033] text-white' : 'text-[#172033] hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
