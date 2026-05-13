'use client'

import type { CustomizationOption, MenuItem, SelectedOptions } from '@/types'

function OptionButton({
  option,
  selected,
  onClick
}: {
  option: CustomizationOption
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
        selected ? 'border-orange bg-orange/5 text-orange' : 'border-slate-200 bg-white text-navy hover:border-orange/50'
      }`}
    >
      <span className="block">{option.name}</span>
      {option.priceDelta !== 0 && <span className="mt-1 block text-xs text-slate-500">+${option.priceDelta.toFixed(2)}</span>}
    </button>
  )
}

export function CustomizationPanel({
  item,
  selectedOptions,
  setSelectedOptions
}: {
  item: MenuItem
  selectedOptions: SelectedOptions
  setSelectedOptions: (options: SelectedOptions) => void
}) {
  const customizations = item.customizations

  if (!item.customizable || !customizations) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-cream p-4 text-sm font-semibold text-navy">
        This item is served as configured.
      </div>
    )
  }

  const toppingCount = selectedOptions.toppings.length
  const maxToppings = customizations.maxToppings ?? 10

  function setOption(key: keyof Omit<SelectedOptions, 'toppings'>, option: CustomizationOption) {
    setSelectedOptions({ ...selectedOptions, [key]: option })
  }

  function toggleTopping(option: CustomizationOption) {
    const exists = selectedOptions.toppings.some((topping) => topping.id === option.id)
    if (exists) {
      setSelectedOptions({ ...selectedOptions, toppings: selectedOptions.toppings.filter((topping) => topping.id !== option.id) })
      return
    }
    if (toppingCount < maxToppings) {
      setSelectedOptions({ ...selectedOptions, toppings: [...selectedOptions.toppings, option] })
    }
  }

  return (
    <div className="grid gap-6">
      {customizations.sizes && (
        <section>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Size</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {customizations.sizes.map((option) => (
              <OptionButton key={option.id} option={option} selected={selectedOptions.size?.id === option.id} onClick={() => setOption('size', option)} />
            ))}
          </div>
        </section>
      )}

      {customizations.crusts && (
        <section>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Base</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {customizations.crusts.map((option) => (
              <OptionButton key={option.id} option={option} selected={selectedOptions.crust?.id === option.id} onClick={() => setOption('crust', option)} />
            ))}
          </div>
        </section>
      )}

      {customizations.sauces && (
        <section>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Dressing</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {customizations.sauces.map((option) => (
              <OptionButton key={option.id} option={option} selected={selectedOptions.sauce?.id === option.id} onClick={() => setOption('sauce', option)} />
            ))}
          </div>
        </section>
      )}

      {customizations.cheeses && (
        <section>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Cheese</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {customizations.cheeses.map((option) => (
              <OptionButton key={option.id} option={option} selected={selectedOptions.cheese?.id === option.id} onClick={() => setOption('cheese', option)} />
            ))}
          </div>
        </section>
      )}

      {customizations.toppings && (
        <section>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">Add-ins ({toppingCount}/{maxToppings})</h3>
          <div className="mt-3 grid gap-2">
            {customizations.toppings.map((option) => {
              const checked = selectedOptions.toppings.some((topping) => topping.id === option.id)
              const disabled = !checked && toppingCount >= maxToppings

              return (
                <label
                  key={option.id}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold ${
                    checked ? 'border-orange bg-orange/5 text-orange' : 'border-slate-200 bg-white text-navy'
                  } ${disabled ? 'opacity-50' : 'cursor-pointer hover:border-orange/50'}`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleTopping(option)}
                      className="h-4 w-4 accent-orange"
                    />
                    {option.name}
                  </span>
                  <span>+${option.priceDelta.toFixed(2)}</span>
                </label>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
