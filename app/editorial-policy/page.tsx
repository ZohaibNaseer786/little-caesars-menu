import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Editorial Policy and Menu Data Methodology',
  description: 'How our independent Little Caesars menu guide researches prices, deals, nutrition, store information, corrections and update dates.',
  alternates: { canonical: absoluteUrl('/editorial-policy') }
}

const standards = [
  ['Sources', 'We prioritize public first-party menu pages, nutrition documents, product images and location information. Third-party sources are used only as secondary context.'],
  ['Prices', 'Prices are labeled as guide prices because restaurants, regions, order types, taxes and delivery services can show different totals.'],
  ['Deals', 'We publish public offers and exclude account-only promotions. Expired offers are removed when an end date is known. Every offer must still be confirmed at checkout.'],
  ['Nutrition', 'Published calorie labels can be summarized, while detailed macro and allergen claims are shown only when a reliable source is available. Serious allergy decisions should be confirmed directly with the restaurant.'],
  ['Updates', 'A modified date changes only after a meaningful factual or editorial review, not automatically on every page request.'],
  ['Corrections', 'Correction requests are checked against a public source, restaurant evidence or updated brand material before a page is changed.']
]

export default function EditorialPolicyPage() {
  return (
    <main className="container-shell max-w-4xl py-12 sm:py-16">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Methodology</p>
      <h1 className="mt-3 font-display text-4xl font-black text-navy sm:text-5xl">Editorial Policy</h1>
      <p className="mt-6 text-lg leading-8 text-slate-700">Our goal is to make public menu information easier to compare without presenting estimates as guaranteed local facts.</p>
      <div className="mt-10 grid gap-6">
        {standards.map(([title, body]) => (
          <section key={title} className="border-l-4 border-orange pl-5">
            <h2 className="text-xl font-black text-navy">{title}</h2>
            <p className="mt-2 leading-7 text-slate-700">{body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm font-bold text-slate-500">Last reviewed: July 15, 2026</p>
      <Link href="/contact" className="mt-5 inline-flex font-black text-orange hover:underline">Report a correction &rarr;</Link>
    </main>
  )
}
