import Image from 'next/image'
import Link from 'next/link'

const footerColumns = [
  {
    title: 'About',
    links: [
      { label: 'Menu', href: '/menu' },
      { label: 'Deals', href: '/deals' },
      { label: 'Nutrition', href: '/nutrition' },
      { label: 'Stores', href: '/stores' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Guides',
    links: [
      { label: 'Picture & Price Guide', href: '/blog/little-caesars-menu-prices' },
      { label: 'Menu Price Dataset', href: '/research/menu-price-comparison' },
      { label: 'Coupons & Deals', href: '/deals' },
      { label: 'Calories & Allergens', href: '/nutrition' },
      { label: 'Near Me & Hours', href: '/blog/little-caesars-near-me-hours' },
      { label: 'Value Meals', href: '/blog/best-little-caesars-value-meals' }
    ]
  },
  {
    title: 'Contact',
    links: [
      { label: 'About This Guide', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Accessibility', href: 'https://littlecaesars.com/en-us/accessibility/' }
    ]
  }
]

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/LittleCaesars', text: 'f' },
  { label: 'Instagram', href: 'https://www.instagram.com/LittleCaesars', text: '◎' },
  { label: 'X', href: 'https://twitter.com/littlecaesars', text: '𝕏' },
  { label: 'YouTube', href: 'https://www.youtube.com/user/littlecaesars', text: '▶' }
]

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 transition hover:text-[#F56600]">
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className="text-sm font-medium text-slate-600 transition hover:text-[#F56600]">
      {label}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="bg-white text-[#111827]">
      <section className="bg-[linear-gradient(90deg,#F56600,#FF7A1A)] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[960px] text-center">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Independent Menu Research, Clearly Explained</h2>
          <p className="mt-4 text-lg text-white/90">
            Learn how we review menu prices, public deals, nutrition references and location information.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/editorial-policy" className="min-h-12 rounded-full bg-[#111827] px-7 py-3 text-base font-bold text-white transition hover:bg-black">Editorial Policy</Link>
            <Link href="/about" className="min-h-12 rounded-full border-2 border-white px-7 py-3 text-base font-bold text-white transition hover:bg-white hover:text-[#F56600]">About This Guide</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1216px] gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex items-center">
            <Link href="/" aria-label="Little Caesars Menu home">
              <Image src="/images/little-caesars-logo.svg" alt="Little Caesars Menu" width={190} height={54} className="h-11 w-auto" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title} className="border-slate-200 sm:border-l sm:pl-10">
                <h3 className="text-base font-black text-[#111827]">{column.title}</h3>
                <nav className="mt-5 grid gap-3" aria-label={column.title}>
                  {column.links.map((link) => (
                    <FooterLink key={link.label} href={link.href} label={link.label} />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F56600] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1216px] flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/privacy" className="font-medium hover:underline">
              Privacy Policy
            </Link>
            <a href="https://littlecaesars.com/en-us/accessibility/" target="_blank" rel="noreferrer" className="font-medium hover:underline">
              Website Accessibility
            </a>
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-black transition hover:bg-white hover:text-[#F56600]"
              >
                {social.text}
              </a>
            ))}
          </div>
          <p className="font-medium">© 2026 Independent Little Caesars Menu Guide</p>
        </div>
        <p className="mx-auto mt-5 max-w-[1216px] text-center text-xs text-white/85">
          Disclaimer: We are an independent menu guide and are not affiliated with Little Caesar Enterprises, Inc. All trademarks belong to their respective owners.
        </p>
      </section>
    </footer>
  )
}
