const badgeStyles: Record<string, string> = {
  'HOT-N-READY': 'bg-orange text-white',
  HOT: 'bg-orange text-white',
  NEW: 'bg-lc-red text-white',
  LIMITED: 'bg-lc-red text-white',
  VEGETARIAN: 'bg-emerald-100/85 text-emerald-700',
  BESTSELLER: 'bg-white text-navy',
  LOADED: 'bg-lc-red text-white',
  MEATY: 'bg-lc-red text-white',
  STUFFED: 'bg-white text-navy',
  CRISPY: 'bg-orange text-white',
  SPICY: 'bg-lc-red text-white',
  COMBO: 'bg-white text-navy',
  CHEESY: 'bg-orange text-white',
  DESSERT: 'bg-white text-navy',
  BUNDLE: 'bg-white text-navy',
  'SAVE HERE': 'bg-lc-red text-white',
  'FAN FAVORITE': 'bg-white text-navy',
  'MEAL DEAL': 'bg-white text-navy'
}

const displayLabels: Record<string, string> = {
  HOT: 'HOT-N-READY',
  LIMITED: 'Limited Time',
  BESTSELLER: 'Popular',
  LOADED: 'Loaded',
  MEATY: 'Meaty',
  STUFFED: 'Stuffed',
  CRISPY: 'Crunch',
  COMBO: 'Combo',
  CHEESY: 'Cheesy',
  'SAVE HERE': 'Deal',
  'FAN FAVORITE': 'Favorite',
  'MEAL DEAL': 'Deal'
}

export function Badge({ label, className = '' }: { label?: string; className?: string }) {
  if (!label) return null

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.04em] backdrop-blur-sm ${badgeStyles[label] ?? 'bg-white text-slate-700'} ${className}`}
    >
      {displayLabels[label] ?? label}
    </span>
  )
}
