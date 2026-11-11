# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal: stand up the OpenWeatherMap integration, a working city search box, and graceful error handling.

Goal: stand up the OpenWeatherMap integration (search + weather + caching + secret key handling), a working city search box, and graceful handling of search/provider errors. Capacity: 20 points.

**Related:** EPIC-001, EPIC-004

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal: city disambiguation, full weather display, C/F toggle, scope verification, public-access confirmation.

Goal: deliver city disambiguation, full current-weather display with details, the C/F unit toggle, scope verification, and confirmation of open public access. Capacity: 20 points.

**Related:** EPIC-001, EPIC-002, EPIC-003

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 goal: polish the responsive mobile and desktop layout across search and weather screens.

Goal: polish the responsive mobile and desktop layout across search and weather screens. Capacity: 20 points.

**Related:** EPIC-003

### PLAN-EPIC-001 · approved · source: plan:EPIC-001

Planning item for City Search and Disambiguation epic (unassigned role, no points).

Tracked as a planning container for US-001, US-002, US-003.

**Related:** EPIC-001

### PLAN-EPIC-002 · approved · source: plan:EPIC-002

Planning item for Current Weather Display epic (unassigned role, no points).

Tracked as a planning container for US-004, US-005, US-006.

**Related:** EPIC-002

### PLAN-EPIC-003 · approved · source: plan:EPIC-003

Planning item for Units Toggle and Responsive Public Access epic (unassigned role, no points).

Tracked as a planning container for US-007, US-008, US-009.

**Related:** EPIC-003

### PLAN-EPIC-004 · approved · source: plan:EPIC-004

Planning item for Weather Data Integration epic (unassigned role, no points).

Tracked as a planning container for US-010, US-011.

**Related:** EPIC-004

### PLAN-US-001 · approved · source: plan:US-001

Search for a city by name -- planned for frontend-agent, 3 points.

Assigned role: frontend-agent. Points: 3.

**Related:** US-001, SPRINT-1

### PLAN-US-002 · approved · source: plan:US-002

Disambiguate between matching cities -- planned for frontend-agent, 5 points.

Assigned role: frontend-agent. Points: 5.

**Related:** US-002, SPRINT-2

### PLAN-US-003 · approved · source: plan:US-003

Handle not-found and search errors gracefully -- planned for frontend-agent, 3 points.

Assigned role: frontend-agent. Points: 3.

**Related:** US-003, SPRINT-1

### PLAN-US-004 · approved · source: plan:US-004

View current temperature and condition -- planned for frontend-agent, 5 points.

Assigned role: frontend-agent. Points: 5.

**Related:** US-004, SPRINT-2

### PLAN-US-005 · approved · source: plan:US-005

View weather details -- planned for frontend-agent, 3 points.

Assigned role: frontend-agent. Points: 3.

**Related:** US-005, SPRINT-2

### PLAN-US-006 · approved · source: plan:US-006

Confirm out-of-scope features are not present -- planned for qa-agent, 1 point.

Assigned role: qa-agent. Points: 1.

**Related:** US-006, SPRINT-2

### PLAN-US-007 · approved · source: plan:US-007

Toggle between Celsius and Fahrenheit -- planned for frontend-agent, 3 points.

Assigned role: frontend-agent. Points: 3.

**Related:** US-007, SPRINT-2

### PLAN-US-008 · approved · source: plan:US-008

Use the app on mobile and desktop browsers -- planned for frontend-agent, 5 points.

Assigned role: frontend-agent. Points: 5.

**Related:** US-008, SPRINT-3

### PLAN-US-009 · approved · source: plan:US-009

Open public access in English for a global audience -- planned for qa-agent, 2 points.

Assigned role: qa-agent. Points: 2.

**Related:** US-009, SPRINT-2

### PLAN-US-010 · approved · source: plan:US-010

Serve live current weather from the third-party weather API -- planned for backend-agent, 8 points, broken into 4 tasks.

Assigned role: backend-agent. Points: 8. Subtasks:
- US-010-T1: Implement GET /api/cities/search proxy to OpenWeatherMap geocoding (backend-agent).
- US-010-T2: Implement GET /api/weather proxy to OpenWeatherMap current weather (backend-agent).
- US-010-T3: Configure server-side WEATHER_API_KEY handling (backend-agent).
- US-010-T4: Add Redis-backed caching for search and weather lookups (backend-agent).

**Related:** US-010, SPRINT-1

### PLAN-US-011 · approved · source: plan:US-011

Stay resilient when the weather service is degraded -- planned for backend-agent, 5 points.

Assigned role: backend-agent. Points: 5.

**Related:** US-011, SPRINT-1
<!-- sdlc:auto:end narrative -->
