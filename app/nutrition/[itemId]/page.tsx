import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AllergenBadges } from '@/components/nutrition/AllergenBadges'
import { getFallbackItem } from '@/lib/fallback'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ itemId: string }> }): Promise<Metadata> {
  const { itemId } = await params
  const item = getFallbackItem(itemId)

  if (!item) return { title: 'Nutrition Not Found' }

  return {
    title: `${item.name} Nutrition Facts | Little Caesars Menu`,
    description: `Nutrition facts for ${item.name}: calories, fat, carbs, protein, sodium and allergens.`,
    alternates: { canonical: `https://littlecaesarsmenu.com/nutrition/${item.id}` }
  }
}

export default async function NutritionItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params
  const item = getFallbackItem(itemId)

  if (!item || !item.nutrition) {
    notFound()
  }

  const rows = [
    ['Calories', `${item.nutrition.calories}`],
    ['Total Fat', `${item.nutrition.totalFat}g`],
    ['Saturated Fat', `${item.nutrition.saturatedFat}g`],
    ['Trans Fat', `${item.nutrition.transFat}g`],
    ['Cholesterol', `${item.nutrition.cholesterol}mg`],
    ['Sodium', `${item.nutrition.sodium}mg`],
    ['Total Carbs', `${item.nutrition.totalCarbs}g`],
    ['Dietary Fiber', `${item.nutrition.dietaryFiber}g`],
    ['Sugars', `${item.nutrition.sugars}g`],
    ['Protein', `${item.nutrition.protein}g`],
    ['Serving Size', item.nutrition.servingSize],
    ['Servings Per Container', `${item.nutrition.servingsPerContainer}`]
  ]

  return (
    <div className="container-shell max-w-3xl py-10">
      <h1 className="font-display text-4xl font-bold text-navy">{item.name} Nutrition</h1>
      <p className="mt-3 text-slate-600">{item.description}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 border-b border-slate-200 last:border-b-0">
            <div className="bg-cream px-4 py-3 text-sm font-extrabold uppercase text-navy">{label}</div>
            <div className="px-4 py-3 text-sm font-bold text-navy">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Allergens</h2>
        <div className="mt-3"><AllergenBadges allergens={item.allergens} /></div>
      </div>
    </div>
  )
}
