import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'gta-orange': '#FF8C00',
        'alucin-neon': '#39FF14',
        'alucin-pink': '#FF00FF',
        'comic-black': '#0a0a0a',
      },
      fontFamily: {
        'gta': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        'comic': ['Comic Sans MS', 'Comic Neue', 'cursive'],
      }
    }
  },
}
export default config