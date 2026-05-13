import type { Metadata } from 'next'
import { DealsPageClient } from '@/components/deals/DealsPageClient'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Little Caesars Deals 2026 | Value Combos & Specials',
  description: 'Browse Little Caesars deal highlights, value combos and limited-time specials for 2026 in an informational menu guide.',
  alternates: { canonical: 'https://littlecaesarsmenu.com/deals' }
}

export default function DealsPage() {
  return <DealsPageClient />
}
