<template>
  <div class="flex justify-between items-center p-3 border-b border-gray-200">
    <span class="font-medium">{{ rank }}. {{ player.name }}</span>
    <span class="text-sm text-gray-600">ELO: {{ player.elo }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rank: number
  player: {
    name: string
    elo: number
  }
}>()
</script>
