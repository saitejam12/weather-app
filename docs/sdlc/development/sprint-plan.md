# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up the OpenWeatherMap integration (search + weather + caching + secret key handling), a working city search box, and graceful handling of search/provider errors.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Search for a city by name | 3 | frontend-agent | US-010 |
| US-003 | Story | Handle not-found and search errors gracefully | 3 | frontend-agent | US-001, US-010 |
| US-010 | Story | Serve live current weather from the third-party weather API | 8 | backend-agent | — |
| ↳ US-010-T1 | Task | Implement GET /api/cities/search proxy to OpenWeatherMap geocoding | — | backend-agent | — |
| ↳ US-010-T2 | Task | Implement GET /api/weather proxy to OpenWeatherMap current weather | — | backend-agent | — |
| ↳ US-010-T3 | Task | Configure server-side WEATHER_API_KEY handling | — | backend-agent | — |
| ↳ US-010-T4 | Task | Add Redis-backed caching for search and weather lookups | — | backend-agent | — |
| US-011 | Story | Stay resilient when the weather service is degraded | 5 | backend-agent | US-010 |

## Sprint 2: Sprint 2

Deliver city disambiguation, full current-weather display with details, the C/F unit toggle, scope verification, and confirmation of open public access.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-002 | Story | Disambiguate between matching cities | 5 | frontend-agent | US-001 |
| US-004 | Story | View current temperature and condition | 5 | frontend-agent | US-002, US-010 |
| US-005 | Story | View weather details | 3 | frontend-agent | US-004 |
| US-006 | Story | Confirm out-of-scope features are not present | 1 | qa-agent | US-004, US-005 |
| US-007 | Story | Toggle between Celsius and Fahrenheit | 3 | frontend-agent | US-004 |
| US-009 | Story | Open public access in English for a global audience | 2 | qa-agent | US-001 |

## Sprint 3: Sprint 3

Polish the responsive mobile and desktop layout across search and weather screens.

Capacity: 20 points · Committed: 5

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-008 | Story | Use the app on mobile and desktop browsers | 5 | frontend-agent | US-001, US-004 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
