declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackPageView(measurementId: string, pagePath: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('config', measurementId, {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title
  })
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', eventName, params ?? {})
}

export {}
