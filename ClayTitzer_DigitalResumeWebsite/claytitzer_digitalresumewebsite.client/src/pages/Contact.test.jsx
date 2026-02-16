import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Contact from './Contact'
import { contact } from '../data/resume'

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('Contact', () => {
  it('renders page header', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('renders contact location', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByText(contact.location)).toBeInTheDocument()
  })

  it('renders email link with mailto', () => {
    renderWithRouter(<Contact />)
    const emailLink = screen.getByText(contact.email)
    expect(emailLink).toBeInTheDocument()
    expect(emailLink.closest('a')).toHaveAttribute('href', `mailto:${contact.email}`)
  })

  it('renders external links with target blank', () => {
    renderWithRouter(<Contact />)
    contact.links.forEach(({ label }) => {
      const link = screen.getByText(label)
      expect(link.closest('a')).toHaveAttribute('target', '_blank')
      expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders form with required fields', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByLabelText(/name/i)).toBeRequired()
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/message/i)).toBeRequired()
  })

  it('renders submit button', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('form has accessible aria-label', () => {
    renderWithRouter(<Contact />)
    expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument()
  })

  it('shows sending state on submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise(() => {}))
    renderWithRouter(<Contact />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Sending...')
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('shows success message on successful submission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true })
    renderWithRouter(<Contact />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/thank you/i)
    })
  })

  it('shows error message on failed submission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: false })
    renderWithRouter(<Contact />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)
    })
  })

  it('shows error message on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    renderWithRouter(<Contact />)

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } })
    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)
    })
  })
})
