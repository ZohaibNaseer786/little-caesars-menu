export const siteConfig = {
  name: 'Little Caesars Menu',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.little-caesars-menus.us',
  description:
    'Independent Little Caesars menu guide with prices, deals, promo codes, calories, nutrition facts, locations and hours.',
  socialImage: '/og-image.png',
  keywords: [
    'Little Caesars menu',
    'littlecaesars menu',
    'Little Caesars menu prices',
    'Little Caesars prices 2026',
    'Little Caesars deals',
    'littlecaesars promo code',
    'Little Caesars coupons',
    'Little Caesars near me',
    'Little Caesars hours',
    'Little Caesars nutrition',
    'Little Caesars calories',
    'Little Caesars delivery',
    'HOT-N-READY menu',
    'Crazy Bread calories',
    'Little Caesars pizza prices'
  ]
}

export const contentDates = {
  menu: '2026-07-15',
  deals: '2026-07-15',
  nutrition: '2026-07-15',
  stores: '2026-07-15',
  site: '2026-07-15'
} as const

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url.replace(/\/$/, '')}${cleanPath}`
}

export function truncateSeoText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}
