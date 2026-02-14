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
})
