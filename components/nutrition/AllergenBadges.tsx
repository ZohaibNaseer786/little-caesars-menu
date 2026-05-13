export function AllergenBadges({ allergens }: { allergens: string[] }) {
  if (allergens.length === 0) {
    return <span className="text-xs font-bold text-green-700">None listed</span>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {allergens.map((allergen) => (
        <span key={allergen} className="rounded-full bg-cream px-2 py-1 text-[11px] font-extrabold uppercase text-navy">
          {allergen}
        </span>
      ))}
    </div>
  )
}
