# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack digital resume/portfolio website: ASP.NET Core 8 backend serving a React 19 SPA frontend built with Vite.

## Architecture

- **`ClayTitzer_DigitalResumeWebsite.Server/`** — C# ASP.NET Core 8 backend. Serves the React SPA as static files in production and proxies to the Vite dev server in development.
- **`claytitzer_digitalresumewebsite.client/`** — React 19 frontend using Vite 7 and JSX (not TypeScript). Entry point is `src/main.jsx`.
- **`ClayTitzer_DigitalResumeWebsite.sln`** — Solution file that ties both projects together.

The backend's `Program.cs` configures SPA static file serving with fallback to `index.html` for client-side routing. In development, requests to the frontend are proxied to `https://localhost:5173` (Vite dev server).

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
Run the solution from the root with `dotnet run --project ClayTitzer_DigitalResumeWebsite.Server` — the SPA proxy will automatically start the Vite dev server.

## Code Conventions

- **Frontend:** JSX (not TypeScript), ESLint 9 flat config with React Hooks and React Refresh plugins. Unused variables prefixed with uppercase or underscore are allowed.
- **Backend:** C# with nullable reference types enabled, implicit usings. Swagger/OpenAPI enabled for API documentation at `/swagger`.

## Docker

Multi-stage Windows build (`nanoserver-1809`) with Node.js 18.18.0. Exposes ports 8080 (HTTP) and 8081 (HTTPS).

```bash
docker build -t digitalresume -f ClayTitzer_DigitalResumeWebsite.Server/Dockerfile .
```
