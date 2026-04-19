import { describe, expect, it } from 'vitest'
import {
  ORDER_STATUS_FLOW,
  getStatusForElapsedMs,
  getTimelineStatuses,
} from '../orderStatusFlow'

describe('orderStatusFlow', () => {
  it('returns statuses in expected sequence boundaries', () => {
    expect(getStatusForElapsedMs(0).id).toBe('order-confirmed')
    expect(getStatusForElapsedMs(2 * 60 * 1000).id).toBe('preparing')
    expect(getStatusForElapsedMs(6 * 60 * 1000).id).toBe('out-for-delivery')
    expect(getStatusForElapsedMs(10 * 60 * 1000).id).toBe('delivered')
  })

  it('marks reached and active states for timeline rendering', () => {
    const elapsedMs = 7 * 60 * 1000
    const statuses = getTimelineStatuses(elapsedMs)

    expect(statuses).toHaveLength(ORDER_STATUS_FLOW.length)

    const activeStatus = statuses.find((status) => status.isActive)
    expect(activeStatus?.id).toBe('out-for-delivery')

    const unreachedStatuses = statuses.filter((status) => !status.isReached)
    expect(unreachedStatuses.map((status) => status.id)).toEqual(['delivered'])
  })
})
