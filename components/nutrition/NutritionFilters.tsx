'use client'

import type { Category } from '@/types'

const allergenOptions = ['gluten', 'dairy', 'egg', 'soy', 'nuts']

export interface NutritionFilterState {
  categoryId: string
  maxCalories: number
  allergens: string[]
}

export function NutritionFilters({
  filters,
  categories,
  onChange
}: {
  filters: NutritionFilterState
  categories: Category[]
  onChange: (filters: NutritionFilterState) => void
}) {
  function toggleAllergen(allergen: string) {
    const exists = filters.allergens.includes(allergen)
    onChange({
      ...filters,
      allergens: exists ? filters.allergens.filter((item) => item !== allergen) : [...filters.allergens, allergen]
    })
  }

  return (
    <div className="no-print rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-end">
        <label>
          <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Category</span>
          <select
            value={filters.categoryId}
            onChange={(event) => onChange({ ...filters, categoryId: event.target.value })}
            className="mt-2 min-h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold outline-none focus:border-orange"
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Max Calories: {filters.maxCalories}</span>
          <input
            type="range"
            min="0"
            max="1200"
            step="10"
            value={filters.maxCalories}
            onChange={(event) => onChange({ ...filters, maxCalories: Number(event.target.value) })}
            className="mt-3 w-full accent-orange"
          />
        </label>
      </div>

      <div className="mt-5">
        <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Exclude Allergens</span>
        <div className="mt-3 flex flex-wrap gap-3">
          {allergenOptions.map((allergen) => (
            <label key={allergen} className="flex cursor-pointer items-center gap-2 rounded-full border border-navy/15 px-3 py-2 text-sm font-bold uppercase text-navy">
              <input
                type="checkbox"
                checked={filters.allergens.includes(allergen)}
                onChange={() => toggleAllergen(allergen)}
                className="h-4 w-4 accent-orange"
              />
              {allergen}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
