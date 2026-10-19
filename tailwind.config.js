/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        graphite: {
          900: '#0C1018',
          800: '#111824',
          700: '#192331',
          600: '#212E40'
        },
        violet: {
          electric: '#8065FF',
          deep: '#6047EA',
          glow: 'rgba(128, 101, 255, 0.35)'
        },
        aqua: {
          liquid: '#69E7E1',
          cyan: '#79D9FF',
          glow: 'rgba(105, 231, 225, 0.35)'
        },
        frost: {
          white: '#F5F7FF',
          silver: '#B5C0D0'
        },
        mint: {
          soft: '#76E3B1'
        },
        brandText: {
          primary: '#F6F7FB',
          secondary: '#B6C0CF',
          tertiary: '#8995A7'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glass-tier1': '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        'glass-tier2': '0 12px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.14)',
        'glass-tier3': '0 6px 18px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.4)',
        'glow-violet': '0 0 25px rgba(128, 101, 255, 0.4)',
        'glow-aqua': '0 0 25px rgba(105, 231, 225, 0.4)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
