import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import About from './About'
import { focusAreas } from '../data/resume'

describe('About', () => {
  it('renders page header', () => {
    renderWithRouter(<About />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About')
    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })

  it('renders bio paragraph', () => {
    renderWithRouter(<About />)
    expect(screen.getByText(/RPA Developer at Old National Bank/)).toBeInTheDocument()
  })

  it('renders philosophy section', () => {
    renderWithRouter(<About />)
    expect(screen.getByText('Automation as leverage')).toBeInTheDocument()
    expect(screen.getByText('Clean systems over complexity')).toBeInTheDocument()
  })

  it('renders all technical focus areas', () => {
    renderWithRouter(<About />)
    focusAreas.forEach((area) => {
      expect(screen.getByText(area)).toBeInTheDocument()
    })
  })

  it('renders philosophy descriptions', () => {
    renderWithRouter(<About />)
    expect(screen.getByText(/removes friction silently/)).toBeInTheDocument()
    expect(screen.getByText(/Maintainable beats clever/)).toBeInTheDocument()
  })
})
