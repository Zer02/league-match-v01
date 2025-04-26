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



<!-- 
<template>
  <div class="auth-page">
    <h2>Log In</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Log In</button>
      <p class="auth-link">Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert(error.message)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.auth-link {
  margin-top: 1rem;
  text-align: center;
}
</style>  
-->