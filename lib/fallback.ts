import fallbackMenu from '@/data/fallback/menu.json'
import type { Category, Deal, MenuItem, MenuResponse, Store } from '@/types'

export const fallbackData = fallbackMenu as MenuResponse

export function getFallbackMenu(): MenuResponse {
  return fallbackData
}

export function getFallbackCategories(): Category[] {
  return fallbackData.categories
}

export function getFallbackDeals(): Deal[] {
  return fallbackData.deals
}

export function getFallbackStore(): Store {
  return fallbackData.store
}

export function getFallbackItem(itemId: string): MenuItem | undefined {
  return fallbackData.items.find((item) => item.id === itemId || item.slug === itemId)
}

export function getFallbackNutrition(itemId: string) {
  const item = getFallbackItem(itemId)
  return item ? { itemId: item.id, name: item.name, nutrition: item.nutrition, allergens: item.allergens } : null
}

export function getFallbackNutritionAll() {
  return fallbackData.items.map((item) => ({
    id: item.id,
    name: item.name,
    categoryId: item.categoryId,
    tags: item.tags,
    allergens: item.allergens,
    calories: item.calories,
    nutrition: item.nutrition
  }))
}
