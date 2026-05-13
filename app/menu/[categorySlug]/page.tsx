import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MenuPageClient } from '@/components/menu/MenuPageClient'
import { getFallbackMenu } from '@/lib/fallback'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params
  const category = getFallbackMenu().categories.find((entry) => entry.slug === categorySlug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} Menu 2026 | Little Caesars Prices & Calories`,
    description: `Browse Little Caesars ${category.name} menu items with 2026 prices, calories and nutrition details.`,
    alternates: { canonical: `https://littlecaesarsmenu.com/menu/${category.slug}` }
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params
  const category = getFallbackMenu().categories.find((entry) => entry.slug === categorySlug)

  if (!category) {
    notFound()
  }

  return <MenuPageClient categorySlug={categorySlug} />
}
