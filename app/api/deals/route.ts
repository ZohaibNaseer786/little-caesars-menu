import { getFallbackDeals } from '@/lib/fallback'
import { menuProxy } from '@/lib/proxy'
import type { Deal } from '@/types'

export const runtime = 'edge'

const generalFallbackDeals: Deal[] = [
  {
    id: 'four-n-one-stix-meal-deal',
    title: 'Four-N-One™ Stix Meal Deal',
    description: 'Four-N-One™ Stix, a Large Classic, Crazy Combo® and a 2-liter PEPSI-COLA® product.',
    price: 19.99,
    originalPrice: 19.99,
    badge: 'MEAL DEAL',
    image: 'https://banners.littlecaesars.com/us/banner-assets/178b255e-09b1-4dde-9124-21db92178c47.png',
    discountType: 'flat',
    discountValue: 0,
    minimumOrder: 0,
    orderTypes: ['pickup', 'delivery'],
    validUntil: null,
    isLimitedTime: true,
    isAppOnly: false,
    isAvailable: true
  },
]

function getGeneralFallbackDeals() {
  const today = new Date().toISOString().slice(0, 10)
  const publicStoreDeals = getFallbackDeals().filter(
    (deal) => deal.isAvailable && !deal.isAppOnly && (!deal.validUntil || deal.validUntil >= today)
  )
  return [...generalFallbackDeals, ...publicStoreDeals]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'en-us'

  return menuProxy({
    endpoint: `/deals?locale=${locale}&platform=web`,
    label: '/deals platform=web',
    cacheSeconds: 120,
    fallback: getGeneralFallbackDeals(),
    locale,
    validate: Array.isArray
  })
}
