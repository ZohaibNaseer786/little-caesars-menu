import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the independent Little Caesars Menu guide, including analytics, cookies, external links and contact information.',
  alternates: { canonical: absoluteUrl('/privacy') }
}

export default function PrivacyPage() {
  return (
    <main className="container-shell max-w-4xl py-12 sm:py-16">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-orange">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-black text-navy sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm font-bold text-slate-500">Effective July 15, 2026</p>
      <div className="mt-10 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-black text-navy">Information we collect</h2>
          <p className="mt-3 leading-7">The site uses Google Analytics to understand page visits, device categories, approximate geography and navigation patterns. Analytics may use cookies or similar identifiers. We do not collect payment details or restaurant orders.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-navy">How information is used</h2>
          <p className="mt-3 leading-7">Aggregate usage information helps us find broken pages, improve navigation and decide which menu guides need updates. We do not sell personal information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-navy">External websites</h2>
          <p className="mt-3 leading-7">Links to Little Caesars and other external services have their own privacy practices. Leaving this site means the destination&apos;s terms and privacy policy apply.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-navy">Contact</h2>
          <p className="mt-3 leading-7">Privacy questions can be sent to <a href="mailto:contact@little-caesars-menus.us" className="font-black text-orange hover:underline">contact@little-caesars-menus.us</a>.</p>
        </section>
      </div>
    </main>
  )
}
