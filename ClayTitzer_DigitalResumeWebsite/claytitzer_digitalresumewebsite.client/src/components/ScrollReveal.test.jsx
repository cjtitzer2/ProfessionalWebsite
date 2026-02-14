import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ScrollReveal from './ScrollReveal'

describe('ScrollReveal', () => {
  it('renders children', () => {
    render(<ScrollReveal><p>Hello</p></ScrollReveal>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('starts hidden (opacity-0)', () => {
    const { container } = render(<ScrollReveal><p>Test</p></ScrollReveal>)
    expect(container.firstChild.className).toContain('opacity-0')
  })

  it('becomes visible when intersecting', () => {
    const { container } = render(<ScrollReveal><p>Test</p></ScrollReveal>)

    act(() => {
      IntersectionObserver.trigger(true)
    })

    expect(container.firstChild.className).toContain('opacity-100')
  })

  it('stays hidden when not intersecting', () => {
    const { container } = render(<ScrollReveal><p>Test</p></ScrollReveal>)

    act(() => {
      IntersectionObserver.trigger(false)
    })

    expect(container.firstChild.className).toContain('opacity-0')
  })

  it('applies transition delay from prop', () => {
    const { container } = render(<ScrollReveal delay={200}><p>Test</p></ScrollReveal>)
    expect(container.firstChild.style.transitionDelay).toBe('200ms')
  })

  it('applies additional className', () => {
    const { container } = render(<ScrollReveal className="mt-4"><p>Test</p></ScrollReveal>)
    expect(container.firstChild.className).toContain('mt-4')
  })
})
