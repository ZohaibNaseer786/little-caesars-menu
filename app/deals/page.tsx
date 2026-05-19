import type { Metadata } from 'next'
import { DealsPageClient } from '@/components/deals/DealsPageClient'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Little Caesars Deals 2026 | Promo Codes, Coupons & Value Combos',
  description: 'Browse Little Caesars deals, promo codes, coupons, value combos and limited-time specials in an independent 2026 savings guide.',
  keywords: ['littlecaesars promo code', 'Little Caesars deals', 'Little Caesars coupons', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/deals') }
}

export default function DealsPage() {
  return <DealsPageClient />
}
