<template>
  <ol class="delivery-timeline">
    <li
      v-for="status in timelineStatuses"
      :key="status.id"
      :class="[
        'delivery-timeline__item',
        status.isReached ? 'delivery-timeline__item--reached' : '',
        status.isActive ? 'delivery-timeline__item--active' : '',
      ]"
    >
      <span class="delivery-timeline__marker" aria-hidden="true"></span>
      <span class="delivery-timeline__label">{{ status.label }}</span>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'
import { getTimelineStatuses } from '../utils/orderStatusFlow'

const props = defineProps({
  elapsedMs: {
    type: Number,
    required: true,
  },
})

const timelineStatuses = computed(() => getTimelineStatuses(props.elapsedMs))
</script>
