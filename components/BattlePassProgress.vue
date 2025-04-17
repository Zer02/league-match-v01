<template>
  <div class="p-4 bg-blue-100 rounded-xl">
    <p class="text-sm mb-2">Battle Pass Progress</p>
    <div class="w-full bg-gray-200 rounded-full h-4">
      <div class="bg-blue-600 h-4 rounded-full transition-all" :style="{ width: percent + '%' }"/>
    </div>
    <p class="text-xs text-right mt-1">{{ progress }}/{{ total }} pts</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number
  total: number
}>()

const percent = computed(() => Math.min(100, (progress / total) * 100))
</script>
