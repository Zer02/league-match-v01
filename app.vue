<template>
  <NuxtPage />
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Handle auth redirects
watchEffect(() => {
  if (user.value) {
    // Check if profile exists
    supabase.from('profiles')
      .select('username')
      .eq('user_id', user.value.id)
      .single()
      .then(({ data }) => {
        if (!data?.username) {
          router.push('/setup-profile')
        } else {
          if (router.currentRoute.value.path === '/') {
            router.push('/')
          }
        }
      })
  } else {
    // Allow these routes without redirect
    const publicRoutes = ['/', '/login', '/signup']
    if (!publicRoutes.includes(router.currentRoute.value.path)) {
      router.push('/')
    }
  }
})
</script>