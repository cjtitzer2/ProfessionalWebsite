# Vite

## Version
Vite 7.2.4

## Usage in Project
Vite serves as the build tool and development server for the React frontend. It provides fast HMR during development and optimized production builds.

## Configuration
- Config file: `claytitzer_digitalresumewebsite.client/vite.config.js`
- Base path: `/ProfessionalWebsite/` (for GitHub Pages deployment)
- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`
- Test integration: Vitest configured inline within `vite.config.js`

## Key Commands
- `npm run dev` — Start dev server on port 5173
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

## Key Decisions
- Vite chosen over Create React App / Webpack for faster builds and native ESM support
- SPA proxy configured in ASP.NET backend via `Microsoft.AspNetCore.SpaProxy` to forward requests to Vite dev server during development
