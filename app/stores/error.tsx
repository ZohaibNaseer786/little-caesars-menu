'use client'

import { Button } from '@/components/ui/Button'

export default function StoresError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold text-navy">Locations could not load</h1>
      <p className="mt-3 text-slate-600">Try the location search again.</p>
      <Button className="mt-6" onClick={reset}>Try Again</Button>
    </div>
  )
}
