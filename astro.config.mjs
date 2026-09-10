import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  site: 'https://naufaldi.com',
  srcDir: './src/astro',
  output: 'static',
  integrations: [react()],
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { '@': new URL('./src', import.meta.url).pathname } },
  },
})
