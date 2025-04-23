export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/leaflet'
  ],

  // We handle redirects ourselves
  supabase: { redirect: false },

  compatibilityDate: '2025-04-22'
})