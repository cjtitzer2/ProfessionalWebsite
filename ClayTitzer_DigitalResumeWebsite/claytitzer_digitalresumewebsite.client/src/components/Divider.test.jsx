import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Divider from './Divider'

describe('Divider', () => {
  it('renders center variant by default', () => {
    const { container } = render(<Divider />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    expect(wrapper.classList.contains('justify-center')).toBe(true)
  })

  it('renders center variant with symmetric lines', () => {
    const { container } = render(<Divider variant="center" />)
    const lines = container.querySelectorAll('.h-px')
    expect(lines.length).toBe(2)
  })

  it('renders left variant', () => {
    const { container } = render(<Divider variant="left" />)
    const wrapper = container.firstChild
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    expect(wrapper.classList.contains('justify-center')).toBe(false)
  })

  it('renders left variant with single line', () => {
    const { container } = render(<Divider variant="left" />)
    const lines = container.querySelectorAll('.h-px')
    expect(lines.length).toBe(1)
  })

  it('has gold dot indicator', () => {
    const { container } = render(<Divider />)
    const dot = container.querySelector('.rounded-full.bg-gold')
    expect(dot).toBeInTheDocument()
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
