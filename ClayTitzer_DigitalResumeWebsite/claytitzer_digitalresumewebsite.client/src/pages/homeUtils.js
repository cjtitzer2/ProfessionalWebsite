export function clamp01(value) {
  if (!Number.isFinite(value)) return 0
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

export function getScrollRatio({ scrollHeight, innerHeight, scrollY }) {
  const maxScroll = Math.max((scrollHeight ?? 0) - (innerHeight ?? 0), 1)
  return clamp01((scrollY ?? 0) / maxScroll)
}

export function getSectionProgressFromRect(rect, viewportHeight) {
  if (!rect || !Number.isFinite(viewportHeight) || viewportHeight <= 0) return 0
  const viewportCenter = viewportHeight * 0.5
  const sectionCenter = rect.top + rect.height * 0.5
  const distance = Math.abs(viewportCenter - sectionCenter)
  const maxDistance = Math.max(viewportHeight * 0.8, 1)
  return clamp01(1 - distance / maxDistance)
}

export function getHeroFadeFromRect(rect, viewportHeight) {
  if (!rect || !Number.isFinite(viewportHeight) || viewportHeight <= 0) return 1
  return clamp01(rect.bottom / viewportHeight)
}

export function getActiveSection(sectionMap, fallback = 'hero') {
  if (!sectionMap || typeof sectionMap !== 'object') return fallback
  const entries = Object.entries(sectionMap).filter(([, value]) => Number.isFinite(value))
  if (!entries.length) return fallback
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

export function areProgressMapsEqual(a, b, epsilon = 0.0005) {
  const aEntries = Object.entries(a ?? {})
  const bEntries = Object.entries(b ?? {})
  if (aEntries.length !== bEntries.length) return false
  return aEntries.every(([key, value]) => {
    const nextValue = b?.[key]
    return Number.isFinite(value) && Number.isFinite(nextValue) && Math.abs(value - nextValue) <= epsilon
  })
}

export function getGlowTransform(x, y, radius) {
  const safeX = Number.isFinite(x) ? x : 0
  const safeY = Number.isFinite(y) ? y : 0
  const safeRadius = Number.isFinite(radius) ? radius : 0
  return `translate3d(${safeX - safeRadius}px, ${safeY - safeRadius}px, 0)`
}
