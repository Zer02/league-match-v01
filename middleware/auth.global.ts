export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  // Allow login page and auth callbacks
  if (to.path === '/login' || to.path === '/confirm') return
  
  if (!user.value && to.path !== '/') {
    return navigateTo('/login')
  }
})