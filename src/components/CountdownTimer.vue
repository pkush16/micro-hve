<template>
  <div class="tracking-timer" role="status" aria-live="polite">
    <p class="tracking-time">{{ formattedTime }}</p>
    <p class="tracking-time-caption">Estimated delivery countdown</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  remainingMs: {
    type: Number,
    required: true,
  },
})

const formattedTime = computed(() => {
  const totalSeconds = Math.max(0, Math.ceil(props.remainingMs / 1000))
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  return `${minutes}:${seconds}`
})
</script>
