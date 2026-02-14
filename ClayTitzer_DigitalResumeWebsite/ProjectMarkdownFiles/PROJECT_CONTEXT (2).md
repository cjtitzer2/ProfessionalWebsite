# Digital Resume Portfolio - Project Context

## Project Overview

A minimal, dynamic personal portfolio website showcasing career history, education, and personal mission. The site will integrate with LinkedIn for data synchronization.

**Developer:** Clay (RPA Developer)
**AI Role:** Consultant, project manager, learning resource
**Development Approach:** Self-directed with AI assistance

---

## Tech Stack

### Backend
- **Framework:** ASP.NET (C#)
- **API Architecture:** RESTful endpoints
- **Authentication:** None for visitors; OAuth 2.0 only for owner's LinkedIn data sync

### Frontend
- **Framework:** React 19 + Vite 7
- **Language:** JavaScript (TypeScript types available via @types/react)
- **Design Philosophy:** Minimal, dynamic
- **Responsive:** Mobile-first approach

### External Integrations
- LinkedIn API for profile data sync

---

## Solution Structure

```
Solution 'ClayTitzer_DigitalResumeWebsite'
├── claytitzer_digitalresumewebsite.client/    # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── ClayTitzer_DigitalResumeWebsite.Server/    # ASP.NET Core API
    ├── Controllers/
    ├── Properties/
    ├── Program.cs
    ├── appsettings.json
    └── Dockerfile
```

---

## Site Architecture

```
/
├── Landing Page (/)
│   └── Hero section, brief intro, navigation
├── Career (/career)
│   └── Work history, roles, achievements
├── Education (/education)
│   └── Degrees, certifications, courses
└── Mission (/mission)
    └── Personal philosophy, goals, values
```

---

## Design Requirements

### Aesthetic
- Minimal UI with purposeful whitespace
- Dynamic elements (subtle animations, transitions)
- Dark/light theme support (optional)
- Typography-focused design

### Interactions
- Smooth page transitions
- Micro-interactions on hover/click
- Lazy loading for performance

---

## LinkedIn Integration Scope

### Architecture
- **Single-user portfolio** — no visitor login/auth required
- Owner's LinkedIn content only

### Data to Sync
- Your LinkedIn posts (text, media, engagement metrics if available)
- Profile headline and summary
- Work experience (titles, companies, dates, descriptions)
- Education history
- Skills and certifications

### Sync Strategy
- Manual trigger or scheduled background job (cron/Task Scheduler/UiPath bot)
- Store in local database to reduce API calls
- Display "Last synced" timestamp
- Consider scraping fallback if API access is restricted (LinkedIn's API is limited for personal use)

---

## Development Phases

### Phase 1: Foundation
- [ ] Project scaffolding (ASP.NET backend, frontend setup)
- [ ] Basic routing and page structure
- [ ] Database schema design

### Phase 2: Core Pages
- [ ] Landing page layout and styling
- [ ] Career detail page with timeline component
- [ ] Education page
- [ ] Mission/About page

### Phase 3: LinkedIn Integration
- [ ] OAuth 2.0 flow implementation
- [ ] API data fetching and mapping
- [ ] Sync logic and storage

### Phase 4: Polish
- [ ] Animations and transitions
- [ ] Performance optimization
- [ ] SEO and accessibility
- [ ] Deployment

---

## Database Schema (Draft)

```sql
-- Core profile data
Profile
├── id (PK)
├── headline
├── summary
├── linkedin_id
├── last_synced_at

-- Work history
Experience
├── id (PK)
├── profile_id (FK)
├── title
├── company
├── start_date
├── end_date
├── description
├── is_current

-- Education records
Education
├── id (PK)
├── profile_id (FK)
├── institution
├── degree
├── field_of_study
├── start_date
├── end_date

-- LinkedIn posts
Post
├── id (PK)
├── linkedin_post_id (unique)
├── content
├── media_url (nullable)
├── posted_at
├── likes_count
├── comments_count
├── synced_at
```

---

## Key Technical Decisions Needed

1. ~~**Frontend framework specifics**~~ — Resolved: React 19 + Vite 7
2. **Database choice** — SQL Server, PostgreSQL, SQLite for dev?
3. **Hosting target** — Azure, AWS, self-hosted?
4. **LinkedIn API tier** — Basic profile access or full partner access?
5. **State management** — React Context, Zustand, or Redux?
6. **CSS approach** — Tailwind, CSS Modules, or styled-components?

---

## AI Collaboration Guidelines

When asking for help, provide:
- Current file/code context
- Specific error messages or unexpected behavior
- What you've already tried
- Desired outcome

Preferred response style:
- Concise and technical
- Code examples over lengthy explanations
- RPA-aware analogies when applicable (workflows, orchestration, automation patterns)

---

## Notes

- Leverage RPA background for automation tasks (deployment scripts, data sync jobs)
- Consider UiPath or Python scripts for LinkedIn data processing if API limits become restrictive
- Keep components modular for future expansion

---

*Last updated: {{DATE}}*
