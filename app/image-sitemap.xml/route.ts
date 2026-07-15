import { blogPosts } from '@/lib/blog'
import { getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl } from '@/lib/seo'

export const dynamic = 'force-static'

type ImageEntry = {
  loc: string
  title: string
  caption?: string
}

type ImageSitemapUrl = {
  loc: string
  images: ImageEntry[]
}

const staticImagePages: ImageSitemapUrl[] = [
  {
    loc: absoluteUrl('/'),
    images: [
      {
        loc: absoluteUrl('/images/home/four-n-one-stix.png'),
        title: 'Little Caesars Four-N-One Stix',
        caption: 'Featured Little Caesars menu item on the homepage'
      },
      {
        loc: absoluteUrl('/images/home/four-n-one-meal-deal.png'),
        title: 'Little Caesars Four-N-One Stix Meal Deal',
        caption: 'Little Caesars meal deal and value combo guide'
      },
      {
        loc: absoluteUrl('/images/home/more-for-999.png'),
        title: 'Little Caesars More for $9.99 Menu',
        caption: 'Little Caesars value menu guide'
      },
      {
        loc: absoluteUrl('/images/home/value-banner-desktop.png'),
        title: 'Little Caesars Best Value in Pizza',
        caption: 'Little Caesars menu prices and value guide'
      }
    ]
  },
  {
    loc: absoluteUrl('/deals'),
    images: [
      {
        loc: absoluteUrl('/images/home/four-n-one-meal-deal.png'),
        title: 'Little Caesars Deals and Promo Codes',
        caption: 'Little Caesars deals, coupons and promo code guide'
      }
    ]
  },
  {
    loc: absoluteUrl('/blog'),
    images: blogPosts.map((post) => ({
      loc: absoluteUrl(post.image),
      title: post.title,
      caption: post.description
    }))
  }
]

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function uniqueImages(images: ImageEntry[]) {
  const seen = new Set<string>()
  return images.filter((image) => {
    if (!image.loc || seen.has(image.loc)) {
      return false
    }

    seen.add(image.loc)
    return true
  })
}

function imageXml(image: ImageEntry) {
  const caption = image.caption ? `<image:caption>${escapeXml(image.caption)}</image:caption>` : ''

  return [
    '<image:image>',
    `<image:loc>${escapeXml(image.loc)}</image:loc>`,
    `<image:title>${escapeXml(image.title)}</image:title>`,
    caption,
    '</image:image>'
  ].join('')
}

function urlXml(entry: ImageSitemapUrl, emittedImageUrls: Set<string>) {
  const images = uniqueImages(entry.images).filter((image) => {
    if (emittedImageUrls.has(image.loc)) {
      return false
    }

    emittedImageUrls.add(image.loc)
    return true
  })

  if (!images.length) {
    return ''
  }

  return [
    '<url>',
    `<loc>${escapeXml(entry.loc)}</loc>`,
    images.map(imageXml).join(''),
    '</url>'
  ].join('')
}

function buildImageSitemap() {
  const fallbackMenu = getFallbackMenu()

  const menuImagePages: ImageSitemapUrl[] = fallbackMenu.items.map((item) => ({
    loc: absoluteUrl(`/item/${item.id}`),
    images: [
      {
        loc: absoluteUrl(item.image.full || item.image.thumbnail),
        title: `${item.name} Little Caesars menu item`,
        caption: item.description
      }
    ]
  }))

  const categoryImagePages: ImageSitemapUrl[] = fallbackMenu.categories.map((category) => {
    const categoryItems = fallbackMenu.items
      .filter((item) => item.categoryId === category.id)
      .slice(0, 10)
      .map((item) => ({
        loc: absoluteUrl(item.image.thumbnail || item.image.full),
        title: `${item.name} in ${category.name}`,
        caption: item.description
      }))

    return {
      loc: absoluteUrl(`/menu/${category.slug}`),
      images: categoryItems
    }
  })

  const blogImagePages: ImageSitemapUrl[] = blogPosts.map((post) => ({
    loc: absoluteUrl(`/blog/${post.slug}`),
    images: [
      {
        loc: absoluteUrl(post.image),
        title: post.title,
        caption: post.description
      }
    ]
  }))

  const entries = [...staticImagePages, ...categoryImagePages, ...menuImagePages, ...blogImagePages]
  const emittedImageUrls = new Set<string>()

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    entries.map((entry) => urlXml(entry, emittedImageUrls)).filter(Boolean).join(''),
    '</urlset>'
  ].join('')
}

export function GET() {
  return new Response(buildImageSitemap(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
    }
  })
}
