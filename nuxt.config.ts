export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],

  // We handle redirects ourselves
  supabase: { redirect: false },

  compatibilityDate: '2025-04-22'
})