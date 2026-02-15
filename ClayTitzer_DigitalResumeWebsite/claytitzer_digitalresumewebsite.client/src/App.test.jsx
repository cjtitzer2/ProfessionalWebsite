import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from './App'

afterEach(() => {
  window.location.hash = ''
})

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />)
    expect(await screen.findByText(/Clay/)).toBeInTheDocument()
  })

  it('renders nav with all links', async () => {
    render(<App />)
    const nav = await screen.findByRole('navigation')
    const navScope = within(nav)
    expect(navScope.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(navScope.getByRole('link', { name: /^career$/i })).toBeInTheDocument()
    expect(navScope.getByRole('link', { name: /^education$/i })).toBeInTheDocument()
    expect(navScope.getByRole('link', { name: /^about$/i })).toBeInTheDocument()
  })

  it('renders fallback for unknown routes', async () => {
    window.location.hash = '#/nonexistent'
    render(<App />)
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument()
  })

  it('wraps pages in a main element', () => {
    const { container } = render(<App />)
    expect(container.querySelector('main')).toBeInTheDocument()
  })
})
