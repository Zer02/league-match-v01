<template>
  <div class="profile-setup">
    <h2>Choose Your Username</h2>
    <form @submit.prevent="saveProfile">
      <input v-model="username" placeholder="tennispro123" required pattern="[a-zA-Z0-9]{3,20}"
        title="3-20 characters, letters/numbers only">
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const username = ref('')

const saveProfile = async () => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      user_id: user.value.id,
      username: username.value
    })

  if (error) {
    alert('Username taken or invalid')
  } else {
    router.push('/dashboard')
  }
}
</script>