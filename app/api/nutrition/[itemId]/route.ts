import { getFallbackNutrition } from '@/lib/fallback'
import { jsonWithCache, menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request, context: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await context.params
  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get('storeId') ?? process.env.NEXT_PUBLIC_DEFAULT_STORE_ID ?? '10378'
  const locale = searchParams.get('locale') ?? 'en-us'
  const fallback = getFallbackNutrition(itemId)

  if (!fallback) {
    return jsonWithCache({ error: 'Nutrition item not found' }, 60, 404)
  }

  return menuProxy({
    endpoint: `/stores/${storeId}/menu/items/${itemId}/nutrition?locale=${locale}`,
    label: `/nutrition/${itemId} storeId=${storeId}`,
    cacheSeconds: 3600,
    fallback,
    locale,
    validate: (data) => Boolean(data && typeof data === 'object')
  })
}
