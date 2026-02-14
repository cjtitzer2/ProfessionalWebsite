import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Nav from './Nav'

describe('Nav', () => {
  it('renders the logo', () => {
    renderWithRouter(<Nav />)
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithRouter(<Nav />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /career/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /education/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('links point to correct routes', () => {
    renderWithRouter(<Nav />)
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /career/i })).toHaveAttribute('href', '/career')
    expect(screen.getByRole('link', { name: /education/i })).toHaveAttribute('href', '/education')
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
  })

  it('renders the progress bar container', () => {
    const { container } = renderWithRouter(<Nav />)
    const progressBar = container.querySelector('nav > div:last-child')
    expect(progressBar).toBeInTheDocument()
  })
})
