import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary: 'bg-orange text-white hover:bg-orange-soft focus-visible:outline-orange shadow-[0_12px_28px_rgba(245,102,0,0.24)]',
  secondary: 'bg-navy text-white hover:bg-black focus-visible:outline-navy',
  ghost: 'bg-transparent text-navy hover:bg-white/55 focus-visible:outline-navy'
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: keyof typeof variants }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
