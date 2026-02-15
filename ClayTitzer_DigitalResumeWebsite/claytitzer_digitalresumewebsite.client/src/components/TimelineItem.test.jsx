import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TimelineItem from './TimelineItem'

describe('TimelineItem', () => {
  const defaultProps = {
    title: 'RPA Developer',
    subtitle: 'Old National Bank',
    dates: 'Jan 2024 – Present',
    bullets: ['Built automation', 'Led team'],
  }

  it('renders title, subtitle, and dates', () => {
    render(<TimelineItem {...defaultProps} />)
    expect(screen.getByText('RPA Developer')).toBeInTheDocument()
    expect(screen.getByText('Old National Bank')).toBeInTheDocument()
    expect(screen.getByText('Jan 2024 – Present')).toBeInTheDocument()
  })

  it('renders all bullets', () => {
    render(<TimelineItem {...defaultProps} />)
    expect(screen.getByText('Built automation')).toBeInTheDocument()
    expect(screen.getByText('Led team')).toBeInTheDocument()
  })

  it('renders without bullets', () => {
    render(<TimelineItem {...defaultProps} bullets={[]} />)
    expect(screen.getByText('RPA Developer')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders without subtitle', () => {
    render(<TimelineItem title="Test" dates="2024" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('applies current styling when isCurrent is true', () => {
    const { container } = render(<TimelineItem {...defaultProps} isCurrent />)
    const dot = container.querySelector('.rounded-full')
    expect(dot.className).toContain('bg-accent')
  })

  it('applies non-current styling by default', () => {
    const { container } = render(<TimelineItem {...defaultProps} />)
    const dot = container.querySelector('.rounded-full')
    expect(dot.className).toContain('bg-offwhite')
  })

  it('renders with undefined bullets (uses default empty array)', () => {
    expect(() => render(<TimelineItem title="Test" dates="2024" bullets={undefined} />)).not.toThrow()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders with many bullets without layout issues', () => {
    const manyBullets = Array.from({ length: 20 }, (_, i) => `Bullet ${i + 1}`)
    render(<TimelineItem title="Test" dates="2024" bullets={manyBullets} />)
    expect(screen.getByText('Bullet 1')).toBeInTheDocument()
    expect(screen.getByText('Bullet 20')).toBeInTheDocument()
  })
})
