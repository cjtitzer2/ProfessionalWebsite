import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('ThemeToggle', () => {
  it('renders toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has accessible aria-label', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-label', expect.stringMatching(/switch to (dark|light) mode/i))
  })

  it('defaults to light mode when no preference stored', () => {
    render(<ThemeToggle />)
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument()
  })

  it('toggles to dark mode on click', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByLabelText(/switch to light mode/i)).toBeInTheDocument()
  })

  it('toggles back to light mode on second click', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    fireEvent.click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument()
  })

  it('persists theme to localStorage', () => {
    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('restores dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByLabelText(/switch to light mode/i)).toBeInTheDocument()
  })

  it('restores light theme from localStorage', () => {
    localStorage.setItem('theme', 'light')
    render(<ThemeToggle />)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('ignores invalid localStorage values and falls back to system preference', () => {
    localStorage.setItem('theme', 'invalid-value')
    render(<ThemeToggle />)
    // matchMedia mock returns false for prefers-color-scheme: dark (see setup.js)
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument()
  })

  it('renders SVGs with aria-hidden', () => {
    const { container } = render(<ThemeToggle />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
