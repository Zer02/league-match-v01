<!-- pages/signup.vue -->
<template>
  <div class="auth-page">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleMagicLinkSignup">
      <input v-model="email" type="email" placeholder="Your email" required>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Sign Up with Magic Link' }}
      </button>
      <p v-if="success" class="success-message">
        Check your email to complete signup!
      </p>
    </form>
  </div>
</template>

<script setup>
const email = ref('')
const message = ref('')

const login = async () => {
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: { emailRedirectTo: window.location.origin }
  })
  message.value = error ? error.message : 'Check your email!'
}
</script>