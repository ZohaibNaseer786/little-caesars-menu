import { getFallbackNutritionAll } from '@/lib/fallback'
import { jsonWithCache } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request) {
  const started = Date.now()
  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get('storeId') ?? process.env.NEXT_PUBLIC_DEFAULT_STORE_ID ?? '10378'
  console.log(`[API Proxy] GET /nutrition/all storeId=${storeId} status=200 duration=${Date.now() - started}ms`)
  return jsonWithCache(getFallbackNutritionAll(), 3600)
}
