'use client'

import axios from 'axios'
import { useAppStore } from '@/store/useAppStore'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const { storeId, orderType, locale } = useAppStore.getState()
  config.params = {
    storeId,
    orderType,
    locale,
    ...(config.params ?? {})
  }
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status ?? 'network'
    console.error(`[Axios] ${error.config?.method?.toUpperCase() ?? 'REQUEST'} ${error.config?.url} failed status=${status}`)
    return Promise.reject(error)
  }
)

export default api
