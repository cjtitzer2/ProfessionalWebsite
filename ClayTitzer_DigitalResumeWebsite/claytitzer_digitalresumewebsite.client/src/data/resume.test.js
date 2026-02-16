import { describe, it, expect } from 'vitest'
import { experience, education, focusAreas, skills, contact } from './resume'

describe('resume data integrity', () => {
  describe('experience', () => {
    it('has at least one entry', () => {
      expect(experience.length).toBeGreaterThan(0)
    })

    it('first entry is marked as current', () => {
      expect(experience[0].isCurrent).toBe(true)
    })

    it('every entry has required fields', () => {
      experience.forEach((item) => {
        expect(item.title).toBeTruthy()
        expect(item.subtitle).toBeTruthy()
        expect(item.dates).toBeTruthy()
        expect(Array.isArray(item.bullets)).toBe(true)
      })
    })

    it('only the first entry is current', () => {
      experience.slice(1).forEach((item) => {
        expect(item.isCurrent).toBeFalsy()
      })
    })

    it('entries are ordered most recent first', () => {
      expect(experience[0].dates).toContain('Present')
    })
  })

  describe('education', () => {
    it('has at least one entry', () => {
      expect(education.length).toBeGreaterThan(0)
    })

    it('every entry has required fields', () => {
      education.forEach((item) => {
        expect(item.title).toBeTruthy()
        expect(item.shortTitle).toBeTruthy()
        expect(item.subtitle).toBeTruthy()
        expect(item.institution).toBeTruthy()
        expect(item.dates).toBeTruthy()
        expect(item.year).toBeTruthy()
      })
    })

    it('year is a 4-digit string', () => {
      education.forEach((item) => {
        expect(item.year).toMatch(/^\d{4}$/)
      })
    })
  })

  describe('focusAreas', () => {
    it('has at least one entry', () => {
      expect(focusAreas.length).toBeGreaterThan(0)
    })

    it('every entry is a non-empty string', () => {
      focusAreas.forEach((area) => {
        expect(typeof area).toBe('string')
        expect(area.length).toBeGreaterThan(0)
      })
    })

    it('has no duplicates', () => {
      const unique = new Set(focusAreas)
      expect(unique.size).toBe(focusAreas.length)
    })
  })

  describe('skills', () => {
    const validLevels = ['Expert', 'Advanced', 'Intermediate', 'Foundational']

    it('has at least one category', () => {
      expect(skills.length).toBeGreaterThan(0)
    })

    it('every category has a name and items', () => {
      skills.forEach((group) => {
        expect(group.category).toBeTruthy()
        expect(Array.isArray(group.items)).toBe(true)
        expect(group.items.length).toBeGreaterThan(0)
      })
    })

    it('every skill has a name and valid level', () => {
      skills.forEach((group) => {
        group.items.forEach((item) => {
          expect(item.name).toBeTruthy()
          expect(validLevels).toContain(item.level)
        })
      })
    })

    it('has no duplicate category names', () => {
      const names = skills.map((s) => s.category)
      expect(new Set(names).size).toBe(names.length)
    })

    it('has no duplicate skill names within a category', () => {
      skills.forEach((group) => {
        const names = group.items.map((i) => i.name)
        expect(new Set(names).size).toBe(names.length)
      })
    })
  })

  describe('contact', () => {
    it('has location', () => {
      expect(contact.location).toBeTruthy()
    })

    it('has valid email', () => {
      expect(contact.email).toMatch(/.+@.+\..+/)
    })

    it('has at least one link', () => {
      expect(contact.links.length).toBeGreaterThan(0)
    })

    it('every link has label and url', () => {
      contact.links.forEach((link) => {
        expect(link.label).toBeTruthy()
        expect(link.url).toMatch(/^https?:\/\//)
      })
    })
  })
})
