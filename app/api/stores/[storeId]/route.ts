import { getFallbackStore } from '@/lib/fallback'
import { menuProxy } from '@/lib/proxy'

export const runtime = 'edge'

export async function GET(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') ?? 'en-us'

  return menuProxy({
    endpoint: `/stores/${storeId}?locale=${locale}`,
    label: `/stores/${storeId}`,
    cacheSeconds: 300,
    fallback: { ...getFallbackStore(), id: storeId },
    locale,
    validate: (data) => Boolean(data && typeof data === 'object')
  })
}
