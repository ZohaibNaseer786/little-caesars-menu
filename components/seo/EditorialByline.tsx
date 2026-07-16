import Link from 'next/link'

type EditorialBylineProps = {
  updated: string
  readTime: string
}

export function EditorialByline({ updated, readTime }: EditorialBylineProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
      <span>
        By{' '}
        <Link href="/about" rel="author" className="font-black text-[#111827] underline decoration-[#F56600] decoration-2 underline-offset-4">
          Little Caesars Menu Editorial Team
        </Link>
      </span>
      <span aria-hidden="true">•</span>
      <span>Updated {updated}</span>
      <span aria-hidden="true">•</span>
      <span>{readTime}</span>
    </div>
  )
}
