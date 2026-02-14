# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal, dynamic personal portfolio website showcasing Clay's career history, education, and personal mission, with LinkedIn integration for data synchronization. Single-user portfolio — no visitor login/auth required.

**Developer:** Clay (RPA Developer)
**AI Role:** Consultant, project manager, learning resource
**Preferred response style:** Concise and technical, code examples over lengthy explanations, RPA-aware analogies when applicable.

## Architecture

- **`ClayTitzer_DigitalResumeWebsite.Server/`** — ASP.NET Core 8 backend. Serves the React SPA as static files in production and proxies to the Vite dev server in development.
- **`claytitzer_digitalresumewebsite.client/`** — React 19 frontend using Vite 7 and JSX (not TypeScript). Entry point is `src/main.jsx`.
- **`ProjectMarkdownFiles/`** — Project context, resume data, and planning documents. **Before starting any work, read `ProjectMarkdownFiles/INDEX.md` and all files it references.** New files are added here regularly.
- **`ClayTitzer_DigitalResumeWebsite.sln`** — Solution file that ties both projects together.

The backend's `Program.cs` configures SPA static file serving with fallback to `index.html` for client-side routing. In development, requests to the frontend are proxied to `https://localhost:5173` (Vite dev server).

## Site Structure

```
/ Landing Page — Hero section, brief intro, navigation
/career       — Work history, roles, achievements (timeline component)
/education    — Degrees, certifications, courses
/mission      — Personal philosophy, goals, values
```

## LinkedIn Integration

- OAuth 2.0 for owner's data sync only (no visitor auth)
- Syncs: posts, profile headline/summary, work experience, education, skills/certifications
- Data stored in local database to reduce API calls; displays "Last synced" timestamp
- Sync triggered manually or via scheduled job (cron/Task Scheduler/UiPath bot)

## Database Schema

Four core tables: `Profile` (headline, summary, linkedin_id, last_synced_at), `Experience` (title, company, dates, description), `Education` (institution, degree, field_of_study, dates), `Post` (linkedin_post_id, content, media_url, engagement metrics, synced_at). See `ProjectMarkdownFiles/PROJECT_CONTEXT (2).md` for full schema.

## Open Technical Decisions

- Database choice (SQL Server, PostgreSQL, SQLite for dev)
- Hosting target (Azure, AWS, self-hosted)
- LinkedIn API tier (basic vs full partner access)
- State management (React Context, Zustand, or Redux)
- CSS approach (Tailwind, CSS Modules, or styled-components)

## Development Phases

1. **Foundation** — Scaffolding, basic routing, database schema design
2. **Core Pages** — Landing, career timeline, education, mission pages
3. **LinkedIn Integration** — OAuth 2.0 flow, API fetching, sync logic
4. **Polish** — Animations, performance, SEO/accessibility, deployment

## Development Commands

### Frontend (from `claytitzer_digitalresumewebsite.client/`)
```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server (port 5173)
npm run build      # Production build to dist/
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend (from `ClayTitzer_DigitalResumeWebsite.Server/`)
```bash
dotnet restore     # Restore NuGet packages
dotnet build       # Build the server
dotnet run         # Run server (port 5190 HTTP, 7075 HTTPS)
```

### Full Stack
Run from root: `dotnet run --project ClayTitzer_DigitalResumeWebsite.Server` — the SPA proxy automatically starts the Vite dev server.

## Code Conventions

- **Frontend:** JSX (not TypeScript), ESLint 9 flat config with React Hooks and React Refresh plugins. Unused variables prefixed with uppercase or underscore are allowed.
- **Backend:** C# with nullable reference types enabled, implicit usings. Swagger/OpenAPI at `/swagger`.
- **Design:** Minimal UI, purposeful whitespace, typography-focused. Smooth transitions, micro-interactions, lazy loading.

## Docker

Multi-stage Windows build (`nanoserver-1809`) with Node.js 18.18.0. Ports 8080/8081.

```bash
docker build -t digitalresume -f ClayTitzer_DigitalResumeWebsite.Server/Dockerfile .
```
