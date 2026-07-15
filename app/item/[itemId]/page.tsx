import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { ItemDetail } from '@/components/menu/ItemDetail'
import { getFallbackItem, getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl, siteConfig, truncateSeoText } from '@/lib/seo'

export function generateStaticParams() {
  return getFallbackMenu().items.map((item) => ({ itemId: item.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ itemId: string }> }): Promise<Metadata> {
  const { itemId } = await params
  const item = getFallbackItem(itemId)

  if (!item) {
    return { title: 'Menu Item Not Found', robots: { index: false, follow: false } }
  }

  return {
    title: truncateSeoText(`${item.name} Price & Calories`, 65),
    description: truncateSeoText(`${item.name}: ${item.description} ${item.calories.label}. Guide price $${item.basePrice.toFixed(2)}; local prices may vary.`, 160),
    keywords: [item.name, `${item.name} price`, `${item.name} calories`, ...siteConfig.keywords],
    alternates: { canonical: absoluteUrl(`/item/${item.id}`) },
    openGraph: {
      images: [{ url: item.image.full, alt: item.name }]
    }
  }
}

export default async function ItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params
  const item = getFallbackItem(itemId)

  if (!item) {
    notFound()
  }

  const hasDetailedNutrition = Boolean(
    item.nutrition && [item.nutrition.totalFat, item.nutrition.totalCarbs, item.nutrition.protein, item.nutrition.sodium].some((value) => value > 0)
  )
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    image: absoluteUrl(item.image.full),
    url: absoluteUrl(`/item/${item.id}`),
    offers: {
      '@type': 'Offer',
      price: item.basePrice,
      priceCurrency: 'USD',
      availability: item.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    ...(hasDetailedNutrition && item.nutrition
      ? {
          nutrition: {
            '@type': 'NutritionInformation',
            calories: `${item.nutrition.calories} calories`,
            fatContent: `${item.nutrition.totalFat}g`,
            proteinContent: `${item.nutrition.protein}g`,
            carbohydrateContent: `${item.nutrition.totalCarbs}g`,
            sodiumContent: `${item.nutrition.sodium}mg`
          }
        }
      : {})
  }

  return (
    <>
      <ItemDetail itemId={itemId} fallbackItem={item} />
      <Script id={`menu-item-${item.id}-structured-data`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  )
}
