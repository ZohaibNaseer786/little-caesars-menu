import { getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl, contentDates } from '@/lib/seo'

export const dynamic = 'force-static'

function csvCell(value: string | number | boolean) {
  const normalized = String(value)
  return /[",\n]/.test(normalized) ? `"${normalized.replaceAll('"', '""')}"` : normalized
}

export function GET() {
  const menu = getFallbackMenu()
  const categoryNames = new Map(menu.categories.map((category) => [category.id, category.name]))
  const header = ['item_id', 'item_name', 'category', 'guide_price_usd', 'calorie_label', 'hot_n_ready', 'allergens_listed', 'item_url', 'last_reviewed']
  const rows = menu.items
    .filter((item) => item.isAvailable)
    .map((item) => [
      item.id,
      item.name,
      categoryNames.get(item.categoryId) ?? 'Menu',
      item.basePrice > 0 ? item.basePrice.toFixed(2) : '',
      item.calories.label,
      item.isHotNReady,
      item.allergens.join('|'),
      absoluteUrl(`/item/${item.id}`),
      contentDates.research
    ])
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n')

  return new Response(`${csv}\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="little-caesars-menu-price-comparison.csv"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}
