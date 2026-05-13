'use client'

import { Button } from '@/components/ui/Button'

export default function MenuError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold text-navy">Menu could not load</h1>
      <p className="mt-3 text-slate-600">The fallback menu is available if the live feed is down. Try once more.</p>
      <Button className="mt-6" onClick={reset}>Try Again</Button>
    </div>
  )
}
