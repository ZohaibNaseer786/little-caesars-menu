'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useStoreInfo } from '@/hooks/useStore'
import { useAppStore } from '@/store/useAppStore'

const navItems = [
  { href: '/menu', label: 'Menu' },
  { href: '/deals', label: "Today's Deals" },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/stores', label: 'Find a Store' }
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const storeId = useAppStore((state) => state.storeId)
  const { data: store } = useStoreInfo(storeId)

  return (
    <header className="sticky top-0 z-50 bg-white px-3 pb-3 pt-3 shadow-[0_8px_24px_rgba(26,26,26,0.06)] sm:px-4">
      <div
        className="mx-auto mb-2 max-w-[92rem] rounded-full border border-orange/25 bg-white/95 px-4 py-2 text-center text-[11px] font-black uppercase tracking-[0.08em] text-navy shadow-[0_10px_24px_rgba(26,26,26,0.08)] backdrop-blur sm:text-xs"
        role="note"
      >
        Independent Little Caesars menu guide for prices, deals and nutrition.
      </div>

      <div className="mx-auto max-w-[92rem] rounded-[28px] border border-white/75 bg-white/95 shadow-[0_18px_40px_-28px_rgba(26,26,26,0.5)] backdrop-blur">
        <div className="container-shell flex h-16 items-center gap-3 sm:h-20 sm:gap-5">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-navy backdrop-blur-sm lg:hidden"
          >
            <span className="h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current" />
          </button>

          <Link href="/" className="flex min-w-0 shrink-0 items-center" aria-label="Little Caesars Menu home">
            <Image
              src="/images/little-caesars-logo.svg"
              alt="Little Caesars Menu"
              width={224}
              height={64}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <nav className="mx-auto hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-black uppercase tracking-[0.02em] transition-colors hover:text-orange ${
                  pathname.startsWith(item.href) ? 'text-orange' : 'text-navy'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 xl:flex">
            <Link href="/stores" className="max-w-[240px] truncate text-sm font-black text-navy transition hover:text-orange">
              {store?.name ?? `Store ${storeId}`}
            </Link>
          </div>

          <Link
            href="/deals"
            className="ml-auto inline-flex min-h-11 items-center rounded-full bg-orange px-4 text-sm font-black uppercase text-white shadow-[0_12px_28px_rgba(245,102,0,0.24)] transition hover:bg-orange-soft lg:ml-0"
          >
            Deals
          </Link>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-[92rem] rounded-[24px] border border-white/75 bg-white/95 p-3 shadow-dropdown backdrop-blur lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition-colors ${
                  pathname.startsWith(item.href) ? 'bg-navy text-white' : 'text-navy hover:bg-orange/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/stores" onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-navy hover:bg-orange/5">
              {store?.name ?? `Store ${storeId}`}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
