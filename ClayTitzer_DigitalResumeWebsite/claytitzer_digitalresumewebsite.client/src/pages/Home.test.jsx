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
    expect(screen.getByText(/Building enterprise automation systems/i)).toBeInTheDocument()
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
    expect(screen.getByRole('link', { name: /view career details/i })).toHaveAttribute('href', '/career')
    expect(screen.getByRole('link', { name: /view about details/i })).toHaveAttribute('href', '/about')
  })

  it('renders education detail link', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('link', { name: /view education details/i })).toHaveAttribute('href', '/education')
  })

  it('renders playbooks detail link', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('link', { name: /view playbooks details/i })).toHaveAttribute('href', '/playbooks')
  })

  it('renders quick actions card', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('button', { name: /copy email/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore playbooks/i })).toHaveAttribute('href', '/playbooks')
  })

  it('renders section progress navigation with four sections', () => {
    renderWithRouter(<Home />)
    const progressNav = screen.getByLabelText(/page section progress/i)
    expect(progressNav).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /hero/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /current role/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /details/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /philosophy/i })).toBeInTheDocument()
  })

  it('renders workflow graph with consistent node and connector counts', () => {
    const { container } = renderWithRouter(<Home />)
    expect(container.querySelectorAll('.hero-workflow-node').length).toBe(7)
    expect(container.querySelectorAll('.hero-workflow-link-base').length).toBe(7)
    expect(container.querySelectorAll('.hero-workflow-link-signal').length).toBe(7)
  })
})
