'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AppState, OrderType } from '@/types'

const defaultStoreId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID ?? '10378'
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en-us'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      storeId: defaultStoreId,
      orderType: 'pickup',
      locale: defaultLocale,
      selectedCategory: '',
      setStoreId: (id: string) => set({ storeId: id }),
      setOrderType: (type: OrderType) => set({ orderType: type }),
      setSelectedCategory: (slug: string) => set({ selectedCategory: slug })
    }),
    {
      name: 'little-caesars-menu-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        storeId: state.storeId,
        orderType: state.orderType,
        locale: state.locale,
        selectedCategory: state.selectedCategory
      })
    }
  )
)
