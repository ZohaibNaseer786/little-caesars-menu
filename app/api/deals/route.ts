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
  {
    id: '3off18',
    title: '$3 Off Your Order of $18 or More',
    description: 'Add items to cart. Code applied at checkout.',
    price: 0,
    originalPrice: 3,
    badge: 'SAVE HERE!',
    image: 'https://mobilestatic.littlecaesars.com/weborderingimages/4a10fa34-207e-4db4-ba42-30e3c7907318.jpg',
    promoCode: '3OFF18',
    discountType: 'flat',
    discountValue: 3,
    minimumOrder: 18,
    orderTypes: ['pickup', 'delivery'],
    validUntil: '2026-05-31',
    isLimitedTime: true,
    isAppOnly: false,
    isAvailable: true
  },
  {
    id: 'delivery4you',
    title: '$4 Off Delivery',
    description: 'Add items to cart. Code applied at checkout.',
    price: 0,
    originalPrice: 4,
    badge: 'GET DELIVERY!',
    image: 'https://mobilestatic.littlecaesars.com/weborderingimages/4f19503b-3c2f-4322-af48-b471e48e47c0.jpg',
    promoCode: 'DELIVERY4YOU',
    discountType: 'flat',
    discountValue: 4,
    minimumOrder: 24,
    orderTypes: ['delivery'],
    validUntil: null,
    isLimitedTime: true,
    isAppOnly: false,
    isAvailable: true
  }
]

function getGeneralFallbackDeals() {
  const publicStoreDeals = getFallbackDeals().filter((deal) => deal.isAvailable && !deal.isAppOnly)
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
