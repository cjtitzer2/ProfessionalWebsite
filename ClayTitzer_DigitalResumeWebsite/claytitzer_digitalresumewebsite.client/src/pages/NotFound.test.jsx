import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('renders 404 heading', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page Not Found')
  })

  it('renders link back to home', () => {
    renderWithRouter(<NotFound />)
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
  })
})
