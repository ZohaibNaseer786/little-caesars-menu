import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Our Independent Little Caesars Menu Guide',
  description: 'Learn who publishes this independent Little Caesars menu guide, what we cover, how information is reviewed and how to report a correction.',
  alternates: { canonical: absoluteUrl('/about') }
}

export default function AboutPage() {
  return (
    <main className="container-shell max-w-4xl py-12 sm:py-16">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">About this site</p>
      <h1 className="mt-3 font-display text-4xl font-black text-navy sm:text-5xl">An Independent Little Caesars Menu Guide</h1>
      <p className="mt-6 text-lg leading-8 text-slate-700">
        Little Caesars Menu is an independent informational website. We are not Little Caesar Enterprises, Inc., we do not accept restaurant orders, and we do not represent individual franchise locations.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-black text-navy">What we publish</h2>
          <p className="mt-3 leading-7 text-slate-700">We organize public menu names, guide prices, calorie labels, nutrition references, general deals and location-search information so visitors can compare options more easily.</p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-black text-navy">What can vary</h2>
          <p className="mt-3 leading-7 text-slate-700">Prices, recipes, availability, hours, taxes, delivery fees and promotions may vary by store and can change without notice. The selected restaurant or official checkout is the final source for a purchase.</p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-black text-navy">How we review pages</h2>
          <p className="mt-3 leading-7 text-slate-700">We compare publicly available brand materials, menu imagery, nutrition documents and store-level notes. Pages show update dates when a meaningful review or content change is completed.</p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-black text-navy">Corrections</h2>
          <p className="mt-3 leading-7 text-slate-700">Food menus change quickly. Send a correction with the page URL, store or region, and a public source or screenshot so it can be reviewed.</p>
        </section>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/editorial-policy" className="rounded-lg bg-orange px-5 py-3 font-black text-white hover:bg-orange-soft">Read Editorial Policy</Link>
        <Link href="/contact" className="rounded-lg border-2 border-navy px-5 py-3 font-black text-navy hover:bg-navy hover:text-white">Contact the Guide</Link>
      </div>
    </main>
  )
}
