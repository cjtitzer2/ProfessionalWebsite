import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Skills from './Skills'
import { skills } from '../data/resume'

describe('Skills', () => {
  it('renders page header', () => {
    renderWithRouter(<Skills />)
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
    expect(screen.getByText('Capabilities')).toBeInTheDocument()
  })

  it('renders all skill categories', () => {
    renderWithRouter(<Skills />)
    skills.forEach((group) => {
      // Category name appears in both card header and ScrollSpy tooltip
      expect(screen.getAllByText(group.category).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders all individual skills', () => {
    renderWithRouter(<Skills />)
    skills.forEach((group) => {
      group.items.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })
  })

  it('renders proficiency labels for each skill', () => {
    renderWithRouter(<Skills />)
    skills.forEach((group) => {
      group.items.forEach(({ level }) => {
        expect(screen.getAllByText(level).length).toBeGreaterThan(0)
      })
    })
  })

  it('renders proficiency bars with correct widths', () => {
    const { container } = renderWithRouter(<Skills />)
    const bars = container.querySelectorAll('.bg-gradient-to-r.from-accent.to-gold')
    expect(bars.length).toBe(skills.reduce((sum, g) => sum + g.items.length, 0))

    const validWidths = ['w-full', 'w-2/3', 'w-1/3', 'w-1/6']
    bars.forEach((bar) => {
      const hasWidth = validWidths.some((w) => bar.classList.contains(w))
      expect(hasWidth).toBe(true)
    })
  })

  it('renders category cards in a grid', () => {
    const { container } = renderWithRouter(<Skills />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid.classList.contains('md:grid-cols-2')).toBe(true)
  })
})
