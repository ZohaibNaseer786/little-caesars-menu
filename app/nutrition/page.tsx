import type { Metadata } from 'next'
import { NutritionPageClient } from '@/components/nutrition/NutritionPageClient'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Nutrition Facts 2026 | Calories, Allergens & Macros',
  description: 'Little Caesars nutrition facts for 2026 with calories, allergens, fat, carbs, protein, sodium and macro details for pizza and sides.',
  keywords: ['littlecaesars nutrition', 'Little Caesars calories', 'Little Caesars allergens', ...siteConfig.keywords],
  alternates: { canonical: absoluteUrl('/nutrition') }
}

export default function NutritionPage() {
  return <NutritionPageClient />
}
