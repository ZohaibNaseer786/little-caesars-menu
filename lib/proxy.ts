import { NextResponse } from 'next/server'

const API_BASE = process.env.MENU_API_BASE
const USER_AGENT = process.env.MENU_USER_AGENT ?? 'Mozilla/5.0 LittleCaesarsMenuGuide/1.0'
const API_KEY = process.env.MENU_API_KEY
const UPSTREAM_TIMEOUT_MS = 2800

export function cacheHeaders(seconds: number) {
  return {
    'Cache-Control': `public, s-maxage=${seconds}, stale-while-revalidate=60`
  }
}

export function jsonWithCache<T>(data: T, seconds: number, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: cacheHeaders(seconds)
  })
}

export function proxyHeaders(locale = 'en-us') {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
    locale
  }

  if (API_KEY) {
    headers.Authorization = `Bearer ${API_KEY}`
  }

  return headers
}

export async function menuProxy<T>({
  endpoint,
  label,
  cacheSeconds,
  fallback,
  method = 'GET',
  body,
  locale = 'en-us',
  validate
}: {
  endpoint: string
  label: string
  cacheSeconds: number
  fallback: T
  method?: 'GET' | 'POST'
  body?: unknown
  locale?: string
  validate?: (data: unknown) => boolean
}) {
  const started = Date.now()
  const target = `${API_BASE}${endpoint}`
  let status = 200
  let fallbackUsed = false

  try {
    if (!API_BASE) {
      throw new Error('Menu API base is not configured')
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
    const response = await fetch(target, {
      method,
      headers: proxyHeaders(locale),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      next: method === 'GET' ? { revalidate: cacheSeconds } : undefined
    })
    clearTimeout(timeout)

    status = response.status

    if (!response.ok) {
      throw new Error(`Menu API returned ${response.status}`)
    }

    const data = (await response.json()) as T

    if (validate && !validate(data)) {
      throw new Error('Menu API payload did not match the expected shape')
    }

    console.log(`[API Proxy] ${method} ${label} status=${status} duration=${Date.now() - started}ms`)
    return jsonWithCache(data, cacheSeconds)
  } catch (error) {
    fallbackUsed = true
    status = 200
    console.warn(
      `[API Proxy] ${method} ${label} status=${status} duration=${Date.now() - started}ms fallback=true reason=${error instanceof Error ? error.message : 'unknown'}`
    )
    const fallbackPayload =
      Array.isArray(fallback) || fallback === null || typeof fallback !== 'object'
        ? fallback
        : ({ ...(fallback as object), fallbackUsed } as T)
    return jsonWithCache(fallbackPayload as T, cacheSeconds)
  }
}

export function hasMenuShape(data: unknown) {
  return Boolean(
    data &&
      typeof data === 'object' &&
      Array.isArray((data as { items?: unknown }).items) &&
      Array.isArray((data as { categories?: unknown }).categories)
  )
}
