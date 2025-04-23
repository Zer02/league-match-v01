<template>
  <div>
    <input v-model="email" placeholder="Your email">
    <button @click="login">Send Magic Link</button>
    <p>{{ message }}</p>
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