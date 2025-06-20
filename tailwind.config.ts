import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'beuni-orange': '#ff6900',
        'beuni-dark': '#6d3332',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
      }
    }
  },
  plugins: []
}

export default config
