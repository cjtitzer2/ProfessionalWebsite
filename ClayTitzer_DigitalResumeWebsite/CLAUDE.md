# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal, dynamic personal portfolio website showcasing Clay's career history, education, and personal mission, with planned LinkedIn integration for data synchronization. Single-user portfolio — no visitor login/auth required.

**Developer:** Clay (RPA Developer)
**AI Role:** Consultant, project manager, learning resource
**Preferred response style:** Concise and technical, code examples over lengthy explanations, RPA-aware analogies when applicable.

## Architecture

- **`ClayTitzer_DigitalResumeWebsite.Server/`** — ASP.NET Core 8 backend (net8.0). Serves the React SPA as static files in production; proxies to Vite dev server (https://localhost:5173) in development via `Microsoft.AspNetCore.SpaProxy`. Swagger/OpenAPI available at `/swagger` in dev.
- **`claytitzer_digitalresumewebsite.client/`** — React 19 + Vite 7 frontend using JSX (not TypeScript). Tailwind CSS v4 via `@tailwindcss/vite` plugin. Uses `HashRouter` from react-router-dom for client-side routing with lazy-loaded page components.
- **`ProjectMarkdownFiles/`** — Project context, resume data, and planning documents. **Before starting any work, read `ProjectMarkdownFiles/INDEX.md` and all files it references.**
- **`ClayTitzer_DigitalResumeWebsite.sln`** — Visual Studio solution tying both projects together.

## Routes (HashRouter)

```
/#/           Home — Hero section, brief intro, scroll-revealed experience/education
/#/career     Career — Work history timeline
/#/education  Education — Degrees, certifications
/#/about      About — Personal philosophy, focus areas
```

## Frontend Structure

- `src/main.jsx` — Entry point
- `src/App.jsx` — Router setup, lazy imports for all pages
- `src/pages/` — Page components: Home, Career, Education, About
- `src/components/` — Shared components: Nav, PageHeader, ScrollReveal, ScrollSpy, TimelineItem
- `src/data/resume.js` — Static resume data (experience, education, skills)
- `src/test/setup.js` — Vitest global setup (mocks IntersectionObserver)
- `src/test/helpers.jsx` — Test render helpers
- `src/index.css` — Global styles (Tailwind)

Vite `base` is set to `/ProfessionalWebsite/` (GitHub Pages deployment path).

## Development Commands

### Frontend (from `claytitzer_digitalresumewebsite.client/`)
```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Production build to dist/
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run test         # Run Vitest tests once
npm run test:watch   # Run Vitest in watch mode
```

### Backend (from `ClayTitzer_DigitalResumeWebsite.Server/`)
```bash
dotnet restore       # Restore NuGet packages
dotnet build         # Build the server
dotnet run           # Run server (port 5190 HTTP, 7075 HTTPS)
```

### Full Stack
```bash
dotnet run --project ClayTitzer_DigitalResumeWebsite.Server
# SPA proxy automatically starts the Vite dev server
```

## Test Infrastructure

- **Framework:** Vitest 4 with jsdom environment, global test APIs enabled
- **Libraries:** @testing-library/react + @testing-library/jest-dom
- **Setup:** `src/test/setup.js` provides global `IntersectionObserver` mock with `MockIntersectionObserver.trigger()` helper
- **Convention:** Test files live alongside source files as `*.test.jsx` / `*.test.js`
- **Config:** Vitest is configured inline in `vite.config.js` (no separate vitest.config)

## Code Conventions

- **Frontend:** JSX only (no TypeScript). ESLint 9 flat config with React Hooks and React Refresh plugins. Unused variables prefixed with uppercase or underscore are allowed (`varsIgnorePattern: '^[A-Z_]'`).
- **Backend:** C# with nullable reference types enabled, implicit usings.
- **Design:** Minimal UI, generous whitespace, strong typographic hierarchy. Color palette: charcoal, off-white, slate, muted blue accent. No gradients/glassmorphism. Animations: sequential fade-ins, scroll-triggered, ease-in-out 150–300ms. See `ProjectMarkdownFiles/digital_resume_design_vision.md` for full design system.

## LinkedIn Integration (Planned)

- OAuth 2.0 for owner's data sync only (no visitor auth)
- Syncs: posts, profile headline/summary, work experience, education, skills/certifications
- Data stored in local database; displays "Last synced" timestamp
- Database schema: four tables (Profile, Experience, Education, Post) — see `ProjectMarkdownFiles/PROJECT_CONTEXT (2).md`

## Open Technical Decisions

- Database choice (SQL Server, PostgreSQL, SQLite for dev)
- Hosting target (Azure, AWS, self-hosted)
- LinkedIn API tier (basic vs full partner access)
- State management (React Context, Zustand, or Redux)

## Docker

Multi-stage Windows build (`nanoserver-1809`) with Node.js 18.18.0. Ports 8080/8081.
```bash
docker build -t digitalresume -f ClayTitzer_DigitalResumeWebsite.Server/Dockerfile .
```
