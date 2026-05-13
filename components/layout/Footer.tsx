import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: "Today's Deals", href: '/deals' },
      { label: 'Menu', href: '/menu' },
      { label: 'Nutrition', href: '/nutrition' },
      { label: 'Our History', href: 'https://littlecaesars.com/en-us/about-us/our-history/' },
      { label: 'Hometown Pride', href: 'https://littlecaesars.com/en-us/about-us/hometown-pride/' },
      { label: 'Hot-N-Ready® Shop', href: 'https://hotnreadyshop.com' },
      { label: 'Gift Cards', href: 'https://littlecaesars.com/en-us/gift-cards/' }
    ]
  },
  {
    title: 'Careers',
    links: [
      { label: 'Careers', href: 'https://littlecaesars.com/en-us/careers/' },
      { label: 'Restaurant Jobs', href: 'https://littlecaesars.com/en-us/careers/restaurant-jobs/' },
      { label: 'Corporate Jobs', href: 'https://careersatilitchcompanies.com' },
      { label: 'Distribution Jobs', href: 'https://careersatilitchcompanies.com' }
    ]
  },
  {
    title: 'Franchising',
    links: [
      { label: 'Getting Started', href: 'https://franchise.littlecaesars.com/' },
      { label: 'Franchising Inquiries', href: 'https://franchise.littlecaesars.com/#top-form' },
      { label: 'International Franchising', href: 'https://international.littlecaesars.com/' }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'Love Kitchen', href: 'https://littlecaesars.com/en-us/about-us/giving-back/love-kitchen/' },
      { label: 'Little Caesars® Fundraising', href: 'https://littlecaesars.com/en-us/about-us/giving-back/#little-caesars-fundraising' },
      { label: 'Veterans Program', href: 'https://littlecaesars.com/en-us/about-us/giving-back/#veterans-program' },
      { label: 'AAA Hockey', href: 'https://littlecaesars.com/en-us/about-us/giving-back/#aaa-hockey' },
      { label: 'Ilitch Charities', href: 'https://littlecaesars.com/en-us/about-us/giving-back/#ilitch-charities' }
    ]
  },
  {
    title: 'Connect With Us',
    links: [
      { label: 'Frequently Asked Questions', href: 'https://littlecaesars.com/en-us/contact-us/frequently-asked-questions/' },
      { label: 'Contact Us', href: 'https://littlecaesars.com/en-us/contact-us/' },
      { label: 'For the Media', href: 'https://littlecaesars.com/en-us/contact-us/media/' }
    ]
  }
]

const legalLinks = [
  { label: 'Terms of Service', href: 'https://privacy.littlecaesars.com/terms-of-service/en-us' },
  { label: 'Privacy Policy', href: 'https://privacy.littlecaesars.com/us-privacy-policy/en-us' },
  { label: 'Consumer Health Data', href: 'https://information.littlecaesars.com/en-us/consumer-health-data' },
  { label: 'U.S State Privacy Notice', href: 'https://privacy.littlecaesars.com/us-privacy-policy/en-us/#s12' },
  { label: '¿Español?', href: 'https://littlecaesars.com/es-us/' }
]

const disclaimers = [
  '*Plus tax where applicable. Available at participating locations for a limited time. Prices may vary. Prices higher in AK, HI, CA; many areas in NY, OR, WA; and 3rd party online sites. ©2026 LCE, Inc',
  '**ONLINE ONLY. Available at participating Little Caesars locations for a limited time only. Plus, taxes & fees where applicable. Prices and offers may vary by location. Prices may be higher on third-party sites or via delivery. No Substitutions. Cannot be combined with other offers. Offer not available in AK or HI. ©2026 LCE, Inc.',
  '***Available online only at participating locations for a limited time. Prices may vary. Price higher in CA. Not available in AK or HI. Plus taxes and fees where applicable. No substitutions. Cannot be redeemed with any other offers. PEPSI, PEPSI-COLA® and the Pepsi Globe are registered trademarks of PepsiCo, Inc. ©2026 LCE, Inc',
  '‡Offer ends 5-31-2026. Offer available at participating Little Caesars® stores on app and online orders excluding third-party online sites with an online purchase of $18 or more. Enter promo code at checkout to get $3 off your online order. Limit one (1) per person per day. Cannot be combined with any other offers. Plus tax where applicable. Prices may vary. ©2026 LCE, Inc.'
]

const socialLinks = [
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/LittleCaesars' },
  { label: 'Twitter', icon: 'twitter', href: 'https://twitter.com/littlecaesars' },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/LittleCaesars' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/little-caesars' }
] as const

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className = 'text-left text-lg font-bold leading-7 text-black transition hover:text-orange'

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]['icon'] }) {
  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M13.48 21v-7.2h2.42l.44-2.93h-2.86V8.96c0-.8.4-1.58 1.67-1.58h1.3V4.87s-1.18-.2-2.31-.2c-2.35 0-3.88 1.42-3.88 4v2.2H7.65v2.93h2.61V21h3.22Z" />
      </svg>
    )
  }

  if (icon === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.36 8.54 8.54 0 0 1-2.71 1.03 4.25 4.25 0 0 0-7.36 2.91c0 .33.04.66.11.97a12.07 12.07 0 0 1-8.77-4.45 4.25 4.25 0 0 0 1.32 5.68 4.2 4.2 0 0 1-1.93-.53v.05a4.26 4.26 0 0 0 3.42 4.17 4.3 4.3 0 0 1-1.92.07 4.26 4.26 0 0 0 3.98 2.95 8.53 8.53 0 0 1-5.29 1.82c-.34 0-.68-.02-1.02-.06a12.04 12.04 0 0 0 6.52 1.91c7.82 0 12.1-6.48 12.1-12.1v-.55A8.64 8.64 0 0 0 22.46 6Z" />
      </svg>
    )
  }

  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-none stroke-current stroke-[2.4]">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.7" />
        <circle cx="17.35" cy="6.65" r="1.1" className="fill-current stroke-none" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
      <path d="M5.34 8.86h3.93V21H5.34V8.86ZM7.32 3a2.28 2.28 0 1 1 0 4.56 2.28 2.28 0 0 1 0-4.56ZM11.63 8.86h3.76v1.66h.05c.52-.99 1.8-2.03 3.7-2.03 3.96 0 4.69 2.61 4.69 6V21H19.9v-5.78c0-1.38-.02-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V21h-3.93V8.86Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8">
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-14">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-xl font-black uppercase leading-tight text-black">{group.title}</h2>
              <nav className="mt-3 grid gap-1" aria-label={group.title}>
                {group.links.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </nav>
            </div>
          ))}
        </section>

        <section className="mt-12 flex flex-col gap-6 border-y border-orange py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition hover:bg-orange"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:justify-end">
            <span className="font-display text-xl font-black uppercase text-black">Order on our mobile app</span>
            <a href="https://apps.apple.com/us/app/little-caesars/id992600579" target="_blank" rel="noreferrer" aria-label="Download on the App Store">
              <Image src="/images/social/app-store-en127x40.svg" alt="Download on the App Store" width={127} height={40} />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.littlecaesars" target="_blank" rel="noreferrer" aria-label="Get it on Google Play">
              <Image src="/images/social/google-playen135x40.svg" alt="Get it on Google Play" width={135} height={40} />
            </a>
          </div>
        </section>

        <section className="mx-auto mt-6 grid max-w-6xl justify-items-center gap-4 text-center sm:grid-cols-2 lg:grid-cols-6 lg:gap-7">
          {legalLinks.slice(0, 4).map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          <button type="button" className="inline-flex items-center gap-2 text-lg font-bold text-black transition hover:text-orange">
            <span>Your Privacy Choices</span>
            <Image src="/images/footer/privacyoptions.svg" alt="" width={30} height={18} />
          </button>
          <FooterLink href={legalLinks[4].href}>{legalLinks[4].label}</FooterLink>
        </section>

        <section className="mx-auto mt-8 max-w-3xl text-center text-base font-bold leading-6">
          <p>©2003-2026 Little Caesar Enterprises, Inc. All rights reserved. The Little Caesars® Pizza name, logos and related marks are trademarks licensed to Little Caesar Enterprises, Inc.</p>
          <p className="mt-7">
            If you are using a screen reader and having difficulty please call{' '}
            <a href="tel:18007223727" className="underline">
              1-800-722-3727
            </a>
            .
          </p>
          <p className="mt-7">
            This site is protected by reCAPTCHA and the{' '}
            <a href="https://policies.google.com/privacy" className="underline">
              Google Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" className="underline">
              Google Terms of Service
            </a>{' '}
            apply.
          </p>
        </section>
      </div>

      <section className="bg-[#f0f0f0] px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-5 text-sm font-bold leading-5 text-black">
          {disclaimers.map((disclaimer) => (
            <p key={disclaimer}>{disclaimer}</p>
          ))}
        </div>
      </section>
    </footer>
  )
}
