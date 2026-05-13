import Image from 'next/image'

const nutritionPages = [
  'https://www.datocms-assets.com/95658/1751552586-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-001.jpg',
  'https://www.datocms-assets.com/95658/1751552695-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-002.jpg',
  'https://www.datocms-assets.com/95658/1751552743-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-003.jpg',
  'https://www.datocms-assets.com/95658/1751552772-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-004.jpg',
  'https://www.datocms-assets.com/95658/1751552805-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-005.jpg',
  'https://www.datocms-assets.com/95658/1751552829-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-006.jpg',
  'https://www.datocms-assets.com/95658/1751552863-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-007.jpg',
  'https://www.datocms-assets.com/95658/1751552896-cr0026254_lj_nutri-info-allergen-ingredient_flyer-page-008.jpg'
]

export function NutritionPageClient() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto w-full max-w-[2048px] px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="mx-auto mb-4 flex max-w-[720px] items-center justify-center gap-2 text-[11px] font-black text-black sm:justify-start">
          <a href="/" className="transition hover:text-orange">
            Home
          </a>
          <span aria-hidden="true" className="text-medium-gray">
            &gt;
          </span>
          <a href="/menu" className="transition hover:text-orange">
            Menu
          </a>
          <span aria-hidden="true" className="text-medium-gray">
            &gt;
          </span>
          <span>Nutrition</span>
        </nav>
        <h1 className="text-center font-display text-[24px] font-black uppercase leading-tight tracking-normal text-black sm:text-[28px]">
          Little Caesars<sup className="text-[12px] leading-none">®</sup> Nutrition
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-[2048px] grid-cols-1 items-start gap-x-8 gap-y-10 px-0 pb-12 sm:px-6 md:grid-cols-2 xl:grid-cols-3 2xl:px-10">
        {nutritionPages.map((page, index) => (
          <figure key={page} className="mx-auto w-full max-w-[680px] bg-white md:max-w-none">
            <Image
              src={page}
              alt={`Little Caesars nutrition, allergen and ingredient guide page ${index + 1}`}
              width={1275}
              height={1650}
              sizes="(min-width: 1536px) 32vw, (min-width: 768px) 48vw, 100vw"
              priority={index < 3}
              className="h-auto w-full object-contain"
            />
          </figure>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-[2048px] flex-col items-center gap-4 px-5 pb-12 text-center sm:px-10">
        <a
          href="https://littlecaesars.com/static/usnutritionguide.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-base font-black uppercase text-orange underline-offset-4 transition hover:underline"
        >
          Download Nutrition PDF
        </a>
        <a
          href="https://littlecaesars.com/en-us/legal/animal-welfare-policy/"
          target="_blank"
          rel="noreferrer"
          className="text-base font-black uppercase text-orange underline-offset-4 transition hover:underline"
        >
          Animal Welfare Policy
        </a>
      </section>
    </main>
  )
}
