import type { MetadataRoute } from 'next'
import { getFallbackMenu } from '@/lib/fallback'
import { blogPosts } from '@/lib/blog'
import { absoluteUrl } from '@/lib/seo'

export const runtime = 'edge'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fallbackMenu = getFallbackMenu()
  const items = fallbackMenu.items
  const categories = fallbackMenu.categories
  const itemUrls = items.map((item) => ({
    url: absoluteUrl(`/item/${item.id}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))
  const nutritionItemUrls = items.slice(0, 40).map((item) => ({
    url: absoluteUrl(`/nutrition/${item.id}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5
  }))
  const categoryUrls = categories.map((category) => ({
    url: absoluteUrl(`/menu/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75
  }))
  const blogUrls = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.72
  }))

  return [
    { url: absoluteUrl('/'), priority: 1.0, changeFrequency: 'daily' as const },
    { url: absoluteUrl('/menu'), priority: 0.92, changeFrequency: 'daily' as const },
    { url: absoluteUrl('/deals'), priority: 0.9, changeFrequency: 'daily' as const },
    { url: absoluteUrl('/nutrition'), priority: 0.84, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/stores'), priority: 0.78, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/blog'), priority: 0.82, changeFrequency: 'weekly' as const },
    ...categoryUrls,
    ...blogUrls,
    ...itemUrls,
    ...nutritionItemUrls
  ]
}
