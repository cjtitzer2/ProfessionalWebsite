import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />)
    expect(await screen.findByText(/Clay/)).toBeInTheDocument()
  })

  it('renders nav with all links', async () => {
    render(<App />)
    expect(await screen.findByRole('navigation')).toBeInTheDocument()
    const nav = screen.getByRole('navigation')
    expect(nav.querySelector('a[href="/"]')).toBeInTheDocument()
    expect(nav.querySelector('a[href="/career"]')).toBeInTheDocument()
    expect(nav.querySelector('a[href="/education"]')).toBeInTheDocument()
    expect(nav.querySelector('a[href="/about"]')).toBeInTheDocument()
  })
})
