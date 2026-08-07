import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import { fileURLToPath } from 'node:url';

export default defineConfig({
  site: 'https://katarinagruener.github.io',

  integrations: [sitemap()],

  vite: {
    plugins: [
      tailwindcss()
    ],

    resolve: {
      alias: {
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),

        '@layouts': fileURLToPath(
          new URL('./src/layouts', import.meta.url)
        ),

        '@data': fileURLToPath(
          new URL('./src/data', import.meta.url)
        ),

        '@lib': fileURLToPath(
          new URL('./src/lib', import.meta.url)
        ),

        '@models': fileURLToPath(
          new URL('./src/types', import.meta.url)
        ),

        '@styles': fileURLToPath(
          new URL('./src/styles', import.meta.url)
        ),
        '@assets': fileURLToPath(
          new URL('./src/assets', import.meta.url)
        ),
      }
    }
  }
});