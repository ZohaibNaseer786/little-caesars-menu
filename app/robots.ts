import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'

const disallowedPaths = [
  '/admin/',
  '/api/',
  '/guestpost/',
  '/sentry-example-page',
  '/sentry-test',
  '/monitoring',
  '/menu/favorites',
  '/search'
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowedPaths
    },
    sitemap: [absoluteUrl('/sitemap.xml'), absoluteUrl('/image-sitemap.xml')]
  }
}
