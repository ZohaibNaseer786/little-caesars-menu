import type { Metadata } from 'next'
import { Nunito_Sans, Poppins } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Providers } from '@/components/layout/Providers'
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

export const metadata: Metadata = {
  metadataBase: new URL('https://littlecaesarsmenu.com'),
  title: {
    default: 'Little Caesars Menu 2026 | Pizza, Prices, Deals & Nutrition',
    template: '%s | Little Caesars Menu'
  },
  description:
    'Browse an independent Little Caesars menu guide with pizza prices, calories, nutrition notes, deals, locations, HOT-N-READY items, Crazy Bread, wings and desserts.',
  keywords: [
    'Little Caesars menu',
    'Little Caesars menu prices 2026',
    'Little Caesars nutrition',
    'Little Caesars deals',
    'Little Caesars locations',
    'HOT-N-READY pizza',
    'ExtraMostBestest pizza',
    'Crazy Bread',
    'Little Caesars wings',
    'Little Caesars calories'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://littlecaesarsmenu.com',
    siteName: 'Little Caesars Menu',
    title: 'Little Caesars Menu 2026 | Prices, Deals & Nutrition',
    description: 'Independent Little Caesars menu guide with prices, calories, pizza, Crazy Bread, wings, deals and nutrition.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Little Caesars Menu 2026' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Caesars Menu 2026 | Prices & Nutrition',
    description: 'Pizza menu guide with Little Caesars prices, calories, deals, locations and nutrition.',
    images: ['/og-image.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  alternates: { canonical: 'https://littlecaesarsmenu.com' },
  verification: { google: 'your-google-verification-code' }
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Little Caesars',
  description: 'Little Caesars menu guide for pizza, Crazy Bread, wings, drinks, desserts and nutrition.',
  url: 'https://littlecaesarsmenu.com',
  servesCuisine: 'Pizza',
  priceRange: '$',
  hasMenu: 'https://littlecaesarsmenu.com/menu',
  acceptsReservations: false,
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, Apple Pay, Google Pay',
  menu: 'https://littlecaesarsmenu.com/menu'
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
        <Script id="restaurant-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  )
}
