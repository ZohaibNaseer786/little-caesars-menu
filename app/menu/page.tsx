import type { Metadata } from 'next'
import { MenuPageClient } from '@/components/menu/MenuPageClient'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Little Caesars Full Menu 2026 | Pizza, Wings, Sides & Drinks',
  description: 'Browse the Little Caesars menu guide for 2026 with pizza prices, calories, HOT-N-READY items, Crazy Bread, wings, desserts and deals.',
  alternates: { canonical: 'https://littlecaesarsmenu.com/menu' }
}

export default function MenuPage() {
  return <MenuPageClient />
}
