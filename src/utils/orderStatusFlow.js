const MINUTE_MS = 60 * 1000

export const ORDER_STATUS_FLOW = [
  {
    id: 'order-confirmed',
    label: 'Order Confirmed',
    startAtMs: 0,
  },
  {
    id: 'preparing',
    label: 'Preparing Order',
    startAtMs: 2 * MINUTE_MS,
  },
  {
    id: 'out-for-delivery',
    label: 'Out for Delivery',
    startAtMs: 6 * MINUTE_MS,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    startAtMs: 10 * MINUTE_MS,
  },
]

export const getStatusForElapsedMs = (elapsedMs) => {
  const normalizedElapsedMs = Math.max(0, elapsedMs)

  for (let index = ORDER_STATUS_FLOW.length - 1; index >= 0; index -= 1) {
    if (normalizedElapsedMs >= ORDER_STATUS_FLOW[index].startAtMs) {
      return ORDER_STATUS_FLOW[index]
    }
  }

  return ORDER_STATUS_FLOW[0]
}

export const getTimelineStatuses = (elapsedMs) => {
  const activeStatus = getStatusForElapsedMs(elapsedMs)

  return ORDER_STATUS_FLOW.map((status) => {
    const isReached = elapsedMs >= status.startAtMs

    return {
      ...status,
      isReached,
      isActive: status.id === activeStatus.id,
    }
  })
}
