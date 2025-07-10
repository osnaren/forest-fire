import { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        'model': '560px', // Custom max width for model uploader
      },
      colors: {
        charcoal: {
          900: '#1a1a1a',
        },
        gray: {
          300: '#d1d5db',
        },
        emerald: {
          500: '#10b981',
        },
        amber: {
          500: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
