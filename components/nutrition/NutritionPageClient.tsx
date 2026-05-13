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
      <section className="mx-auto w-full max-w-[1280px] px-5 pb-7 pt-9 sm:px-6 sm:pb-8 sm:pt-12 xl:px-3">
        <h1 className="font-display text-[42px] font-black uppercase leading-[0.82] tracking-normal text-black sm:text-[44px]">
          Nutrition
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-y-4 px-0 pb-8 sm:grid-cols-2 sm:gap-y-0 sm:px-3">
        {nutritionPages.map((page, index) => (
          <figure key={page} className="mx-auto w-full max-w-[720px] bg-white sm:max-w-none">
            <Image
              src={page}
              alt={`Little Caesars nutrition, allergen and ingredient guide page ${index + 1}`}
              width={1275}
              height={1650}
              sizes="(min-width: 1280px) 640px, (min-width: 640px) 50vw, 100vw"
              priority={index < 2}
              className="h-auto w-full object-contain"
            />
          </figure>
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-5 px-5 pb-12 sm:px-9">
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
