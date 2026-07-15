import type { Metadata } from 'next'
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

  return <MenuPageClient categorySlug={categorySlug} initialMenu={menu} initialCategories={menu.categories} />
}
