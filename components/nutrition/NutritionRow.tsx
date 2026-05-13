import { AllergenBadges } from '@/components/nutrition/AllergenBadges'
import type { NutritionTableItem } from '@/hooks/useNutrition'

export function NutritionRow({ item, categoryName }: { item: NutritionTableItem; categoryName: string }) {
  const nutrition = item.nutrition
  const vegetarian = item.tags.includes('vegetarian')

  return (
    <tr className={vegetarian ? 'bg-green-50/50' : 'bg-white'}>
      <td className="sticky left-0 z-10 min-w-56 border-b border-slate-200 bg-inherit px-4 py-3 text-left">
        <div className="font-extrabold text-navy">{item.name}</div>
        <div className="text-xs font-bold text-slate-500">{categoryName}</div>
      </td>
      <td className="border-b border-slate-200 px-4 py-3 text-right font-bold">{nutrition?.calories ?? item.calories.perServing ?? item.calories.perSlice ?? 0}</td>
      <td className="border-b border-slate-200 px-4 py-3 text-right">{nutrition?.totalFat ?? 0}g</td>
      <td className="border-b border-slate-200 px-4 py-3 text-right">{nutrition?.totalCarbs ?? 0}g</td>
      <td className="border-b border-slate-200 px-4 py-3 text-right">{nutrition?.protein ?? 0}g</td>
      <td className="border-b border-slate-200 px-4 py-3 text-right">{nutrition?.sodium ?? 0}mg</td>
      <td className="min-w-48 border-b border-slate-200 px-4 py-3"><AllergenBadges allergens={item.allergens} /></td>
    </tr>
  )
}
