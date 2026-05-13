'use client'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'hot-ready', label: 'HOT-N-READY' },
  { id: 'featured', label: 'Featured' },
  { id: 'limited', label: 'Limited Time' },
  { id: 'meat', label: 'Meat Lovers' },
  { id: 'vegetarian', label: 'Vegetarian' }
]

export function FilterBar({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return (
    <div className="bg-white">
      <div className="container-shell no-scrollbar flex gap-2 overflow-x-auto py-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`min-w-max rounded-full border px-4 py-2 text-sm font-black transition ${
              active === filter.id ? 'border-navy bg-navy text-white' : 'border-navy/15 bg-white text-navy hover:border-orange/50 hover:bg-orange/5'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
