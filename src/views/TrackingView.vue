<template>
  <section class="screen">
    <header class="screen__header">
      <h1>Tracking</h1>
      <p>Track your order progress in this MVP countdown experience.</p>
    </header>

    <p v-if="!hasActiveOrder" class="placeholder-text">
      No active order found. Place an order from checkout to start tracking.
    </p>

    <div v-else class="tracking-card">
      <p class="tracking-order-id">Order {{ activeOrder.id }}</p>
      <CountdownTimer :remaining-ms="remainingMs" />
      <p class="tracking-status">{{ activeOrder.status.label }}</p>
      <DeliveryTimeline :elapsed-ms="elapsedMs" />
    </div>

    <button class="flow-link" type="button" @click="startNewOrder">Start New Order</button>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CountdownTimer from '../components/CountdownTimer.vue'
import DeliveryTimeline from '../components/DeliveryTimeline.vue'
import { useOrderTracking } from '../composables/useOrderTracking'
import { createCountdownTimer } from '../utils/countdownTimer'

const router = useRouter()
const { activeOrder, hasActiveOrder, updateStatusFromElapsedMs, clearOrder } = useOrderTracking()

const elapsedMs = ref(0)
const remainingMs = ref(10 * 60 * 1000)

let timer = null

const syncOrderStatus = (nextElapsedMs, nextRemainingMs) => {
  elapsedMs.value = nextElapsedMs
  remainingMs.value = nextRemainingMs
  updateStatusFromElapsedMs(nextElapsedMs)
}

const startNewOrder = () => {
  clearOrder()
  router.push('/')
}

onMounted(() => {
  if (!hasActiveOrder.value) {
    return
  }

  const durationMs = activeOrder.value.etaSeconds * 1000
  const initialElapsedMs = Math.max(0, Date.now() - activeOrder.value.createdAtMs)

  timer = createCountdownTimer({
    durationMs,
    initialElapsedMs,
    onTick: ({ elapsedMs: nextElapsedMs, remainingMs: nextRemainingMs }) => {
      syncOrderStatus(nextElapsedMs, nextRemainingMs)
    },
    onComplete: ({ elapsedMs: nextElapsedMs, remainingMs: nextRemainingMs }) => {
      syncOrderStatus(nextElapsedMs, nextRemainingMs)
    },
  })

  timer.start()
})

onUnmounted(() => {
  if (timer) {
    timer.stop()
  }
})
</script>
