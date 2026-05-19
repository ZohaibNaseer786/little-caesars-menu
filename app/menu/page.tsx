import type { Metadata } from 'next'
import { MenuPageClient } from '@/components/menu/MenuPageClient'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Little Caesars Menu Prices 2026 | Pizza, Wings, Sides & Drinks',
  description: 'Browse Little Caesars menu prices for 2026 with pizza, HOT-N-READY items, Crazy Bread, wings, drinks, desserts, calories and deals.',
  keywords: ['Little Caesars menu prices', 'littlecaesars menu', 'Little Caesars pizza prices', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/menu') }
}

export default function MenuPage() {
  return <MenuPageClient />
}
