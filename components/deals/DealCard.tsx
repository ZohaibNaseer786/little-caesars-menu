import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import type { Deal } from '@/types'

export function DealCard({ deal }: { deal: Deal }) {
  const showOriginalPrice = deal.originalPrice > deal.price

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative aspect-video bg-white">
        <ImageWithFallback
          src={deal.image}
          alt={`${deal.title} Little Caesars deal`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4"
        />
        <div className="absolute left-3 top-3">
          <Badge label={deal.badge} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-navy">{deal.title}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{deal.description}</p>
        <div className="mt-4 flex items-end gap-3">
          <span className="font-display text-3xl font-bold text-orange">${deal.price.toFixed(2)}</span>
          {showOriginalPrice && (
            <span className="pb-1 text-sm font-bold text-slate-500 line-through">${deal.originalPrice.toFixed(2)}</span>
          )}
        </div>
        {deal.promoCode && (
          <p className="mt-3 rounded-2xl bg-white px-3 py-2 text-sm font-extrabold text-navy ring-1 ring-slate-200">
            Code: {deal.promoCode}
          </p>
        )}
        <Link
          href={`/menu?deal=${deal.id}`}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,107,0,0.22)] transition hover:bg-orange-soft"
        >
          View Menu Items
        </Link>
      </div>
    </article>
  )
}
