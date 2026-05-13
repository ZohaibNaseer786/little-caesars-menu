'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { useMenuItem } from '@/hooks/useMenu'
import { useNutritionItem } from '@/hooks/useNutrition'
import { useAppStore } from '@/store/useAppStore'
import type { CustomizationOption, MenuItem } from '@/types'

function money(value: number) {
  if (value <= 0) return 'Price varies'
  return `$${value.toFixed(2)}`
}

function OptionList({ title, options }: { title: string; options?: CustomizationOption[] }) {
  if (!options?.length) return null

  return (
    <section>
      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <span key={option.id} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-navy">
            {option.name}
            {option.priceDelta > 0 ? ` +$${option.priceDelta.toFixed(2)}` : ''}
          </span>
        ))}
      </div>
    </section>
  )
}

export function ItemDetail({ itemId, fallbackItem }: { itemId: string; fallbackItem: MenuItem }) {
  const storeId = useAppStore((state) => state.storeId)
  const { data } = useMenuItem(storeId, itemId)
  const { data: nutritionData } = useNutritionItem(storeId, itemId)
  const item = data ?? fallbackItem
  const [showNutrition, setShowNutrition] = useState(false)
  const nutrition = nutritionData?.nutrition ?? item.nutrition
  const customizations = item.customizations

  return (
    <div className="container-shell py-8">
      <Link href="/menu" className="text-sm font-black uppercase text-orange hover:text-orange-soft">
        Back to Menu
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-cream shadow-card">
          <div className="relative aspect-[4/3]">
            <ImageWithFallback
              src={item.image.full}
              alt={`${item.name} Little Caesars menu item`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain p-6"
            />
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-wrap gap-2">
            <Badge label={item.badge ?? (item.isHotNReady ? 'HOT-N-READY' : undefined)} />
            {item.tags.includes('vegetarian') && <Badge label="VEGETARIAN" />}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy">{item.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="font-display text-2xl font-bold text-orange">{money(item.basePrice)}</p>
            <p className="text-sm font-bold text-slate-500">{item.calories.label}</p>
          </div>
          <p className="mt-4 leading-7 text-slate-600">{item.description}</p>

          <div className="my-6 h-px bg-slate-200" />

          <div className="rounded-2xl bg-cream p-4">
            <h2 className="text-sm font-black uppercase tracking-[0.12em] text-navy">Menu Note</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              This guide shows menu information only.
            </p>
          </div>

          {item.customizable && customizations && (
            <div className="mt-6 grid gap-5">
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-navy">Available Options</h2>
              <OptionList title="Size" options={customizations.sizes} />
              <OptionList title="Crust" options={customizations.crusts} />
              <OptionList title="Sauce" options={customizations.sauces} />
              <OptionList title="Cheese" options={customizations.cheeses} />
              <OptionList title="Toppings" options={customizations.toppings} />
            </div>
          )}

          {item.allergens.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 p-4">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-navy">Allergen Warnings</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.allergens.map((allergen) => (
                  <span key={allergen} className="rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase text-navy">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button type="button" onClick={() => setShowNutrition((value) => !value)} className="mt-5 text-sm font-black uppercase text-orange">
            {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
          </button>

          {showNutrition && nutrition && (
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 p-4 text-sm">
              <span>Calories</span><strong>{nutrition.calories}</strong>
              <span>Total Fat</span><strong>{nutrition.totalFat}g</strong>
              <span>Carbs</span><strong>{nutrition.totalCarbs}g</strong>
              <span>Protein</span><strong>{nutrition.protein}g</strong>
              <span>Sodium</span><strong>{nutrition.sodium}mg</strong>
              <span>Serving Size</span><strong>{nutrition.servingSize}</strong>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
