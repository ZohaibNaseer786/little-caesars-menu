import type { Metadata } from 'next'
import { DealsPageClient } from '@/components/deals/DealsPageClient'
import { getFallbackDeals } from '@/lib/fallback'
import { absoluteUrl, contentDates, siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Deals 2026: Coupons & Promo Codes',
  description: 'Browse Little Caesars deals, promo codes, coupons, value combos and limited-time specials in an independent 2026 savings guide.',
  keywords: ['littlecaesars promo code', 'Little Caesars deals', 'Little Caesars coupons', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/deals') }
}

export default function DealsPage() {
  const publicDeals = getFallbackDeals().filter((deal) => deal.isAvailable && !deal.isAppOnly)
  return <DealsPageClient initialDeals={publicDeals} asOfDate={contentDates.deals} />
}
