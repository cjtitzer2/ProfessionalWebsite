# ASP.NET Core

## Version
.NET 8.0 (ASP.NET Core 8)

## Usage in Project
The ASP.NET Core backend serves as the host for the React SPA and provides the API layer. Currently minimal — primarily serves static files and provides SPA fallback routing.

## Configuration
- Entry point: `ClayTitzer_DigitalResumeWebsite.Server/Program.cs`
- Project file: `ClayTitzer_DigitalResumeWebsite.Server.csproj`
- Solution file: `ClayTitzer_DigitalResumeWebsite.sln`

## Middleware Pipeline
1. HTTPS redirection
2. Default files (`UseDefaultFiles`)
3. Static files (`UseStaticFiles`)
4. Authorization
5. Controller mapping
6. SPA fallback (`MapFallbackToFile("index.html")`)

## NuGet Packages
- `Microsoft.AspNetCore.SpaProxy` — Proxies dev requests to Vite dev server (port 5173)
- `Swashbuckle.AspNetCore` — Swagger/OpenAPI documentation (dev only)

## Development
- HTTP: `http://localhost:5190`
- HTTPS: `https://localhost:7075`
- Swagger UI available at `/swagger` in development mode

## Current State
The backend currently hosts only the SPA static files. The `WeatherForecastController` is template boilerplate. Future plans include database integration and LinkedIn OAuth.
