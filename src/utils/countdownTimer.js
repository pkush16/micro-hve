const DEFAULT_TICK_INTERVAL_MS = 250

const normalizeNumber = (value, fallbackValue) =>
  Number.isFinite(value) && value >= 0 ? value : fallbackValue

export const createCountdownTimer = ({
  durationMs,
  initialElapsedMs = 0,
  tickIntervalMs = DEFAULT_TICK_INTERVAL_MS,
  getNow = () => Date.now(),
  onTick,
  onComplete,
}) => {
  const safeDurationMs = normalizeNumber(durationMs, 0)
  const safeTickIntervalMs = normalizeNumber(tickIntervalMs, DEFAULT_TICK_INTERVAL_MS)

  let startedAtMs = 0
  let elapsedBeforeStartMs = normalizeNumber(initialElapsedMs, 0)
  let intervalId = null
  let isRunning = false

  const emitTick = () => {
    const elapsedMs = Math.min(
      safeDurationMs,
      Math.max(0, Math.floor(getNow() - startedAtMs + elapsedBeforeStartMs)),
    )
    const remainingMs = Math.max(0, safeDurationMs - elapsedMs)

    if (onTick) {
      onTick({ elapsedMs, remainingMs })
    }

    if (remainingMs === 0) {
      stop()

      if (onComplete) {
        onComplete({ elapsedMs, remainingMs })
      }
    }
  }

  const handleVisibilityChange = () => {
    // Date.now() delta tracking keeps elapsed time accurate across hidden tabs.
    emitTick()
  }

  const start = () => {
    if (isRunning) {
      return
    }

    startedAtMs = getNow()
    isRunning = true
    emitTick()

    // emitTick can complete synchronously when elapsed is already at duration.
    if (!isRunning) {
      return
    }

    intervalId = setInterval(emitTick, safeTickIntervalMs)

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  const stop = () => {
    if (!isRunning) {
      return
    }

    elapsedBeforeStartMs = Math.min(
      safeDurationMs,
      Math.max(0, Math.floor(getNow() - startedAtMs + elapsedBeforeStartMs)),
    )
    isRunning = false

    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }

  const getSnapshot = () => {
    const elapsedMs = isRunning
      ? Math.min(safeDurationMs, Math.max(0, Math.floor(getNow() - startedAtMs + elapsedBeforeStartMs)))
      : Math.min(safeDurationMs, elapsedBeforeStartMs)

    return {
      elapsedMs,
      remainingMs: Math.max(0, safeDurationMs - elapsedMs),
      isRunning,
    }
  }

  return {
    start,
    stop,
    getSnapshot,
  }
}
