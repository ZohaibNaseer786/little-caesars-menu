import { getFallbackDeals } from '@/lib/fallback'
import { menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'en-us'
  const type = searchParams.get('type') ?? 'limited-time'
  const fallback = getFallbackDeals().filter((deal) => deal.isLimitedTime)

  return menuProxy({
    endpoint: `/promotions?locale=${locale}&type=${type}`,
    label: `/promotions type=${type}`,
    cacheSeconds: 300,
    fallback,
    locale,
    validate: Array.isArray
  })
}
