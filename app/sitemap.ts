import type { MetadataRoute } from 'next'
import { getFallbackMenu } from '@/lib/fallback'
import { blogPosts } from '@/lib/blog'
import { absoluteUrl, contentDates } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fallbackMenu = getFallbackMenu()
  const items = fallbackMenu.items
  const categories = fallbackMenu.categories
  const itemUrls = items.map((item) => ({
    url: absoluteUrl(`/item/${item.id}`),
    lastModified: new Date(contentDates.menu),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))
  const categoryUrls = categories.map((category) => ({
    url: absoluteUrl(`/menu/${category.slug}`),
    lastModified: new Date(contentDates.menu),
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
    { url: absoluteUrl('/'), lastModified: new Date(contentDates.site), priority: 1.0, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/menu'), lastModified: new Date(contentDates.menu), priority: 0.92, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/deals'), lastModified: new Date(contentDates.deals), priority: 0.9, changeFrequency: 'daily' as const },
    { url: absoluteUrl('/nutrition'), lastModified: new Date(contentDates.nutrition), priority: 0.84, changeFrequency: 'monthly' as const },
    { url: absoluteUrl('/stores'), lastModified: new Date(contentDates.stores), priority: 0.78, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/blog'), priority: 0.82, changeFrequency: 'weekly' as const },
    { url: absoluteUrl('/about'), lastModified: new Date(contentDates.site), priority: 0.45, changeFrequency: 'yearly' as const },
    { url: absoluteUrl('/contact'), lastModified: new Date(contentDates.site), priority: 0.4, changeFrequency: 'yearly' as const },
    { url: absoluteUrl('/editorial-policy'), lastModified: new Date(contentDates.site), priority: 0.4, changeFrequency: 'yearly' as const },
    { url: absoluteUrl('/privacy'), lastModified: new Date(contentDates.site), priority: 0.3, changeFrequency: 'yearly' as const },
    ...categoryUrls,
    ...blogUrls,
    ...itemUrls
  ]
}
