import type { Metadata } from 'next'
import { NutritionPageClient } from '@/components/nutrition/NutritionPageClient'

export const metadata: Metadata = {
  title: 'Little Caesars Nutrition Facts 2026 | Calories, Allergens & Macros',
  description: 'Little Caesars nutrition information for 2026. Calories, fat, carbs, protein, sodium and allergen info for pizza and sides.',
  alternates: { canonical: 'https://littlecaesarsmenu.com/nutrition' }
}

export default function NutritionPage() {
  return <NutritionPageClient />
}
