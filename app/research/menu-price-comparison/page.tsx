import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { getFallbackMenu } from '@/lib/fallback'
import { absoluteUrl, contentDates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Little Caesars Menu Price Comparison Dataset (108 Items)',
  description: 'Compare and download 108 Little Caesars menu guide prices, calorie labels, categories and allergens in one research table and CSV file.',
  alternates: { canonical: absoluteUrl('/research/menu-price-comparison') },
  openGraph: {
    title: 'Little Caesars Menu Price Comparison Dataset',
    description: 'A downloadable 108-item menu price, category, calorie and allergen comparison.',
    url: absoluteUrl('/research/menu-price-comparison'),
    type: 'article',
    images: [{ url: absoluteUrl('/og-image.png'), width: 1200, height: 630, alt: 'Little Caesars menu price comparison dataset' }]
  }
}

function money(value: number) {
  return value > 0 ? `$${value.toFixed(2)}` : 'Varies'
}

export default function MenuPriceComparisonPage() {
  const menu = getFallbackMenu()
  const categoryNames = new Map(menu.categories.map((category) => [category.id, category.name]))
  const availableItems = menu.items.filter((item) => item.isAvailable)
  const listedPrices = availableItems.filter((item) => item.basePrice > 0).map((item) => item.basePrice)
  const lowestPrice = Math.min(...listedPrices)
  const highestPrice = Math.max(...listedPrices)
  const csvUrl = absoluteUrl('/downloads/menu-price-comparison.csv')
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Little Caesars Menu Price Comparison Dataset',
    description: 'Independent comparison dataset containing guide prices, calorie labels, categories and allergen notes for 108 Little Caesars menu items.',
    url: absoluteUrl('/research/menu-price-comparison'),
    dateModified: contentDates.research,
    creator: {
      '@type': 'Organization',
      name: 'Little Caesars Menu Editorial Team',
      url: absoluteUrl('/about')
    },
    isBasedOn: 'https://littlecaesars.com/en-us/menu/',
    variableMeasured: ['Menu item name', 'Category', 'Guide price in USD', 'Calorie label', 'Allergens'],
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: csvUrl
    }
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Research', item: absoluteUrl('/research/menu-price-comparison') },
      { '@type': 'ListItem', position: 3, name: 'Menu Price Comparison', item: absoluteUrl('/research/menu-price-comparison') }
    ]
  }

  return (
    <main className="bg-white text-[#111827]">
      <Script id="menu-price-dataset-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <Script id="menu-price-dataset-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <header className="bg-[#F56600] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1120px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm font-bold text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Research</span>
            <span>/</span>
            <span className="text-white">Menu Price Comparison</span>
          </nav>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.14em] text-white/85">Independent Menu Research</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Little Caesars Menu Price Comparison Dataset
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">
            Compare {availableItems.length} menu items by category, guide price, calorie label and allergen note. Download the complete table as a CSV for reporting, budgeting or research.
          </p>
          <a href="/downloads/menu-price-comparison.csv" download className="mt-7 inline-flex min-h-12 items-center bg-[#111827] px-6 py-3 font-black text-white transition hover:bg-black">
            Download CSV
          </a>
        </div>
      </header>

      <section className="border-b border-slate-200 px-4 py-8 sm:px-6 lg:px-8" aria-label="Dataset summary">
        <div className="mx-auto grid max-w-[1120px] gap-6 sm:grid-cols-3">
          <div><strong className="block text-3xl font-black text-[#F56600]">{availableItems.length}</strong><span className="mt-1 block text-sm font-bold text-slate-600">available menu items</span></div>
          <div><strong className="block text-3xl font-black text-[#F56600]">{menu.categories.length}</strong><span className="mt-1 block text-sm font-bold text-slate-600">menu categories</span></div>
          <div><strong className="block text-3xl font-black text-[#F56600]">${lowestPrice.toFixed(2)}–${highestPrice.toFixed(2)}</strong><span className="mt-1 block text-sm font-bold text-slate-600">listed guide-price range</span></div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="methodology-heading">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <h2 id="methodology-heading" className="font-display text-3xl font-black">Methodology and appropriate use</h2>
              <p className="mt-4 leading-8 text-slate-700">
                We normalize the site&apos;s structured menu records into a consistent comparison table and review the result against public menu and nutrition references. Prices are planning estimates, not a checkout quote. Selected store, region, pickup or delivery, tax, fees and limited-time participation can change the final total.
              </p>
              <p className="mt-4 leading-8 text-slate-700">
                Last reviewed: <strong>{contentDates.research}</strong>. Cite this page when reusing the comparison and link to the current version so readers can check updates.
              </p>
            </div>
            <aside className="border-l-4 border-[#F56600] bg-[#fff7f0] p-6">
              <h2 className="text-lg font-black">Research notes</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <li>Guide prices are shown in U.S. dollars.</li>
                <li>Calorie labels retain the source record wording.</li>
                <li>Blank allergen cells mean no allergen was listed in this dataset, not a safety guarantee.</li>
              </ul>
              <div className="mt-5 grid gap-2 text-sm font-bold">
                <Link href="/editorial-policy" className="text-[#F56600] hover:underline">Editorial policy</Link>
                <Link href="/contact" className="text-[#F56600] hover:underline">Report a correction</Link>
                <a href="https://littlecaesars.com/en-us/menu/" target="_blank" rel="noreferrer" className="text-[#F56600] hover:underline">Official menu reference</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="comparison-table-heading">
        <div className="mx-auto max-w-[1216px]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#F56600]">Full Dataset</p>
              <h2 id="comparison-table-heading" className="mt-2 font-display text-3xl font-black">108-item menu comparison</h2>
            </div>
            <a href="/downloads/menu-price-comparison.csv" download className="font-black text-[#F56600] hover:underline">Download all rows as CSV →</a>
          </div>
          <div className="mt-6 max-h-[760px] overflow-auto border border-slate-300">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10 bg-[#111827] text-white">
                <tr>
                  <th className="px-4 py-3">Menu item</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Guide price</th>
                  <th className="px-4 py-3">Calories</th>
                  <th className="px-4 py-3">Allergens listed</th>
                </tr>
              </thead>
              <tbody>
                {availableItems.map((item, index) => (
                  <tr key={item.id} className={index % 2 ? 'bg-[#f4f6f8]' : 'bg-white'}>
                    <td className="border-t border-slate-200 px-4 py-3 font-bold">
                      <Link href={`/item/${item.id}`} className="hover:text-[#F56600] hover:underline">{item.name}</Link>
                    </td>
                    <td className="border-t border-slate-200 px-4 py-3">{categoryNames.get(item.categoryId) ?? 'Menu'}</td>
                    <td className="border-t border-slate-200 px-4 py-3 font-black text-[#F56600]">{money(item.basePrice)}</td>
                    <td className="border-t border-slate-200 px-4 py-3">{item.calories.label}</td>
                    <td className="border-t border-slate-200 px-4 py-3">{item.allergens.length ? item.allergens.join(', ') : 'None listed'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            This independent dataset is not affiliated with Little Caesar Enterprises, Inc. Trademarks belong to their respective owners.
          </p>
        </div>
      </section>
    </main>
  )
}
