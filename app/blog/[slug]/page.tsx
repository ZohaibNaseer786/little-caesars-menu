import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/blog'
import { absoluteUrl, siteConfig } from '@/lib/seo'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Little Caesars Guide Not Found',
      robots: { index: false, follow: false }
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [...siteConfig.keywords, ...post.keywords],
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.imageAlt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image]
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/little-caesars-logo.svg')
      }
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
      { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) }
    ]
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3)

  return (
    <main className="bg-white text-[#111827]">
      <Script id={`article-${post.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id={`breadcrumb-${post.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article>
        <header className="bg-[#f4f6f8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm font-bold text-slate-500">
                <Link href="/" className="hover:text-[#F56600]">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-[#F56600]">Blog</Link>
                <span>/</span>
                <span className="text-[#F56600]">{post.category}</span>
              </nav>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.14em] text-[#F56600]">{post.category}</p>
              <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">{post.description}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-white px-4 py-2 font-bold">{post.updated}</span>
                <span className="rounded-full bg-white px-4 py-2 font-bold">{post.readTime}</span>
              </div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.85)] sm:min-h-[340px]">
              <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-contain p-6" />
            </div>
          </div>
        </header>

        <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="text-xl leading-9 text-slate-700">{post.intro}</p>

              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-2xl font-black text-[#111827]">{section.heading}</h2>
                    <div className="mt-4 space-y-4">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-8 text-slate-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <section className="mt-12 rounded-2xl border border-[#FFD2B8] bg-[#FFF7F0] p-6 sm:p-8">
                <h2 className="font-display text-2xl font-black">Quick Answers</h2>
                <div className="mt-6 grid gap-5">
                  {post.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-black text-[#111827]">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.8)]">
                <h2 className="text-lg font-black">Related Guides</h2>
                <div className="mt-5 grid gap-3">
                  {post.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#F56600] hover:text-[#D94F00]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-[#172033] p-6 text-white">
                <h2 className="text-lg font-black">Keyword Focus</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="bg-[#f4f6f8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="font-display text-3xl font-black">More Little Caesars Guides</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#F56600]">
                <p className="text-sm font-black text-[#F56600]">{related.category}</p>
                <h3 className="mt-3 text-lg font-black leading-snug">{related.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{related.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
