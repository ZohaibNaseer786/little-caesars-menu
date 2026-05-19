import type { Metadata } from 'next'
import { Nunito_Sans, Poppins } from 'next/font/google'
import Script from 'next/script'
import { Suspense, type ReactNode } from 'react'
import { GoogleAnalyticsPageViewTracker } from '@/components/analytics/GoogleAnalyticsPageViewTracker'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Providers } from '@/components/layout/Providers'
import { absoluteUrl, siteConfig } from '@/lib/seo'
import './globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800']
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700']
})

export const runtime = 'edge'

const GA_MEASUREMENT_ID = 'G-GXLT7DJEJB'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Little Caesars Menu 2026 | Prices, Deals, Coupons & Nutrition',
    template: '%s | Little Caesars Menu'
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Little Caesars Menu 2026 | Prices, Deals, Coupons & Nutrition',
    description: siteConfig.description,
    images: [{ url: siteConfig.socialImage, width: 1200, height: 630, alt: 'Little Caesars Menu 2026' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Caesars Menu 2026 | Prices, Deals & Nutrition',
    description: 'Independent guide with Little Caesars prices, calories, deals, promo codes, locations and nutrition.',
    images: [siteConfig.socialImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  alternates: { canonical: siteConfig.url },
  verification: { google: 'your-google-verification-code' }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/little-caesars-logo.svg')
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${absoluteUrl('/menu')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageViewTracker measurementId={GA_MEASUREMENT_ID} />
        </Suspense>
        <Script id="website-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  )
}
