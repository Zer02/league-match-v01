<template>
  <div class="match-ui">
    <button :disabled="loading" @click="createMatch">
      {{ loading ? 'Finding...' : 'Find Match' }}
    </button>

    <div class="match-section">
      <h3>Your Matches</h3>
      <div v-if="yourMatches.length">
        <div v-for="match in yourMatches" :key="match.id" class="match-card">
          <p>Match #{{ match.id.slice(0, 6) }}</p>
          <p>Status: <span :class="match.status">{{ match.status }}</span></p>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>No matches created yet</p>
      </div>
    </div>

    <div class="match-section">
      <h3>Available Matches</h3>
      <div v-if="availableMatches.length">
        <div v-for="match in availableMatches" :key="match.id" class="match-card">
          <p>Match #{{ match.id.slice(0, 6) }}</p>
          <button class="accept-btn" @click="acceptMatch(match.id)">
            Accept Match
          </button>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>No available matches right now</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(false)
const yourMatches = ref([])
const availableMatches = ref([])

// Fetch matches
const fetchMatches = async () => {
  try {
    // Get your matches
    const { data: yourData, error: yourError } = await supabase
      .from('match_requests')
      .select('*')
      .eq('player_id', user.value.id)

    if (yourError) throw yourError

    // Get available matches (pending and not yours)
    const { data: availableData, error: availableError } = await supabase
      .from('match_requests')
      .select('*')
      .eq('status', 'pending')
      .neq('player_id', user.value.id)

    if (availableError) throw availableError

    yourMatches.value = yourData || []
    availableMatches.value = availableData || []

    console.log('Your matches:', yourMatches.value)
    console.log('Available matches:', availableMatches.value)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

// Create match
const createMatch = async () => {
  try {
    loading.value = true
    const { error } = await supabase
      .from('match_requests')
      .insert([{
        player_id: user.value.id,
        status: 'pending'
      }])

    if (error) throw error
    await fetchMatches()
  } catch (error) {
    console.error('Create error:', error)
  } finally {
    loading.value = false
  }
}

// Accept match
const acceptMatch = async (matchId) => {
  try {
    const { error } = await supabase
      .from('match_requests')
      .update({
        status: 'accepted',
        accepted_by: user.value.id
      })
      .eq('id', matchId)

    if (error) throw error
    await fetchMatches()
  } catch (error) {
    console.error('Accept error:', error)
  }
}

// Initial load
onMounted(fetchMatches)

// Realtime updates
supabase.channel('match_updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'match_requests'
  }, fetchMatches)
  .subscribe()
</script>


<style scoped>
.match-ui {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.match-section {
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.match-card {
  background: white;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}
</style>