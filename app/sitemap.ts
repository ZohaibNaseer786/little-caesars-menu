import type { MetadataRoute } from 'next'
import { getFallbackMenu } from '@/lib/fallback'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = getFallbackMenu().items
  const itemUrls = items.map((item) => ({
    url: `https://littlecaesarsmenu.com/item/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  return [
    { url: 'https://littlecaesarsmenu.com', priority: 1.0, changeFrequency: 'daily' as const },
    { url: 'https://littlecaesarsmenu.com/menu', priority: 0.9, changeFrequency: 'daily' as const },
    { url: 'https://littlecaesarsmenu.com/deals', priority: 0.9, changeFrequency: 'hourly' as const },
    { url: 'https://littlecaesarsmenu.com/nutrition', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: 'https://littlecaesarsmenu.com/stores', priority: 0.7, changeFrequency: 'weekly' as const },
    ...itemUrls
  ]
}
