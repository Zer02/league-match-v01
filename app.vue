<template>
  <NuxtPage />
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Auto-refresh auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (user.value) {
    console.log('Logged in as:', user.value.email)
    navigateTo('/dashboard') // Create this simple page
  }
  if (event === 'SIGNED_IN') {
    navigateTo('/dashboard')
  } else if (event === 'TOKEN_REFRESHED') {  // Handles expired/used links
    if (session) navigateTo('/dashboard')
  }
})

</script>