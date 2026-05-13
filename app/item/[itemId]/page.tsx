import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { ItemDetail } from '@/components/menu/ItemDetail'
import { getFallbackItem } from '@/lib/fallback'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ itemId: string }> }): Promise<Metadata> {
  const { itemId } = await params
  const item = getFallbackItem(itemId)

  if (!item) {
    return { title: 'Menu Item Not Found' }
  }

  return {
    title: `${item.name} | Little Caesars Menu - $${item.basePrice.toFixed(2)}`,
    description: `${item.name} in the Little Caesars menu guide - ${item.description}. ${item.calories.label}. Guide price $${item.basePrice.toFixed(2)}.`,
    alternates: { canonical: `https://littlecaesarsmenu.com/item/${item.id}` },
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: item.name,
    description: item.description,
    image: item.image.full,
    offers: {
      '@type': 'Offer',
      price: item.basePrice,
      priceCurrency: 'USD',
      availability: item.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${item.nutrition?.calories} calories`,
      fatContent: `${item.nutrition?.totalFat}g`,
      proteinContent: `${item.nutrition?.protein}g`,
      carbohydrateContent: `${item.nutrition?.totalCarbs}g`,
      sodiumContent: `${item.nutrition?.sodium}mg`
    }
  }

  return (
    <>
      <ItemDetail itemId={itemId} fallbackItem={item} />
      <Script id={`menu-item-${item.id}-structured-data`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  )
}
