import { getFallbackStore } from '@/lib/fallback'
import { menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'en-us'
  const query = searchParams.get('query')
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const fallback = [
    { ...getFallbackStore(), distance: 1.2 },
    { ...getFallbackStore(), id: '10379', name: 'Little Caesars Midtown', distance: 3.8 },
    { ...getFallbackStore(), id: '10380', name: 'Little Caesars Riverfront', distance: 5.4 }
  ]

  if (query) {
    return menuProxy({
      endpoint: `/stores/search?query=${encodeURIComponent(query)}&locale=${locale}`,
      label: `/stores search="${query}"`,
      cacheSeconds: 300,
      fallback,
      locale,
      validate: Array.isArray
    })
  }

  return menuProxy({
    endpoint: `/stores/nearby?lat=${lat ?? '42.3314'}&lng=${lng ?? '-83.0458'}&locale=${locale}&radius=25`,
    label: `/stores nearby`,
    cacheSeconds: 300,
    fallback,
    locale,
    validate: Array.isArray
  })
}
