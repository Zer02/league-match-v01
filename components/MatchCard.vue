<template>
  <div class="p-4 rounded-xl shadow bg-white flex justify-between items-center">
    <div>
      <h3 class="font-bold">{{ match.rival_name }}</h3>
      <p class="text-sm text-gray-500">Score: {{ match.score }}</p>
      <p class="text-xs text-gray-400">Date: {{ formatDate(match.created_at) }}</p>
    </div>
    <span :class="resultColor">{{ match.result }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  match: {
    rival_name: string
    score: string
    result: 'Win' | 'Loss'
    created_at: string
  }
}>()

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()

const resultColor = computed(() =>
  match.result === 'Win' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'
)
</script>
