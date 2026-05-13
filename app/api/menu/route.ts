import { getFallbackMenu } from '@/lib/fallback'
import { hasMenuShape, menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get('storeId') ?? process.env.NEXT_PUBLIC_DEFAULT_STORE_ID ?? '10378'
  const orderType = searchParams.get('orderType') ?? 'pickup'
  const locale = searchParams.get('locale') ?? 'en-us'

  return menuProxy({
    endpoint: `/stores/${storeId}/menu?locale=${locale}&orderType=${orderType}`,
    label: `/menu storeId=${storeId}`,
    cacheSeconds: 300,
    fallback: getFallbackMenu(),
    locale,
    validate: hasMenuShape
  })
}
