# React Router

## Version
React Router DOM 7.13.0

## Usage in Project
Provides client-side routing for the SPA. All navigation between pages is handled without full page reloads.

## Configuration
- Router type: `HashRouter` (chosen for GitHub Pages static hosting compatibility)
- Routes defined in: `claytitzer_digitalresumewebsite.client/src/App.jsx`

## Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Hero, current role, education preview |
| `/career` | `Career` | Full work history timeline |
| `/education` | `Education` | Education timeline |
| `/skills` | `Skills` | Technical skills grid |
| `/about` | `About` | Bio, philosophy, focus areas |
| `/contact` | `Contact` | Contact info and form |
| `*` | `NotFound` | 404 fallback |

## Key Patterns
- `NavLink` used in `Nav.jsx` for active link styling (`isActive` callback)
- `Link` used for in-page navigation buttons
- `end` prop on home route NavLink to prevent matching on all routes
- All page components are lazy-loaded via `React.lazy()`

## Testing
- Tests use `MemoryRouter` via `renderWithRouter` helper in `test/helpers.jsx`
- This avoids HashRouter side effects during testing
