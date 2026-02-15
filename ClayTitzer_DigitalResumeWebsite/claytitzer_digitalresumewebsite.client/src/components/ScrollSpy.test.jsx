import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ScrollSpy from './ScrollSpy'

let scrollHandler

beforeEach(() => {
  scrollHandler = null
  vi.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
    if (event === 'scroll') scrollHandler = handler
  })
  vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})

  Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true })
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
})

describe('ScrollSpy', () => {
  const sections = ['Intro', 'Role', 'Education']

  it('renders a label for each section', () => {
    render(<ScrollSpy sections={sections} />)
    expect(screen.getByText('Intro')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
  })

  it('labels start with opacity-0 (hidden until hover)', () => {
    render(<ScrollSpy sections={sections} />)
    sections.forEach(s => {
      expect(screen.getByText(s).className).toContain('opacity-0')
    })
  })

  it('registers scroll listener on mount', () => {
    render(<ScrollSpy sections={sections} />)
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })

  it('updates active dot on scroll', () => {
    const { container } = render(<ScrollSpy sections={sections} />)

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 800, configurable: true })
      scrollHandler?.()
    })

    const dots = container.querySelectorAll('.rounded-full')
    const activeCount = Array.from(dots).filter(d => d.className.includes('scale-125')).length
    expect(activeCount).toBe(1)
  })

  it('cleans up scroll listener on unmount', () => {
    const { unmount } = render(<ScrollSpy sections={sections} />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('does not crash with empty sections array', () => {
    expect(() => render(<ScrollSpy sections={[]} />)).not.toThrow()
  })

  it('handles single section without crashing', () => {
    render(<ScrollSpy sections={['Only']} />)
    expect(screen.getByText('Only')).toBeInTheDocument()
  })

  it('handles scroll when page has no scrollable height', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true })

    const { container } = render(<ScrollSpy sections={sections} />)

    act(() => {
      scrollHandler?.()
    })

    // Progress bar should be at 0% when no scrollable content
    const progressFill = container.querySelector('[style*="height"]')
    expect(progressFill.style.height).toBe('0%')
  })

  it('clamps progress at 100% when overscrolled', () => {
    const { container } = render(<ScrollSpy sections={sections} />)

    act(() => {
      // Simulate overscroll (scrollY > docHeight, common on mobile bounce)
      Object.defineProperty(window, 'scrollY', { value: 1500, configurable: true })
      scrollHandler?.()
    })

    const progressFill = container.querySelector('[style*="height"]')
    expect(progressFill.style.height).toBe('100%')
  })
})
