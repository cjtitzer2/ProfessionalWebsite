import '@testing-library/jest-dom'
import { afterEach } from 'vitest'

// Mock IntersectionObserver globally for all tests
class MockIntersectionObserver {
  constructor(callback) {
    this._callback = callback
    MockIntersectionObserver._instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}

  // Test helper: simulate intersection on all active observers
  static trigger(isIntersecting = true) {
    MockIntersectionObserver._instances.forEach((instance) => {
      instance._callback([{ isIntersecting }])
    })
  }

  // Reset between tests
  static reset() {
    MockIntersectionObserver._instances = []
  }
}
MockIntersectionObserver._instances = []

globalThis.IntersectionObserver = MockIntersectionObserver

// Auto-reset between tests so observers from one test don't leak into the next
afterEach(() => {
  MockIntersectionObserver.reset()
})
