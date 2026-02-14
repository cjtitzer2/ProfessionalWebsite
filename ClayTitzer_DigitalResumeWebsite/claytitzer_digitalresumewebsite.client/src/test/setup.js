import '@testing-library/jest-dom'

// Mock IntersectionObserver globally for all tests
class MockIntersectionObserver {
  constructor(callback) {
    this._callback = callback
    MockIntersectionObserver._instance = this
  }
  observe() {}
  unobserve() {}
  disconnect() {}

  // Test helper: simulate intersection
  static trigger(isIntersecting = true) {
    MockIntersectionObserver._instance?._callback([{ isIntersecting }])
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver
