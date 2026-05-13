'use client'

import { useMemo, useState } from 'react'
import { NutritionRow } from '@/components/nutrition/NutritionRow'
import type { NutritionTableItem } from '@/hooks/useNutrition'
import type { Category } from '@/types'

type SortKey = 'name' | 'calories' | 'totalFat' | 'totalCarbs' | 'protein' | 'sodium'

const headers: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: 'name', label: 'Item Name' },
  { key: 'calories', label: 'Cal', numeric: true },
  { key: 'totalFat', label: 'Fat', numeric: true },
  { key: 'totalCarbs', label: 'Carbs', numeric: true },
  { key: 'protein', label: 'Pro', numeric: true },
  { key: 'sodium', label: 'Sodium', numeric: true }
]

function valueFor(item: NutritionTableItem, key: SortKey) {
  if (key === 'name') return item.name
  if (key === 'calories') return item.nutrition?.calories ?? item.calories.perServing ?? item.calories.perSlice ?? 0
  if (key === 'totalFat') return item.nutrition?.totalFat ?? 0
  if (key === 'totalCarbs') return item.nutrition?.totalCarbs ?? 0
  if (key === 'protein') return item.nutrition?.protein ?? 0
  return item.nutrition?.sodium ?? 0
}

export function NutritionTable({ items, categories }: { items: NutritionTableItem[]; categories: Category[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('calories')
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')
  const categoryNames = useMemo(() => new Map(categories.map((category) => [category.id, category.name])), [categories])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = valueFor(a, sortKey)
      const bValue = valueFor(b, sortKey)
      const modifier = direction === 'asc' ? 1 : -1
      if (typeof aValue === 'string' && typeof bValue === 'string') return aValue.localeCompare(bValue) * modifier
      return (Number(aValue) - Number(bValue)) * modifier
    })
  }, [direction, items, sortKey])

  function updateSort(key: SortKey) {
    if (sortKey === key) {
      setDirection((value) => (value === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setDirection('asc')
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-card">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-20 bg-navy text-white">
          <tr>
            {headers.map((header) => (
              <th key={header.key} className={`px-4 py-3 ${header.numeric ? 'text-right' : 'text-left'}`}>
                <button type="button" onClick={() => updateSort(header.key)} className="font-extrabold">
                  {header.label} {sortKey === header.key ? (direction === 'asc' ? 'Asc' : 'Desc') : ''}
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-left font-extrabold">Allergens</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <NutritionRow key={item.id} item={item} categoryName={categoryNames.get(item.categoryId) ?? item.categoryId} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
