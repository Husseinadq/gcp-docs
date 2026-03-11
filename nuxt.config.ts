// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  compatibilityDate: '2025-07-15',
  css: ['~/app/assets/css/tailwind.css'],
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
  icon: {
    serverBundle: {
      collections: ['lucide']
    }
  }
})
