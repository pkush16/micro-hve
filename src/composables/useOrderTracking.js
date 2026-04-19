import { computed, ref } from 'vue'
import { getStatusForElapsedMs } from '../utils/orderStatusFlow'

const DEFAULT_ETA_SECONDS = 10 * 60
const activeOrder = ref(null)

const generateOrderId = () => `ORD-${Date.now().toString(36).toUpperCase()}`

export const useOrderTracking = () => {
  const hasActiveOrder = computed(() => Boolean(activeOrder.value))

  const createOrder = ({ items, checkoutDetails }) => {
    const createdAtMs = Date.now()

    activeOrder.value = {
      id: generateOrderId(),
      createdAtMs,
      etaSeconds: DEFAULT_ETA_SECONDS,
      status: getStatusForElapsedMs(0),
      checkoutDetails,
      items,
    }

    return activeOrder.value
  }

  const updateStatusFromElapsedMs = (elapsedMs) => {
    if (!activeOrder.value) {
      return
    }

    activeOrder.value = {
      ...activeOrder.value,
      status: getStatusForElapsedMs(elapsedMs),
    }
  }

  const clearOrder = () => {
    activeOrder.value = null
  }

  return {
    activeOrder,
    hasActiveOrder,
    createOrder,
    updateStatusFromElapsedMs,
    clearOrder,
  }
}
