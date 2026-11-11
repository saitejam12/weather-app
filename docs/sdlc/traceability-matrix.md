# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Search for a city by name | US-001 | 1 | GET /api/cities/search, frontend | — | — | pending | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Disambiguate between matching cities | US-002 | 2 | GET /api/cities/search, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Handle not-found and search errors gracefully | US-003 | 1 | GET /api/cities/search, api, frontend | — | — | pending | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-002 | View current temperature and condition | US-004 | 2 | GET /api/weather, api, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-002 | View weather details | US-005 | 2 | GET /api/weather, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-002 | Confirm out-of-scope features are not present | US-006 | 2 | frontend | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-007 | EPIC-003 | Toggle between Celsius and Fahrenheit | US-007 | 2 | frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-003 | Use the app on mobile and desktop browsers | US-008 | 3 | frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-009 | EPIC-003 | Open public access in English for a global audience | US-009 | 2 | api, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-004 | Serve live current weather from the third-party weather API | US-010, US-010-T1, US-010-T2, US-010-T3, US-010-T4 | 1 | GET /api/cities/search, GET /api/health, GET /api/weather, api, cache, weather_provider | — | — | pending | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-004 | Stay resilient when the weather service is degraded | US-011 | 1 | GET /api/cities/search, GET /api/weather, api, weather_provider | — | — | pending | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
