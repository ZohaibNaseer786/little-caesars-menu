'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { Category, MenuItem, MenuResponse, OrderType } from '@/types'

export function useMenu(storeId: string, orderType: string) {
  return useQuery({
    queryKey: ['menu', storeId, orderType],
    queryFn: () =>
      api.get<MenuResponse>('/menu', { params: { storeId, orderType } }).then((data) => data as unknown as MenuResponse),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    placeholderData: keepPreviousData
  })
}

export function useMenuItem(storeId: string, itemId: string) {
  return useQuery({
    queryKey: ['menuItem', storeId, itemId],
    queryFn: () =>
      api.get<MenuItem>(`/menu/${itemId}`, { params: { storeId } }).then((data) => data as unknown as MenuItem),
    staleTime: 1000 * 60 * 10,
    enabled: !!itemId
  })
}

export function useCategories(storeId: string) {
  return useQuery({
    queryKey: ['categories', storeId],
    queryFn: () =>
      api.get<Category[]>('/categories', { params: { storeId } }).then((data) => data as unknown as Category[]),
    staleTime: 1000 * 60 * 15
  })
}

export function useCategoryMenu(storeId: string, orderType: OrderType, categorySlug: string) {
  return useQuery({
    queryKey: ['menu', storeId, orderType, categorySlug],
    queryFn: async () => {
      const menu = (await api.get<MenuResponse>('/menu', { params: { storeId, orderType } })) as unknown as MenuResponse
      return {
        ...menu,
        items: menu.items.filter((item) => {
          const category = menu.categories.find((entry) => entry.id === item.categoryId)
          return category?.slug === categorySlug || (categorySlug === 'featured' && item.isFeatured)
        })
      }
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData
  })
}
