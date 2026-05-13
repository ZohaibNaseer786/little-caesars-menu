'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { CategoryTabs } from '@/components/layout/CategoryTabs'
import { FilterBar } from '@/components/menu/FilterBar'
import { MenuCardSkeleton } from '@/components/menu/MenuCardSkeleton'
import { MenuGrid } from '@/components/menu/MenuGrid'
import { useCategories, useMenu } from '@/hooks/useMenu'
import { useAppStore } from '@/store/useAppStore'
import type { Category, MenuItem } from '@/types'

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

export function MenuPageClient({ categorySlug }: { categorySlug?: string }) {
  const [filter, setFilter] = useState('all')
  const storeId = useAppStore((state) => state.storeId)
  const orderType = useAppStore((state) => state.orderType)
  const menuQuery = useMenu(storeId, orderType)
  const categoriesQuery = useCategories(storeId)

  const categories = (categoriesQuery.data ?? menuQuery.data?.categories ?? []).filter((category) => category.isAvailable)
  const items = menuQuery.data?.items ?? []

  const sections = useMemo(() => {
    const filteredItems = items.filter((item) => item.isAvailable && item.orderTypes.includes(orderType) && matchesFilter(item, filter))
    return categories
      .map((category) => ({ category, items: sectionItems(category, filteredItems) }))
      .filter((section) => section.items.length > 0)
      .filter((section) => (categorySlug ? section.category.slug === categorySlug : true))
  }, [categories, categorySlug, filter, items, orderType])

  const loading = menuQuery.isLoading || categoriesQuery.isLoading

  return (
    <div className="space-y-6 pb-10 lg:space-y-8">
      <section className="container-shell pt-6">
        <div className="overflow-hidden rounded-3xl bg-orange text-white shadow-card">
          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center lg:p-10 xl:p-12">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/85">Little Caesars Menu Guide</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Best value in pizza, sliced for browsing
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
                Explore HOT-N-READY favorites, ExtraMostBestest pizzas, Detroit-style deep dish, Crazy Bread, wings, desserts, prices and calories in one clean menu guide.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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

      {categories.length > 0 && <CategoryTabs categories={categories} />}
      <FilterBar active={filter} onChange={setFilter} />

      <div className="container-shell">
        <div className="grid gap-12">
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
