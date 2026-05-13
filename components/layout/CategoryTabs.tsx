'use client'

import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import type { Category } from '@/types'

export function CategoryTabs({ categories }: { categories: Category[] }) {
  const selectedCategory = useAppStore((state) => state.selectedCategory)
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    const availableSections = categories
      .map((category) => document.getElementById(`category-${category.slug}`))
      .filter((section): section is HTMLElement => Boolean(section))

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setSelectedCategory(visible.target.id.replace('category-', ''))
        }
      },
      { rootMargin: '-160px 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    )

    availableSections.forEach((section) => observerRef.current?.observe(section))
    return () => observerRef.current?.disconnect()
  }, [categories, setSelectedCategory])

  function goToCategory(slug: string) {
    setSelectedCategory(slug)
    document.getElementById(`category-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-[116px] z-40 border-y border-slate-200 bg-white">
      <div className="container-shell no-scrollbar overflow-x-auto py-3">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => {
            const active = selectedCategory ? selectedCategory === category.slug : category.slug === categories[0]?.slug

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => goToCategory(category.slug)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active ? 'border-orange bg-orange text-white shadow-md shadow-orange/25' : 'border-navy/15 bg-white text-navy hover:border-orange/50 hover:bg-orange/5'
                }`}
              >
                {category.name}
                {category.badge === 'NEW' && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-sage" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
