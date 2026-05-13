'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { Deal } from '@/types'

export function useDeals() {
  return useQuery({
    queryKey: ['deals', 'general'],
    queryFn: () => api.get<Deal[]>('/deals').then((data) => data as unknown as Deal[]),
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5
  })
}

export function usePromotions() {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: () => api.get<Deal[]>('/promotions', { params: { type: 'limited-time' } }).then((data) => data as unknown as Deal[]),
    staleTime: 1000 * 60 * 5
  })
}
