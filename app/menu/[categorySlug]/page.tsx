import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MenuPageClient } from '@/components/menu/MenuPageClient'
import { getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl, siteConfig, truncateSeoText } from '@/lib/seo'

export function generateStaticParams() {
  return getFallbackMenu().categories.map((category) => ({ categorySlug: category.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params
  const category = getFallbackMenu().categories.find((entry) => entry.slug === categorySlug)

  if (!category) {
    return { title: 'Category Not Found', robots: { index: false, follow: false } }
  }

  return {
    title: truncateSeoText(`${category.name} Menu Prices & Calories`, 65),
    description: `Browse Little Caesars ${category.name} menu items with 2026 prices, calories and nutrition details.`,
    keywords: [`Little Caesars ${category.name} menu`, 'Little Caesars menu prices', ...siteConfig.keywords],
    alternates: { canonical: absoluteUrl(`/menu/${category.slug}`) }
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params
  const menu = getFallbackMenu()
  const category = menu.categories.find((entry) => entry.slug === categorySlug)

  if (!category) {
    notFound()
  }

  const categoryItems = menu.items.filter((item) => item.categoryId === category.id && item.isAvailable)
  const pricedItems = categoryItems.filter((item) => item.basePrice > 0)
  const prices = pricedItems.map((item) => item.basePrice)
  const priceRange = prices.length
    ? `$${Math.min(...prices).toFixed(2)} to $${Math.max(...prices).toFixed(2)}`
    : 'varies by item and store'

  return (
    <>
      <MenuPageClient
        categorySlug={categorySlug}
        initialMenu={menu}
        initialCategories={menu.categories}
        pageTitle={`Little Caesars ${category.name} menu prices`}
        pageDescription={`Compare ${categoryItems.length} ${category.name.toLowerCase()} items with pictures, guide prices and calorie labels. Listed prices range from ${priceRange}; local prices may vary.`}
      />
      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="category-guide-heading">
        <div className="mx-auto max-w-[1120px]">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Category Guide</p>
          <h2 id="category-guide-heading" className="mt-3 font-display text-3xl font-black text-navy">
            {category.name} prices and nutrition notes
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-700">
            This category contains {categoryItems.length} available guide items. {pricedItems.length > 0 ? `Listed prices currently range from ${priceRange}.` : 'Prices depend on the selected item and store.'} Compare the calorie label on each item, then confirm price, ingredients and availability with your selected restaurant.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categoryItems.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/item/${item.id}`} className="border-l-4 border-orange bg-[#fff7f0] px-4 py-4 font-bold text-navy transition hover:bg-[#ffeadb]">
                <span className="block leading-snug">{item.name}</span>
                <span className="mt-2 block text-sm text-slate-600">{item.basePrice > 0 ? `$${item.basePrice.toFixed(2)}` : 'Price varies'} · {item.calories.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-black">
            <Link href="/research/menu-price-comparison" className="text-orange hover:text-orange-soft">Compare all 108 menu prices →</Link>
            <Link href="/nutrition" className="text-orange hover:text-orange-soft">Review calories and allergens →</Link>
            <Link href="/deals" className="text-orange hover:text-orange-soft">Compare public deals →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
