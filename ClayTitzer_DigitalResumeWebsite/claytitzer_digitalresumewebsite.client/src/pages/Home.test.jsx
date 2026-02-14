import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Home from './Home'

describe('Home', () => {
  it('renders hero with name', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Clay/)).toBeInTheDocument()
    expect(screen.getByText(/Titzer/)).toBeInTheDocument()
  })

  it('renders current job title', () => {
    renderWithRouter(<Home />)
    expect(screen.getAllByText('RPA Developer II').length).toBeGreaterThan(0)
  })

  it('renders tagline', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Automation \| Orchestration \| Integration/)).toBeInTheDocument()
  })

  it('renders current role section with company', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Old National Bank')).toBeInTheDocument()
  })

  it('renders education preview cards', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/MBA/)).toBeInTheDocument()
    expect(screen.getByText(/BS/)).toBeInTheDocument()
  })

  it('renders navigation links to career and about', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('link', { name: /View Career/i })).toHaveAttribute('href', '/career')
  })

  it('renders education detail link', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('link', { name: /Full Education Details/i })).toHaveAttribute('href', '/education')
  })
})
