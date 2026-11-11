# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN · approved · source: development:plan

Development plan version 1 is approved. Work is organized into three sprints of 20-point capacity each, covering search/weather integration, full weather display and units/access scope, and responsive layout polish.

Plan status: approved, version 1. Sprint 1 (capacity 20): stand up OpenWeatherMap integration (search + weather + caching + secret key handling), working city search box, graceful search/provider error handling. Sprint 2 (capacity 20): city disambiguation, full current-weather display with details, C/F unit toggle, scope verification, confirmation of open public access. Sprint 3 (capacity 20): polish responsive mobile/desktop layout across search and weather screens.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011

### SPRINT-1 · approved · source: development:Sprint 1

Sprint 1 goal is to stand up the OpenWeatherMap integration, a working city search box, and graceful error handling.

Goal: Stand up the OpenWeatherMap integration (search + weather + caching + secret key handling), a working city search box, and graceful handling of search/provider errors. Capacity: 20 points. Goal text aligns with story/task scope of US-001 (city search), US-003 (search error handling), US-010 and its tasks (weather API proxy, secret key handling, Redis caching), and US-011 (resilience to degraded service) -- no explicit sprint-to-item mapping was given in the input, so this linkage is inferred from matching goal language.

**Related:** US-001, US-003, US-010, US-011

### SPRINT-2 · approved · source: development:Sprint 2

Sprint 2 goal is city disambiguation, full current-weather display with details, the C/F unit toggle, scope verification, and confirming open public access.

Goal: Deliver city disambiguation, full current-weather display with details, the C/F unit toggle, scope verification, and confirmation of open public access. Capacity: 20 points. Goal text aligns with US-002 (disambiguation), US-004/US-005 (weather display and details), US-006 (out-of-scope verification), US-007 (unit toggle), US-009 (public access/English) -- inferred from matching goal language, not an explicit mapping in the input.

**Related:** US-002, US-004, US-005, US-006, US-007, US-009

### SPRINT-3 · approved · source: development:Sprint 3

Sprint 3 goal is to polish the responsive mobile and desktop layout across search and weather screens.

Goal: Polish the responsive mobile and desktop layout across search and weather screens. Capacity: 20 points. Goal text aligns with US-008 (use the app on mobile and desktop browsers) -- inferred from matching goal language, not an explicit mapping in the input.

**Related:** US-008

### EPIC-001 · approved · source: development:EPIC-001

Epic covering city search and disambiguation functionality.

Title: City Search and Disambiguation. Points: none (epic-level, not estimated). Role: unassigned (epic container). Contains stories US-001 (search by name), US-002 (disambiguate matches), US-003 (handle not-found/search errors).

**Related:** US-001, US-002, US-003

### EPIC-002 · approved · source: development:EPIC-002

Epic covering current weather display functionality.

Title: Current Weather Display. Points: none (epic-level, not estimated). Role: unassigned (epic container). Contains stories US-004 (current temperature and condition), US-005 (weather details), US-006 (confirm out-of-scope features absent).

**Related:** US-004, US-005, US-006

### EPIC-003 · approved · source: development:EPIC-003

Epic covering the units toggle and responsive public access.

Title: Units Toggle and Responsive Public Access. Points: none (epic-level, not estimated). Role: unassigned (epic container). Contains stories US-007 (C/F toggle), US-008 (mobile/desktop use), US-009 (open public access in English).

**Related:** US-007, US-008, US-009

### EPIC-004 · approved · source: development:EPIC-004

Epic covering backend weather data integration with the third-party provider.

Title: Weather Data Integration. Points: none (epic-level, not estimated). Role: unassigned (epic container). Contains story US-010 (serve live current weather from third-party API, with sub-tasks US-010-T1 through US-010-T4) and US-011 (resilience when weather service degraded).

**Related:** US-010, US-011

### US-001 · approved · source: development:US-001

Backlog story: search for a city by name.

Title: Search for a city by name. Points: 3. Assigned role: frontend-agent.

**Related:** EPIC-001

### US-002 · approved · source: development:US-002

Backlog story: disambiguate between matching cities.

Title: Disambiguate between matching cities. Points: 5. Assigned role: frontend-agent.

**Related:** EPIC-001

### US-003 · approved · source: development:US-003

Backlog story: handle not-found and search errors gracefully.

Title: Handle not-found and search errors gracefully. Points: 3. Assigned role: frontend-agent.

**Related:** EPIC-001

### US-004 · approved · source: development:US-004

Backlog story: view current temperature and condition.

Title: View current temperature and condition. Points: 5. Assigned role: frontend-agent.

**Related:** EPIC-002

### US-005 · approved · source: development:US-005

Backlog story: view weather details.

Title: View weather details. Points: 3. Assigned role: frontend-agent.

**Related:** EPIC-002

### US-006 · approved · source: development:US-006

Backlog story: confirm out-of-scope features are not present.

Title: Confirm out-of-scope features are not present. Points: 1. Assigned role: qa-agent.

**Related:** EPIC-002

### US-007 · approved · source: development:US-007

Backlog story: toggle between Celsius and Fahrenheit.

Title: Toggle between Celsius and Fahrenheit. Points: 3. Assigned role: frontend-agent.

**Related:** EPIC-003

### US-008 · approved · source: development:US-008

Backlog story: use the app on mobile and desktop browsers.

Title: Use the app on mobile and desktop browsers. Points: 5. Assigned role: frontend-agent.

**Related:** EPIC-003

### US-009 · approved · source: development:US-009

Backlog story: open public access in English for a global audience.

Title: Open public access in English for a global audience. Points: 2. Assigned role: qa-agent.

**Related:** EPIC-003

### US-010 · approved · source: development:US-010

Backlog story: serve live current weather from the third-party weather API.

Title: Serve live current weather from the third-party weather API. Points: 8. Assigned role: backend-agent. Broken into four sub-tasks: US-010-T1 (geocoding search proxy), US-010-T2 (current weather proxy), US-010-T3 (server-side API key handling), US-010-T4 (Redis-backed caching).

**Related:** EPIC-004, US-010-T1, US-010-T2, US-010-T3, US-010-T4

### US-010-T1 · approved · source: development:US-010-T1

Sub-task: implement the city search proxy endpoint to the weather provider's geocoding API.

Title: Implement GET /api/cities/search proxy to OpenWeatherMap geocoding. Points: none (task-level, not estimated). Assigned role: backend-agent.

**Related:** US-010

### US-010-T2 · approved · source: development:US-010-T2

Sub-task: implement the current weather proxy endpoint to the weather provider.

Title: Implement GET /api/weather proxy to OpenWeatherMap current weather. Points: none (task-level, not estimated). Assigned role: backend-agent.

**Related:** US-010

### US-010-T3 · approved · source: development:US-010-T3

Sub-task: configure server-side handling of the weather API secret key.

Title: Configure server-side WEATHER_API_KEY handling. Points: none (task-level, not estimated). Assigned role: backend-agent.

**Related:** US-010

### US-010-T4 · approved · source: development:US-010-T4

Sub-task: add Redis-backed caching for search and weather lookups.

Title: Add Redis-backed caching for search and weather lookups. Points: none (task-level, not estimated). Assigned role: backend-agent.

**Related:** US-010

### US-011 · approved · source: development:US-011

Backlog story: stay resilient when the weather service is degraded.

Title: Stay resilient when the weather service is degraded. Points: 5. Assigned role: backend-agent.

**Related:** EPIC-004
<!-- sdlc:auto:end narrative -->
