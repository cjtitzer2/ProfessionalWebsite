# IntersectionObserver API

## Usage in Project
The IntersectionObserver browser API is used for scroll-triggered animations and section tracking. It provides a performant alternative to scroll event listeners for visibility detection.

## Components Using It

### ScrollReveal (`components/ScrollReveal.jsx`)
- Purpose: Fade-in animation when element enters viewport
- Threshold: `0.15` (triggers when 15% visible)
- Behavior: Once visible, unobserves the element (one-time animation)
- Animation: `opacity-0 translate-y-3` → `opacity-100 translate-y-0` (300ms ease-in-out)
- Supports configurable delay via `transitionDelay` inline style

### ScrollSpy (`components/ScrollSpy.jsx`)
- Purpose: Tracks scroll progress and active section
- Uses scroll event listener (not IntersectionObserver directly) with manual section break calculations
- Progress: `scrollY / (scrollHeight - innerHeight)` clamped to [0, 1]
- Active section: Determined by comparing progress against evenly-spaced section breakpoints with -0.05 offset

## Testing
- `IntersectionObserver` is mocked globally in `test/setup.js`
- `MockIntersectionObserver` stores instances and provides `trigger(isIntersecting)` static method
- Auto-reset between tests via `afterEach`

## Browser Support
IntersectionObserver is supported in all modern browsers. No polyfill is included — the site targets modern browsers only.
