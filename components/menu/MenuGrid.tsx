import { MenuCard } from '@/components/menu/MenuCard'
import type { MenuItem } from '@/types'

export function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
