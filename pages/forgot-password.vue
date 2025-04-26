<template>
  <div class="auth-page">
    <h2>Reset Password</h2>
    <form @submit.prevent="handleReset">
      <input v-model="email" type="email" placeholder="Email" required>
      <button type="submit">Send Reset Link</button>
      <p v-if="success" class="success-message">Check your email for a reset link!</p>
      <p class="auth-link">
        Remember your password? <NuxtLink to="/login">Log in</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const success = ref(false)

const handleReset = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: window.location.origin + '/update-password'
  })

  if (error) {
    alert(error.message)
  } else {
    success.value = true
  }
}
</script>