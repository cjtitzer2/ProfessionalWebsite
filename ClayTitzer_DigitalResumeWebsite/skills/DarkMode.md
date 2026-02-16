# Dark Mode

## Implementation
Dark mode is implemented using CSS custom property overrides triggered by a `dark` class on the `<html>` element. This approach allows all existing Tailwind utility classes to automatically adapt without any per-component changes.

## Architecture

### CSS Layer (`index.css`)
- Light theme: Colors defined in `@theme` block (Tailwind v4 syntax)
- Dark theme: Colors overridden in `html.dark` selector
- Body transitions: `background-color` and `color` use 300ms ease transitions for smooth switching

### Component (`ThemeToggle.jsx`)
- Toggle button with sun/moon SVG icons
- Renders in the Nav bar
- Uses `useState` initialized from stored preference or system preference
- Applies `dark` class to `document.documentElement` via `useEffect`

### Persistence
- Theme stored in `localStorage` under key `theme`
- Values: `"dark"` or `"light"`
- localStorage wrapped in try/catch for private browsing compatibility

### System Preference Detection
- Uses `window.matchMedia('(prefers-color-scheme: dark)')` as fallback
- Only consulted when no valid stored preference exists

## File Locations
- CSS variables: `claytitzer_digitalresumewebsite.client/src/index.css`
- Toggle component: `claytitzer_digitalresumewebsite.client/src/components/ThemeToggle.jsx`
- Embedded in: `claytitzer_digitalresumewebsite.client/src/components/Nav.jsx`

## Accessibility
- Button has dynamic `aria-label`: "Switch to dark/light mode"
- SVG icons have `aria-hidden="true"`

## Testing
- `ThemeToggle.test.jsx` covers: toggle behavior, localStorage persistence, restoration, invalid values, ARIA labels, SVG accessibility
- `matchMedia` mocked in `test/setup.js`
