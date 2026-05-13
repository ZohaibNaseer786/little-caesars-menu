'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { CalorieInfo, NutritionInfo } from '@/types'

export interface NutritionTableItem {
  id: string
  name: string
  categoryId: string
  tags: string[]
  allergens: string[]
  calories: CalorieInfo
  nutrition?: NutritionInfo
}

export function useNutritionAll(storeId: string) {
  return useQuery({
    queryKey: ['nutritionAll', storeId],
    queryFn: () =>
      api.get<NutritionTableItem[]>('/nutrition/all', { params: { storeId } }).then((data) => data as unknown as NutritionTableItem[]),
    staleTime: 1000 * 60 * 60
  })
}

export function useNutritionItem(storeId: string, itemId: string) {
  return useQuery({
    queryKey: ['nutrition', storeId, itemId],
    queryFn: () =>
      api
        .get<{ itemId: string; name: string; nutrition?: NutritionInfo; allergens: string[] }>(`/nutrition/${itemId}`, {
          params: { storeId }
        })
        .then((data) => data as unknown as { itemId: string; name: string; nutrition?: NutritionInfo; allergens: string[] }),
    staleTime: 1000 * 60 * 60,
    enabled: !!itemId
  })
}
