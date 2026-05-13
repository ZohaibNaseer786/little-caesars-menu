'use client'

import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import type { MenuItem } from '@/types'

function money(value: number) {
  if (value <= 0) return 'Varies'
  return `$${value.toFixed(2)}`
}

export function MenuCard({ item }: { item: MenuItem }) {
  const router = useRouter()

  function openDetails(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    router.push(`/item/${item.id}`)
  }

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/item/${item.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') router.push(`/item/${item.id}`)
      }}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
    >
      <div className="relative bg-white">
        <div className="absolute left-3 top-3 z-10">
          <Badge label={item.badge ?? (item.isHotNReady ? 'HOT-N-READY' : undefined)} />
        </div>
        <div className="relative aspect-video">
          <ImageWithFallback
            src={item.image.thumbnail}
            alt={`${item.name} Little Caesars menu item`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition duration-300 group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-12 font-display text-lg font-semibold leading-tight text-navy">{item.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{item.description}</p>
        <p className="mt-3 text-sm font-semibold text-slate-500">{item.calories.label}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="font-display text-2xl font-semibold text-navy">{money(item.basePrice)}</p>
          <Button onClick={openDetails} aria-label={`View ${item.name} details`} className="min-h-10 px-4 py-1.5">
            Details
          </Button>
        </div>
      </div>
    </article>
  )
}
