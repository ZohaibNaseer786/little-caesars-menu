import type { Metadata } from 'next'
import { MenuPageClient } from '@/components/menu/MenuPageClient'
import { getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Menu Prices 2026 | Pizza, Wings, Sides & Drinks',
  description: 'Browse Little Caesars menu prices for 2026 with pizza, HOT-N-READY items, Crazy Bread, wings, drinks, desserts, calories and deals.',
  keywords: ['Little Caesars menu prices', 'littlecaesars menu', 'Little Caesars pizza prices', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/menu') }
}

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams
  const menu = getFallbackMenu()
  return <MenuPageClient initialMenu={menu} initialCategories={menu.categories} searchQuery={q.trim().slice(0, 80)} />
}
