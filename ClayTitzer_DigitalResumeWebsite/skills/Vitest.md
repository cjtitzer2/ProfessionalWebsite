# Vitest

## Version
Vitest 4.0.18

## Usage in Project
Vitest is the test runner for all frontend unit and component tests. It integrates directly with Vite's config for consistent transforms and aliasing.

## Configuration
- Configured in: `claytitzer_digitalresumewebsite.client/vite.config.js` (inline `test` block)
- Environment: `jsdom`
- Global APIs: Enabled (`describe`, `it`, `expect` available without import)
- Setup file: `src/test/setup.js`

## Test Infrastructure
### Setup (`src/test/setup.js`)
- Imports `@testing-library/jest-dom` matchers
- Mocks `IntersectionObserver` globally (required by ScrollReveal/ScrollSpy)
- Mocks `window.matchMedia` (required by ThemeToggle)
- Auto-resets observer instances between tests via `afterEach`

### Helpers (`src/test/helpers.jsx`)
- `renderWithRouter(ui, { route })` — wraps component in `MemoryRouter` for testing routed components

## Commands
- `npm run test` — Single run
- `npm run test:watch` — Watch mode

## Test File Convention
- Co-located with source: `Component.jsx` → `Component.test.jsx`
- Page tests: `pages/Page.test.jsx`
- Data tests: `data/resume.test.js`

## Libraries
- `@testing-library/react` — Component rendering and querying
- `@testing-library/jest-dom` — Custom DOM matchers (toBeInTheDocument, toHaveAttribute, etc.)
