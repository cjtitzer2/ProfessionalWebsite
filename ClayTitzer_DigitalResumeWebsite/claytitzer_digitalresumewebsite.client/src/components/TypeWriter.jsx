import { useEffect, useState } from 'react'

export default function TypeWriter({ text, speed = 45, delay = 0, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    syncPreference()

    mediaQuery.addEventListener?.('change', syncPreference)
    mediaQuery.addListener?.(syncPreference)

    return () => {
      mediaQuery.removeEventListener?.('change', syncPreference)
      mediaQuery.removeListener?.(syncPreference)
    }
  }, [])

  useEffect(() => {
    let resetTimer = null
    if (!text) {
      resetTimer = setTimeout(() => setDisplayed(''), 0)
      return () => clearTimeout(resetTimer)
    }
    if (prefersReducedMotion) {
      resetTimer = setTimeout(() => setDisplayed(text), 0)
      return () => clearTimeout(resetTimer)
    }

    let charTimer = null
    let index = 0
    resetTimer = setTimeout(() => setDisplayed(''), 0)

    const startTimer = setTimeout(() => {
      const tick = () => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index < text.length) {
          charTimer = setTimeout(tick, speed)
        }
      }
      tick()
    }, Math.max(delay, 0))

    return () => {
      if (resetTimer) clearTimeout(resetTimer)
      clearTimeout(startTimer)
      if (charTimer) clearTimeout(charTimer)
    }
  }, [text, speed, delay, prefersReducedMotion])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayed}
      </span>
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle"
          style={{ animation: 'typing-cursor 0.8s step-end infinite' }}
        />
      )}
    </span>
  )
}
