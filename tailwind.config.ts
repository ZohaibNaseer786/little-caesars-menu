import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#111827',
        orange: {
          DEFAULT: '#F56600',
          soft: '#D94F00',
          muted: '#FFE1CC'
        },
        cream: '#FFF6EA',
        sage: '#FFD23F',
        lc: {
          red: '#E31837',
          darkRed: '#B5122B',
          black: '#1A1A1A',
          lightGray: '#F5F5F5',
          mediumGray: '#8C8C8C',
          gold: '#FFD700',
          orange: '#F56600',
          border: '#E0E0E0'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Nunito Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Poppins', 'Georgia', 'serif']
      },
      boxShadow: {
        card: '0 18px 38px -26px rgba(26, 26, 26, 0.38)',
        dropdown: '0 12px 30px rgba(26, 26, 26, 0.16)'
      },
      backgroundImage: {
        'hero-wash':
          'radial-gradient(circle at top right, rgba(245, 102, 0, 0.28), transparent 46%), radial-gradient(circle at 15% 80%, rgba(227, 24, 55, 0.18), transparent 38%)'
      }
    }
  },
  plugins: []
}

export default config
