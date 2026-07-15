import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Guides: Prices, Deals, Nutrition & Hours',
  description:
    'Read Little Caesars menu guides for prices, promo codes, coupons, nutrition facts, calories, store hours, locations and value meals.',
  keywords: [
    ...siteConfig.keywords,
    'Little Caesars blog',
    'Little Caesars value meals',
    'Little Caesars coupon code guide'
  ],
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: 'Little Caesars Blog: Menu Prices, Deals, Nutrition and Locations',
    description: 'Guides for Little Caesars menu prices, deals, promo codes, nutrition facts, calories and locations.',
    url: absoluteUrl('/blog'),
    type: 'website',
    images: [{ url: siteConfig.socialImage, width: 1200, height: 630, alt: 'Little Caesars Menu blog' }]
  }
}

export default function BlogIndexPage() {
  const featuredPost = blogPosts[0]
  const remainingPosts = blogPosts.slice(1)

  return (
    <main className="bg-white text-[#111827]">
      <section className="bg-[#f4f6f8] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1216px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#F56600]">Menu Guides</p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">
              Little Caesars Menu Blog
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              Practical guides for Little Caesars menu prices, deals, promo codes, calories, allergens, store hours and value meals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {['Prices', 'Deals', 'Nutrition', 'Near Me'].map((tag) => (
                <span key={tag} className="rounded-full border border-[#FFD2B8] bg-white px-4 py-2 text-sm font-bold text-[#D94F00]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link href={`/blog/${featuredPost.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.85)]">
            <div className="relative h-64 bg-[linear-gradient(120deg,#fff3ea,#ffffff)] sm:h-80">
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-[#F56600]">{featuredPost.category}</p>
              <h2 className="mt-3 text-2xl font-black leading-tight group-hover:text-[#D94F00]">{featuredPost.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{featuredPost.description}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1216px]">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_-26px_rgba(15,23,42,0.82)]">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative h-48 bg-[#f8fafc]">
                    <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#FFE1CC] px-3 py-1 text-xs font-black uppercase text-[#D94F00]">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-500">
                      {post.updated} · {post.readTime}
                    </p>
                    <h2 className="mt-3 text-xl font-black leading-snug group-hover:text-[#D94F00]">{post.title}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.description}</p>
                    <span className="mt-5 inline-flex text-sm font-black text-[#F56600]">Read guide &rarr;</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
