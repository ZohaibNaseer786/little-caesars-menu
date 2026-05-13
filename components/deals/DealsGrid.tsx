import { DealCard } from '@/components/deals/DealCard'
import type { Deal } from '@/types'

export function DealsGrid({ deals }: { deals: Deal[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  )
}
