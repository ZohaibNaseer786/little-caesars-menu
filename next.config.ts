import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.littlecaesars.com' },
      { protocol: 'https', hostname: 'littlecaesars.com' },
      { protocol: 'https', hostname: 'api.littlecaesars.com' },
      { protocol: 'https', hostname: 'images.littlecaesars.com' },
      { protocol: 'https', hostname: 'banners.littlecaesars.com' },
      { protocol: 'https', hostname: 'mobilestatic.littlecaesars.com' },
      { protocol: 'https', hostname: 'lcemedia.littlecaesars.com' },
      { protocol: 'https', hostname: 'lcemedia.blob.core.windows.net' },
      { protocol: 'https', hostname: 'www.datocms-assets.com' }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 3600
  },
  experimental: { optimizeCss: true },
  compress: true,
  poweredByHeader: false,
  redirects: async () => [
    { source: '/menu/pizza', destination: '/menu/large-round-pizzas', permanent: true },
    { source: '/menu/limited', destination: '/menu/limited-time-offer', permanent: true },
    { source: '/menu/wings', destination: '/menu/sides', permanent: true },
    { source: '/menu/desserts', destination: '/menu/sides', permanent: true }
  ],
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=60' }
      ]
    }
  ]
}

export default nextConfig
