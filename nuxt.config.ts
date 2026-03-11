import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/icon'],
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s · GCP Atlas',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  }
})
