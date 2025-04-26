export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/leaflet'
  ],

  // We handle redirects ourselves
  supabase: { redirect: false },

  compatibilityDate: '2025-04-22',

  runtimeConfig: {
    public: {
      supabase: {
        redirectOptions: {
          login: '/confirm',
          callback: '/confirm',
          exclude: ['/signup', '/about'] // Pages that don't need auth
        }
      }
    }
  }
})