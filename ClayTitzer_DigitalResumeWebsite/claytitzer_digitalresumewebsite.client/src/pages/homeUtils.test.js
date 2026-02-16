import { describe, expect, it } from 'vitest'
import {
  areProgressMapsEqual,
  clamp01,
  getActiveSection,
  getGlowTransform,
  getHeroFadeFromRect,
  getScrollRatio,
  getSectionProgressFromRect,
} from './homeUtils'

describe('homeUtils', () => {
  it('clamp01 handles edge values and invalid numbers', () => {
    expect(clamp01(-1)).toBe(0)
    expect(clamp01(0.45)).toBe(0.45)
    expect(clamp01(99)).toBe(1)
    expect(clamp01(Number.NaN)).toBe(0)
  })

  it('getScrollRatio prevents divide-by-zero and clamps output', () => {
    expect(getScrollRatio({ scrollHeight: 900, innerHeight: 900, scrollY: 100 })).toBe(1)
    expect(getScrollRatio({ scrollHeight: 2000, innerHeight: 1000, scrollY: 250 })).toBe(0.25)
    expect(getScrollRatio({ scrollHeight: 2000, innerHeight: 1000, scrollY: -100 })).toBe(0)
  })

  it('getSectionProgressFromRect handles null/invalid inputs', () => {
    expect(getSectionProgressFromRect(null, 1000)).toBe(0)
    expect(getSectionProgressFromRect({ top: 0, height: 200 }, 0)).toBe(0)
  })

  it('getSectionProgressFromRect returns max near viewport center', () => {
    const centered = getSectionProgressFromRect({ top: 400, height: 200 }, 1000)
    const farAway = getSectionProgressFromRect({ top: -900, height: 200 }, 1000)
    expect(centered).toBeGreaterThan(farAway)
    expect(centered).toBeLessThanOrEqual(1)
  })

  it('getHeroFadeFromRect handles invalid viewport and clamps', () => {
    expect(getHeroFadeFromRect(null, 1000)).toBe(1)
    expect(getHeroFadeFromRect({ bottom: -100 }, 1000)).toBe(0)
    expect(getHeroFadeFromRect({ bottom: 1200 }, 1000)).toBe(1)
    expect(getHeroFadeFromRect({ bottom: 500 }, 1000)).toBe(0.5)
  })

  it('getActiveSection picks highest finite value with fallback', () => {
    expect(getActiveSection({ hero: 0.2, role: 0.8, content: 0.5 })).toBe('role')
    expect(getActiveSection({ hero: Number.NaN }, 'content')).toBe('content')
    expect(getActiveSection(null, 'hero')).toBe('hero')
  })

  it('areProgressMapsEqual detects near-equality and mismatches', () => {
    expect(areProgressMapsEqual({ hero: 0.5 }, { hero: 0.5001 })).toBe(true)
    expect(areProgressMapsEqual({ hero: 0.5 }, { hero: 0.7 })).toBe(false)
    expect(areProgressMapsEqual({ hero: 0.5 }, { role: 0.5 })).toBe(false)
  })

  it('getGlowTransform returns a stable transform string', () => {
    expect(getGlowTransform(200, 180, 132)).toBe('translate3d(68px, 48px, 0)')
    expect(getGlowTransform(Number.NaN, undefined, 132)).toBe('translate3d(-132px, -132px, 0)')
  })
})
