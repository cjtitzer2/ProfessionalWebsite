import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import TypeWriter from './TypeWriter'

afterEach(() => {
  vi.useRealTimers()
})

describe('TypeWriter', () => {
  it('renders full text immediately for screen readers', () => {
    render(<TypeWriter text="Automation first" />)
    expect(screen.getByText('Automation first')).toBeInTheDocument()
  })

  it('types text over time after delay', () => {
    vi.useFakeTimers()
    const { container } = render(<TypeWriter text="ABC" speed={10} delay={20} />)
    const [animatedText] = container.querySelectorAll('span[aria-hidden="true"]')

    expect(screen.getByText('ABC')).toBeInTheDocument()
    expect(animatedText.textContent).toBe('')

    act(() => {
      vi.advanceTimersByTime(20)
    })
    expect(animatedText.textContent).toBe('A')

    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(animatedText.textContent).toBe('AB')

    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(animatedText.textContent).toBe('ABC')
  })

  it('resets animation when text changes', () => {
    vi.useFakeTimers()
    const { rerender, container } = render(<TypeWriter text="Hello" speed={10} delay={0} />)
    let [animatedText] = container.querySelectorAll('span[aria-hidden="true"]')

    act(() => {
      vi.advanceTimersByTime(30)
    })
    expect(animatedText.textContent).toMatch(/^Hel/)

    rerender(<TypeWriter text="World" speed={10} delay={0} />)
    const hiddenSpans = container.querySelectorAll('span[aria-hidden="true"]')
    animatedText = hiddenSpans[0]

    act(() => {
      vi.advanceTimersByTime(10)
    })
    expect(animatedText.textContent.startsWith('W')).toBe(true)
    expect(animatedText.textContent).not.toContain('H')
  })
})
