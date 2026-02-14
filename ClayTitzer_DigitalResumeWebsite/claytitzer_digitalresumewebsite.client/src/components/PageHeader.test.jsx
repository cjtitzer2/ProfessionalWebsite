import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PageHeader from './PageHeader'

describe('PageHeader', () => {
  it('renders label and title', () => {
    render(<PageHeader label="Process" title="Career" />)
    expect(screen.getByText('Process')).toBeInTheDocument()
    expect(screen.getByText('Career')).toBeInTheDocument()
  })

  it('renders title as h1', () => {
    render(<PageHeader label="Test" title="Heading" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading')
  })

  it('label has monospace and uppercase styling', () => {
    render(<PageHeader label="Output" title="Education" />)
    const label = screen.getByText('Output')
    expect(label.className).toContain('font-mono')
    expect(label.className).toContain('uppercase')
  })
})
