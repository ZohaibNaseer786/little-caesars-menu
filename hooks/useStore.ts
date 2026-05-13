'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { Store } from '@/types'

export interface StoreSearchResult extends Store {
  distance?: number
}

export function useStoreInfo(storeId: string) {
  return useQuery({
    queryKey: ['store', storeId],
    queryFn: () => api.get<Store>(`/stores/${storeId}`).then((data) => data as unknown as Store),
    staleTime: 1000 * 60 * 5,
    enabled: !!storeId
  })
}

export function useNearbyStores(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ['stores', lat, lng],
    queryFn: () =>
      api.get<StoreSearchResult[]>('/stores', { params: { lat, lng } }).then((data) => data as unknown as StoreSearchResult[]),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(lat && lng)
  })
}

export function useStoreSearch() {
  return useMutation({
    mutationFn: (query: string) =>
      api.get<StoreSearchResult[]>('/stores', { params: { query } }).then((data) => data as unknown as StoreSearchResult[])
  })
}
