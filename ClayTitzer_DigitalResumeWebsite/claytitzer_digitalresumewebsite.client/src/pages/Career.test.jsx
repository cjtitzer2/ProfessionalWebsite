import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Career from './Career'
import { experience } from '../data/resume'

describe('Career', () => {
  it('renders page header', () => {
    renderWithRouter(<Career />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Career')
    expect(screen.getByText('Process')).toBeInTheDocument()
  })

  it('renders all experience entries', () => {
    renderWithRouter(<Career />)
    experience.forEach((item) => {
      expect(screen.getAllByText(item.title).length).toBeGreaterThan(0)
      expect(screen.getAllByText(item.subtitle).length).toBeGreaterThan(0)
    })
  })

  it('renders all bullets for each entry', () => {
    renderWithRouter(<Career />)
    experience.forEach((item) => {
      item.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument()
      })
    })
  })
})
