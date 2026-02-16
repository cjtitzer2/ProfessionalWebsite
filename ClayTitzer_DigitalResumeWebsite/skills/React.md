# React

## Version
React 19.2.0

## Usage in Project
React is the core UI framework for the digital resume SPA. The application is built entirely with functional components and React hooks.

## Key Patterns
- **Lazy loading**: All page components use `React.lazy()` with dynamic imports for code-splitting
- **Suspense**: Wraps lazy-loaded routes with a `LoadingFallback` component
- **Error Boundary**: Class-based `ErrorBoundary` in `App.jsx` catches rendering errors with a fallback UI
- **Hooks used**: `useState`, `useEffect`, `useRef`, `useCallback`
- **Functional components only**: No class components except the ErrorBoundary (required by React API)

## File Locations
- Entry point: `claytitzer_digitalresumewebsite.client/src/main.jsx`
- App root: `claytitzer_digitalresumewebsite.client/src/App.jsx`
- Components: `claytitzer_digitalresumewebsite.client/src/components/`
- Pages: `claytitzer_digitalresumewebsite.client/src/pages/`

## Key Decisions
- React 19 chosen for latest concurrent features and improved rendering performance
- No state management library — component-local state with `useState` is sufficient for this static-content site
- HashRouter used instead of BrowserRouter for GitHub Pages compatibility
