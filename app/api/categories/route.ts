import { getFallbackCategories } from '@/lib/fallback'
import { menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get('storeId') ?? process.env.NEXT_PUBLIC_DEFAULT_STORE_ID ?? '10378'
  const locale = searchParams.get('locale') ?? 'en-us'

  return menuProxy({
    endpoint: `/stores/${storeId}/menu/categories?locale=${locale}`,
    label: `/categories storeId=${storeId}`,
    cacheSeconds: 900,
    fallback: getFallbackCategories(),
    locale,
    validate: Array.isArray
  })
}
