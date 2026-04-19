import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createCountdownTimer } from '../countdownTimer'

describe('countdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses Date.now deltas to maintain elapsed time progression', () => {
    const onTick = vi.fn()

    const timer = createCountdownTimer({
      durationMs: 10_000,
      tickIntervalMs: 500,
      onTick,
    })

    timer.start()
    vi.advanceTimersByTime(2_000)

    const snapshot = timer.getSnapshot()
    expect(snapshot.elapsedMs).toBe(2_000)
    expect(snapshot.remainingMs).toBe(8_000)

    timer.stop()
    expect(onTick).toHaveBeenCalled()
  })

  it('completes exactly at zero remaining time', () => {
    const onComplete = vi.fn()

    const timer = createCountdownTimer({
      durationMs: 3_000,
      tickIntervalMs: 250,
      onComplete,
    })

    timer.start()
    vi.advanceTimersByTime(3_200)

    const snapshot = timer.getSnapshot()
    expect(snapshot.remainingMs).toBe(0)
    expect(snapshot.isRunning).toBe(false)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
