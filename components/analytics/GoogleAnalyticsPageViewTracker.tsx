'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { trackPageView } from '@/lib/analytics'

type GoogleAnalyticsPageViewTrackerProps = {
  measurementId: string
}

export function GoogleAnalyticsPageViewTracker({ measurementId }: GoogleAnalyticsPageViewTrackerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!pathname) {
      return
    }

    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    const query = searchParams?.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname
    trackPageView(measurementId, pagePath)
  }, [measurementId, pathname, searchParams])

  return null
}
