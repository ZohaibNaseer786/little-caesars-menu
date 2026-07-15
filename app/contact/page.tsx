import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact the Little Caesars Menu Guide',
  description: 'Contact our independent menu guide about corrections, page feedback or data sourcing. Restaurant and order issues should go to official Little Caesars support.',
  alternates: { canonical: absoluteUrl('/contact') }
}

export default function ContactPage() {
  return (
    <main className="container-shell max-w-4xl py-12 sm:py-16">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Contact</p>
      <h1 className="mt-3 font-display text-4xl font-black text-navy sm:text-5xl">How Can We Help?</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="border border-slate-200 bg-white p-6">
          <h2 className="font-display text-2xl font-black text-navy">Guide corrections</h2>
          <p className="mt-3 leading-7 text-slate-700">For incorrect menu details, broken pages or sourcing questions, email the independent guide and include the page URL, location or region, and supporting evidence.</p>
          <a href="mailto:contact@little-caesars-menus.us" className="mt-5 inline-flex break-all font-black text-orange hover:underline">contact@little-caesars-menus.us</a>
        </section>
        <section className="border border-slate-200 bg-white p-6">
          <h2 className="font-display text-2xl font-black text-navy">Orders and restaurants</h2>
          <p className="mt-3 leading-7 text-slate-700">We cannot change orders, issue refunds or resolve restaurant service concerns. Contact Little Caesars through its official customer support page for those requests.</p>
          <a href="https://littlecaesars.com/en-us/contact-us/" target="_blank" rel="noreferrer" className="mt-5 inline-flex font-black text-orange hover:underline">Visit official customer support &rarr;</a>
        </section>
      </div>
      <p className="mt-8 text-sm font-bold text-slate-500">This website is independent and is not affiliated with Little Caesar Enterprises, Inc.</p>
    </main>
  )
}
