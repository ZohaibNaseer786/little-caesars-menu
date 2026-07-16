import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { ItemDetail } from '@/components/menu/ItemDetail'
import { getFallbackItem, getFallbackMenu } from '@/lib/fallback'
import { itemEditorial } from '@/lib/item-editorial'
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
  const menu = getFallbackMenu()
  const category = menu.categories.find((entry) => entry.id === item.categoryId)
  const editorial = itemEditorial[item.id]
  const editorialRelated = editorial?.relatedItemIds
    .map((relatedId) => menu.items.find((entry) => entry.id === relatedId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)) ?? []
  const relatedItems = editorialRelated.length
    ? editorialRelated
    : menu.items.filter((entry) => entry.categoryId === item.categoryId && entry.id !== item.id && entry.isAvailable).slice(0, 3)
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
      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="item-guide-heading">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Independent Menu Guide</p>
              <h2 id="item-guide-heading" className="mt-3 font-display text-3xl font-black text-navy">
                {editorial?.heading ?? `${item.name} price and menu notes`}
              </h2>
              <div className="mt-5 space-y-4 leading-8 text-slate-700">
                {(editorial?.paragraphs ?? [
                  `${item.name} is listed at ${item.basePrice > 0 ? `$${item.basePrice.toFixed(2)}` : 'a store-dependent price'} with a calorie label of ${item.calories.label}. Prices and availability can vary by location and order type.`,
                  `Use the category, nutrition and price-comparison links below to compare similar menu items before confirming current information with the selected restaurant.`
                ]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-black">
                {category && <Link href={`/menu/${category.slug}`} className="text-orange hover:text-orange-soft">Browse {category.name} →</Link>}
                <Link href="/nutrition" className="text-orange hover:text-orange-soft">Compare nutrition →</Link>
                <Link href="/research/menu-price-comparison" className="text-orange hover:text-orange-soft">Full price table →</Link>
              </div>
            </div>
            <aside className="border-l-4 border-orange bg-[#fff7f0] p-6">
              <h2 className="text-lg font-black text-navy">Related menu items</h2>
              <div className="mt-4 grid gap-3">
                {relatedItems.map((related) => (
                  <Link key={related.id} href={`/item/${related.id}`} className="border-b border-orange/20 pb-3 font-bold text-navy last:border-0 last:pb-0 hover:text-orange">
                    <span className="block leading-snug">{related.name}</span>
                    <span className="mt-1 block text-sm font-medium text-slate-600">{related.basePrice > 0 ? `$${related.basePrice.toFixed(2)}` : 'Price varies'} · {related.calories.label}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
          <p className="mt-10 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600">
            Source and method: this independent guide organizes public-facing menu and nutrition references for comparison. See the{' '}
            <Link href="/editorial-policy" className="font-bold text-orange hover:underline">editorial policy</Link>{' '}
            and confirm current details on the{' '}
            <a href="https://littlecaesars.com/en-us/menu/" target="_blank" rel="noreferrer" className="font-bold text-orange hover:underline">official Little Caesars menu</a>.
          </p>
        </div>
      </section>
      <Script id={`menu-item-${item.id}-structured-data`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  )
}
