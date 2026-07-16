'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { CategoryTabs } from '@/components/layout/CategoryTabs'
import { FilterBar } from '@/components/menu/FilterBar'
import { MenuCardSkeleton } from '@/components/menu/MenuCardSkeleton'
import { MenuGrid } from '@/components/menu/MenuGrid'
import { useCategories, useMenu } from '@/hooks/useMenu'
import { useAppStore } from '@/store/useAppStore'
import type { Category, MenuItem, MenuResponse } from '@/types'

function matchesFilter(item: MenuItem, filter: string) {
  if (filter === 'vegetarian') return item.tags.includes('vegetarian')
  if (filter === 'featured') return item.isFeatured
  if (filter === 'hot-ready') return item.isHotNReady
  if (filter === 'limited') return item.badge === 'NEW' || item.isLimitedTime || item.badge === 'LIMITED'
  if (filter === 'meat') return item.tags.some((tag) => ['pepperoni', 'sausage', 'bacon', 'meat', 'wings'].includes(tag))
  return true
}

function sectionItems(category: Category, items: MenuItem[]) {
  if (category.slug === 'featured') {
    return items.filter((item) => item.isFeatured)
  }
  return items.filter((item) => item.categoryId === category.id)
}

function matchesSearch(item: MenuItem, searchQuery: string) {
  if (!searchQuery) return true
  const searchable = [item.name, item.description, ...item.tags].join(' ').toLowerCase()
  return searchable.includes(searchQuery.toLowerCase())
}

type MenuPageClientProps = {
  categorySlug?: string
  initialMenu: MenuResponse
  initialCategories: Category[]
  searchQuery?: string
  pageTitle?: string
  pageDescription?: string
}

export function MenuPageClient({
  categorySlug,
  initialMenu,
  initialCategories,
  searchQuery = '',
  pageTitle = 'Little Caesars menu with pictures and prices',
  pageDescription = 'Explore HOT-N-READY favorites, ExtraMostBestest pizzas, Detroit-style deep dish, Crazy Bread, wings, desserts, prices and calories in one clean menu guide.'
}: MenuPageClientProps) {
  const [filter, setFilter] = useState('all')
  const storeId = useAppStore((state) => state.storeId)
  const orderType = useAppStore((state) => state.orderType)
  const menuQuery = useMenu(storeId, orderType, initialMenu)
  const categoriesQuery = useCategories(storeId, initialCategories)

  const categories = (categoriesQuery.data ?? menuQuery.data?.categories ?? []).filter((category) => category.isAvailable)
  const items = menuQuery.data?.items ?? []

  const sections = useMemo(() => {
    const filteredItems = items.filter(
      (item) => item.isAvailable && item.orderTypes.includes(orderType) && matchesFilter(item, filter) && matchesSearch(item, searchQuery)
    )
    return categories
      .map((category) => ({ category, items: sectionItems(category, filteredItems) }))
      .filter((section) => section.items.length > 0)
      .filter((section) => (categorySlug ? section.category.slug === categorySlug : true))
  }, [categories, categorySlug, filter, items, orderType, searchQuery])

  const loading = menuQuery.isLoading || categoriesQuery.isLoading

  return (
    <div className="space-y-6 pb-10 lg:space-y-8">
      <section className="container-shell pt-6">
        <div className="overflow-hidden rounded-3xl bg-orange text-white shadow-card">
          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center lg:p-10 xl:p-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/85">Little Caesars Menu Guide</p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white min-[380px]:text-4xl sm:text-5xl lg:text-6xl">{pageTitle}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                {pageDescription}
              </p>
              <div className="mt-6 flex flex-col gap-3 min-[380px]:flex-row min-[380px]:flex-wrap">
                <span className="inline-flex min-h-11 items-center rounded-full bg-black px-4 text-sm font-black uppercase text-white">
                  Pizza! Pizza!
                </span>
                <span className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-black uppercase text-navy">
                  Store {storeId}
                </span>
              </div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/30 bg-white/90">
              <Image
                src="https://littlecaesars.com/images/menu/embpep.png"
                alt="Little Caesars pizza menu items"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Little Caesars menu resources" className="container-shell">
        <div className="flex gap-3 overflow-x-auto border-y border-slate-200 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { href: '/blog/little-caesars-menu-prices', label: 'Picture & price guide' },
            { href: '/research/menu-price-comparison', label: '108-item price table' },
            { href: '/deals', label: 'Current public deals' },
            { href: '/nutrition', label: 'Calories & allergens' },
            { href: '/stores', label: 'Locations & hours' }
          ].map((link) => (
            <Link key={link.href} href={link.href} className="shrink-0 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black text-navy transition hover:border-orange hover:text-orange">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {categories.length > 0 && <CategoryTabs categories={categories} />}
      <FilterBar active={filter} onChange={setFilter} />

      <div className="container-shell">
        <div className="grid gap-12">
          {searchQuery && !loading && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <p className="text-sm font-bold text-slate-600">
                Showing menu results for <span className="text-navy">&ldquo;{searchQuery}&rdquo;</span>
              </p>
            </div>
          )}
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <MenuCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading &&
            sections.map((section) => (
              <section key={section.category.id} id={`category-${section.category.slug}`} className="scroll-mt-40">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{section.category.name}</h2>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500">{section.items.length} items</span>
                </div>
                <MenuGrid items={section.items} />
              </section>
            ))}

          {!loading && sections.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
              <h2 className="font-display text-2xl font-semibold text-navy">No items match this filter</h2>
              <p className="mt-2 text-slate-600">Switch filters or choose another category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
