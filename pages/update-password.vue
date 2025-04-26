<template>
  <div class="auth-page">
    <h2>Update Password</h2>
    <form @submit.prevent="handleUpdate">
      <input v-model="password" type="password" placeholder="New Password" required>
      <input v-model="passwordConfirm" type="password" placeholder="Confirm Password" required>
      <button type="submit">Update Password</button>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const router = useRouter()
const password = ref('')
const passwordConfirm = ref('')

const handleUpdate = async () => {
  if (password.value !== passwordConfirm.value) {
    alert("Passwords don't match!")
    return
  }

  const { error } = await supabase.auth.updateUser({
    password: password.value
  })

  if (error) {
    alert(error.message)
  } else {
    router.push('/dashboard')
  }
}
</script>