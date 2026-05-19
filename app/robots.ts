import type { MetadataRoute } from 'next'
import { siteConfig, absoluteUrl } from '@/lib/seo'

export const runtime = 'edge'

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
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowedPaths
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/'
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: disallowedPaths
      }
    ],
    sitemap: [absoluteUrl('/sitemap.xml'), absoluteUrl('/image-sitemap.xml')],
    host: siteConfig.url
  }
}
