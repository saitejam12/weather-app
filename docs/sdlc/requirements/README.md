# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:technology-stack

Product owner approved an exact technology stack for this lightweight app; the design must not substitute alternatives.

- Backend: FastAPI 0.115 -- thin proxy to keep WEATHER_API_KEY off the browser and forward city-search/weather calls as clean JSON.
- Cloud: AWS -- free/public page needs globally reachable hosting that scales to near-zero and is the platform default.
- Database: PostgreSQL 16 -- scope stores no user data, so DB sits mostly idle now; safe default if favourites/history are added later.
- Frontend: React 19 -- one interactive screen (search, city-picker, weather card, instant C/F toggle) needing type-ahead and live updates without reload.

### REQ-SERVICES · approved · source: requirements:services

Two runtime services approved: OpenWeatherMap for weather/geocoding data, Redis for caching lookups.

- Weather: OpenWeatherMap (custom, env WEATHER_API_KEY) -- supplies temperature, condition, icon, humidity, wind, feels-like, and city geocoding for search/disambiguation.
- Cache: Redis (container redis:7-alpine) -- caches recent lookups for a few minutes to keep the app fast and stay within the weather provider's call limits.
- Required API keys/env vars: REDIS_URL, WEATHER_API_KEY.

**Related:** REQ-STACK, US-010, US-011

### EPIC-001 · draft · source: requirements:EPIC-001

Entry point to the app: find a city by name, choose among matches, and handle names that cannot be found. No login or account required.

Covers city search, disambiguation when a name matches multiple places, and friendly handling of not-found/error cases.

**Related:** US-001, US-002, US-003

### US-001 · draft · source: requirements:US-001

Critical story: visitor types a city name into a search box and submits it to look up current weather.

- AC-001: Typing a name and submitting begins showing matching results.
- AC-002: Empty search box does not perform a lookup; user is prompted to enter a name.
- AC-003: No account or login is ever required to search.

**Related:** EPIC-001

### US-002 · draft · source: requirements:US-002

High-priority story: when a search matches more than one city, the user picks the intended one.

- AC-004: Multiple matches are shown with enough detail (country, region/state) to tell them apart.
- AC-005: Selecting a listed city shows its current weather.
- AC-006: Exactly one match shows weather directly, with no disambiguation step.

**Related:** EPIC-001

### US-003 · draft · source: requirements:US-003

High-priority story: clear, friendly messaging when a city can't be found or the search fails.

- AC-007: No matching city produces a friendly not-found message inviting a different spelling/name, never a technical error.
- AC-008: If the weather data service is unavailable or errors, a clear error message lets the user retry without crashing or exposing technical details.

**Related:** EPIC-001, NFR-005, NFR-006

### EPIC-002 · draft · source: requirements:EPIC-002

Shows current conditions for the chosen city: temperature, condition with icon, humidity, wind, feels-like. Current weather only -- no forecast, favourites, or geolocation.

Deliberately scoped to current weather for a searched city; explicitly excludes multi-day forecast, saved favourites, and geolocation-based lookup.

**Related:** US-004, US-005, US-006

### US-004 · draft · source: requirements:US-004

Critical story: display current temperature and condition with icon for a selected city, with a loading indicator while data loads.

- AC-009: Displays city name, current temperature, text condition (e.g. sunny, rainy) and a matching icon.
- AC-010: Shows a loading indication while data is being retrieved, rather than a blank/broken screen.

**Related:** EPIC-002, NFR-006

### US-005 · draft · source: requirements:US-005

High-priority story: show humidity, wind and feels-like alongside temperature for a fuller picture.

- AC-011: Humidity, wind, and feels-like values are shown for the selected city.
- AC-012: Any value not provided by the data source is omitted or clearly marked unavailable, never shown blank or misleading.

**Related:** EPIC-002

### US-006 · draft · source: requirements:US-006

Low-priority scope-confirmation story: app must stay limited to current weather for a searched city.

- AC-013: No multi-day forecast, no saved favourites, no geolocation-based lookup -- consistent with the agreed MVP scope.

**Related:** EPIC-002

### EPIC-003 · draft · source: requirements:EPIC-003

Cross-cutting experience: Celsius/Fahrenheit toggle, English-only UI for a global audience, open public access, responsive layout.

No accounts, no region-specific rules, no localisation beyond the unit toggle; must work on mobile and desktop browsers.

**Related:** US-007, US-008, US-009

### US-007 · draft · source: requirements:US-007

High-priority story: switch displayed temperatures between Celsius and Fahrenheit.

- AC-014: Switching the toggle updates all temperature and feels-like values immediately.
- AC-015: The last-selected unit is remembered for newly searched/selected cities in the same session.

**Related:** EPIC-003, NFR-003

### US-008 · draft · source: requirements:US-008

High-priority story: app adapts to mobile and desktop screen sizes.

- AC-016: Small mobile screens get a readable, usable layout with no horizontal scrolling or overlap.
- AC-017: Desktop screens remain readable and usable.
- AC-018: Delivered as a responsive web app; no native mobile app install required.

**Related:** EPIC-003, NFR-007

### US-009 · draft · source: requirements:US-009

Medium-priority story: open public access in English, no account or payment, for a global audience.

- AC-019: New visitors can search immediately -- no login, registration, payment or billing step.
- AC-020: UI is presented in English worldwide with no region-specific rules; assumption is English-only with no localisation beyond the C/F toggle.

**Related:** EPIC-003, NFR-002, NFR-008

### EPIC-004 · draft · source: requirements:EPIC-004

Connects the app to OpenWeatherMap as the live data source, including API key handling and resilience when the provider is degraded.

Covers both the integration itself and graceful degradation (slow/rate-limited/unavailable provider).

**Related:** US-010, US-011

### US-010 · draft · source: requirements:US-010

Critical story: weather shown must come from the live OpenWeatherMap API, authenticated server-side.

- AC-021: Temperature, condition, icon, humidity, wind, feels-like all sourced from OpenWeatherMap (assumption: OpenWeatherMap chosen for this version).
- AC-022: App authenticates to the provider using a configured WEATHER_API_KEY never exposed to end users (assumption: a valid key is provisioned via WEATHER_API_KEY).

**Related:** EPIC-004, NFR-001, NFR-004

### US-011 · draft · source: requirements:US-011

Medium-priority story: app behaves sensibly when the weather service is slow or unavailable.

- AC-023: Unreachable/timeout/error responses from the provider produce a clear, non-technical message with a retry option.
- AC-024: Rate-limit responses are communicated as temporary unavailability, inviting a later retry, rather than a raw error.

**Related:** EPIC-004, NFR-004, NFR-005, NFR-006

### NFR-001 · draft · source: requirements:NFR-001

Security: the weather API key must stay server-side only.

WEATHER_API_KEY is held only on the server and used to authenticate OpenWeatherMap calls; it must never be sent to or exposed in the browser.

**Related:** US-010

### NFR-002 · draft · source: requirements:NFR-002

Privacy: no accounts or personal data are collected.

No login, registration, payment or billing; no personal information about visitors is stored; usage is anonymous.

**Related:** US-009

### NFR-003 · draft · source: requirements:NFR-003

Performance: unit toggle must update instantly.

Switching Celsius/Fahrenheit updates all displayed temperature and feels-like values immediately, without a page reload.

**Related:** US-007

### NFR-004 · draft · source: requirements:NFR-004

Performance: cache recent lookups for a few minutes.

Caching recent city and weather lookups keeps the app fast for popular searches and keeps calls within the weather provider's request limits.

**Related:** US-010, US-011

### NFR-005 · draft · source: requirements:NFR-005

Availability: app must stay usable when the weather service is degraded.

Slow, unreachable, rate-limited, or erroring weather service must still result in a working app: clear message plus retry, never a crash or broken page.

**Related:** US-003, US-011

### NFR-006 · draft · source: requirements:NFR-006

Usability: messages must be clear and non-technical.

Not-found and failure messages are friendly and invite retry/different spelling, never raw technical details; a loading indicator is shown while weather data is in flight.

**Related:** US-003, US-004, US-011

### NFR-007 · draft · source: requirements:NFR-007

Compatibility: responsive on mobile and desktop, no native app required.

Adapts to small mobile and larger desktop browser screens with readable text, usable controls, no horizontal scrolling or overlap; runs as a web app with no native installation.

**Related:** US-008

### NFR-008 · draft · source: requirements:NFR-008

Compliance (accepted risk): English-only UI, no localisation.

Interface is English only for a global audience; no region-specific rules or localisation beyond the Celsius/Fahrenheit toggle -- other languages/regional formats are deliberately out of scope for this version.

**Related:** US-009
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-11

**Capabilities in scope:** City name search box, City disambiguation (pick the intended city), Current weather display: temperature and condition text + icon, Weather details: humidity, wind and feels-like, Celsius / Fahrenheit toggle, Graceful not-found and error handling for city names, Responsive layout for mobile and desktop browsers, OpenWeatherMap as the live current-weather source, Open public access with no login or accounts

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | You need a small server to sit between the browser and the weather provider — mainly to keep your WEATHER_API_KEY secret (it must never ship to the browser) and to forward city-search and weather lookups. FastAPI is lightweight, fast to build this thin proxy in, and well suited to calling an external API and returning clean JSON. |
| cloud | AWS | A free, public weather page needs reliable, globally reachable hosting that scales down to near-nothing when quiet and absorbs occasional traffic spikes without you managing servers. AWS covers all of that and is the platform's default, so it's the least-friction way to get your responsive app online for a worldwide audience. |
| database | PostgreSQL | Your confirmed scope stores nothing about users — no accounts, no favourites, no history — so the app can run with effectively no database at all. PostgreSQL is the right choice if you ever add remembered searches or logging, and it's the safe default to have provisioned; for now it will sit mostly idle. |
| frontend | React | Your whole product is one interactive screen: a search box, a city-picker when names are ambiguous, and a weather card with a Celsius/Fahrenheit toggle that must update instantly without reloading. React handles exactly this kind of type-ahead-and-live-update behaviour and makes the responsive mobile/desktop layout you asked for straightforward. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: City Search and Disambiguation

Lets any visitor find a city by typing its name, choose the intended city when several match, and handle names that cannot be found. This is the entry point to the whole app: no login or account is required to use it.

### US-001: Search for a city by name

**Priority:** critical

> As a member of the public, I want to type a city name into a search box and submit it, so that I can look up the current weather for that city.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | the app is open and no city has been searched yet | I type a city name into the search box and submit it | the app looks up matching cities and begins showing results for that name |
| AC-002 | the search box is empty | I attempt to submit the search | the app does not perform a lookup and prompts me to enter a city name |
| AC-003 | I am using the app with no account or login | I open the app and use the search box | I can search freely without being asked to sign in or register |

### US-002: Disambiguate between matching cities

**Priority:** high

> As a user searching for a city, I want to choose the intended city when my search matches more than one place, so that I see weather for the exact location I meant.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | my search term matches more than one city (for example the same name in different countries or regions) | the results are returned | the app presents the matching cities with enough detail to tell them apart, such as country and region/state |
| AC-005 | a list of matching cities is shown | I select one of them | the app shows the current weather for the selected city |
| AC-006 | my search term matches exactly one city | the result is returned | the app shows that city's current weather directly without asking me to choose |

### US-003: Handle not-found and search errors gracefully

**Priority:** high

> As a user searching for a city, I want a clear message when my city cannot be found or the search fails, so that I understand what happened and can try again.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I search for a name that matches no known city | the lookup returns no results | the app shows a clear, friendly not-found message and invites me to try a different spelling or name, without showing a technical error |
| AC-008 | the city lookup cannot be completed because the weather data service is unavailable or returns an error | I perform a search | the app shows a clear error message and lets me retry, without crashing or showing raw technical details |

## EPIC-002: Current Weather Display

Shows the current conditions for the chosen city: temperature, a text condition with a matching icon, and common details including humidity, wind and feels-like. Scope is deliberately current weather only — no multi-day forecast, no saved favourites and no geolocation.

### US-004: View current temperature and condition

**Priority:** critical

> As a user who has chosen a city, I want to see the current temperature and a text condition with a matching icon, so that I can quickly understand the weather right now in that city.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I have searched for and selected a city | the current weather loads | the app displays the city name, the current temperature, and a text condition (for example sunny or rainy) accompanied by a matching weather icon |
| AC-010 | current weather is being retrieved for a selected city | the data has not yet arrived | the app shows a loading indication rather than a blank or broken screen |

### US-005: View weather details

**Priority:** high

> As a user viewing a city's current weather, I want to see humidity, wind and feels-like alongside the temperature, so that I get a fuller picture of the current conditions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | current weather is displayed for a selected city | I look at the weather details | the app shows humidity, wind and feels-like values for that city |
| AC-012 | a specific detail value (humidity, wind or feels-like) is not provided by the weather data source for the selected city | the weather is displayed | the app omits or clearly marks that value as unavailable rather than showing a blank or misleading figure |

### US-006: Confirm out-of-scope features are not present

**Priority:** low

> As a product owner, I want the app to stay limited to current weather for a searched city, so that the MVP matches the agreed scope.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | a city's current weather is displayed | I review the available features | there is no multi-day forecast, no saved favourites and no geolocation-based lookup, consistent with the agreed current-weather-only scope |

## EPIC-003: Units Toggle and Responsive Public Access

Cross-cutting experience: a Celsius/Fahrenheit toggle, an English UI serving a global audience with no region-specific rules, open public access with no accounts, and a responsive layout that works on mobile and desktop browsers.

### US-007: Toggle between Celsius and Fahrenheit

**Priority:** high

> As a user viewing current weather, I want to switch temperature between Celsius and Fahrenheit, so that I can read temperatures in the unit I prefer.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | current weather is displayed with a temperature and a feels-like value | I switch the unit toggle between Celsius and Fahrenheit | all temperature values update immediately to the selected unit |
| AC-015 | I have selected a temperature unit | I search for or select another city in the same session | the newly displayed weather uses the unit I last selected |

### US-008: Use the app on mobile and desktop browsers

**Priority:** high

> As a user on any device, I want the app to adapt to my screen size, so that I can search and read weather comfortably on mobile or desktop.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I open the app on a small mobile browser screen | I use the search box and view weather results | the layout adapts to the small screen with readable text and usable controls, without horizontal scrolling or overlapping elements |
| AC-017 | I open the app on a desktop browser | I use the search box and view weather results | the layout adapts to the larger screen and remains readable and usable |
| AC-018 | the app is delivered as a responsive web app | a user accesses it | no native mobile app installation is required to use it |

### US-009: Open public access in English for a global audience

**Priority:** medium

> As a member of the general public anywhere in the world, I want to open and use the app freely in English without any account or payment, so that I can check any city's weather at no cost and without barriers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | I am a new visitor | I open the app | I can immediately search for a city with no login, registration, payment or billing step |
| AC-020 | I am using the app from any region | I view the UI and search for cities worldwide | the interface is presented in English and applies no region-specific rules or restrictions. Assumption: the audience is global with an English-only UI and no localisation beyond the Celsius/Fahrenheit toggle. |

## EPIC-004: Weather Data Integration

Connects the app to OpenWeatherMap as the live source of current-weather and city-lookup data. Covers the API key dependency and resilient handling when the external service is slow, rate-limited or unavailable.

### US-010: Serve live current weather from the third-party weather API

**Priority:** critical

> As a user, I want the weather shown to come from a live third-party weather source, so that the current conditions I see are accurate and up to date.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | I select a city | the app retrieves its current weather | the temperature, condition, icon, humidity, wind and feels-like values are sourced from the live third-party weather API (OpenWeatherMap). Assumption: OpenWeatherMap is the chosen current-weather source for this version. |
| AC-022 | the app is deployed | it calls the weather API | it authenticates using a configured WEATHER_API_KEY that is not exposed to end users. Assumption: a valid OpenWeatherMap API key is provisioned via a WEATHER_API_KEY setting. |

### US-011: Stay resilient when the weather service is degraded

**Priority:** medium

> As a user, I want the app to behave sensibly when the weather service is slow or unavailable, so that I am informed rather than left with a broken page.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | the weather API is unreachable, times out, or returns an error | I perform a search or select a city | the app shows a clear, non-technical error message and lets me retry |
| AC-024 | the weather API indicates the request limit has been reached | I attempt a lookup | the app communicates that weather data is temporarily unavailable and invites me to try again later, rather than showing a raw error |
<!-- sdlc:auto:end epics -->
