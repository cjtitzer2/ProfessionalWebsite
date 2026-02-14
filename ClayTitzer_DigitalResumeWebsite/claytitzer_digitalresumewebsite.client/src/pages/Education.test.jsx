import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test/helpers'
import Education from './Education'
import { education } from '../data/resume'

describe('Education', () => {
  it('renders page header', () => {
    renderWithRouter(<Education />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Education')
    expect(screen.getByText('Output')).toBeInTheDocument()
  })

  it('renders all education entries', () => {
    renderWithRouter(<Education />)
    education.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })
})
