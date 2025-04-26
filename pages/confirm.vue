<template>
  <div class="confirm-page">
    <div v-if="loading" class="status-message">
      <p>Confirming your login...</p>
    </div>
    <div v-else-if="error" class="status-message error">
      <p>{{ error }}</p>
      <NuxtLink to="/login" class="retry-link">Try again</NuxtLink>
    </div>
    <div v-else class="status-message success">
      <p>Login successful!</p>
      <NuxtLink to="/dashboard" class="dashboard-link">Go to Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    // Check if we're processing a magic link callback
    const { data, error: authError } = await supabase.auth.getSession();

    if (authError) throw authError;
    if (!data.session) {
      // Wait a moment for Supabase to process the redirect
      setTimeout(async () => {
        const { data: retryData, error: retryError } = await supabase.auth.getSession();
        if (retryError || !retryData.session) {
          throw new Error('Login failed. Please try the link again.');
        }
        await router.push('/dashboard');
      }, 1000);
      return;
    }

    await router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
});
</script>