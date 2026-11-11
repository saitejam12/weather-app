# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### EPIC-001 · draft · source: requirements:EPIC-001

Entry point of the app: lets any visitor find a city by name, choose among matches when ambiguous, and handles names that can't be found. No login required.

Covers city search and disambiguation as the first thing a user does in the app. Includes US-001 (search by name), US-002 (disambiguate multiple matches), US-003 (handle not-found/search errors).

**Related:** US-001, US-002, US-003

### EPIC-002 · draft · source: requirements:EPIC-002

Shows current conditions for the chosen city: temperature, condition text + icon, humidity, wind, feels-like. Deliberately excludes multi-day forecast, favourites, and geolocation.

Covers US-004 (temperature + condition display), US-005 (weather details: humidity/wind/feels-like), US-006 (confirms out-of-scope features are absent: no forecast, no favourites, no geolocation).

**Related:** US-004, US-005, US-006

### EPIC-003 · draft · source: requirements:EPIC-003

Cross-cutting experience: Celsius/Fahrenheit toggle, responsive layout for mobile and desktop, and open public access in English with no accounts and no localisation.

Covers US-007 (unit toggle), US-008 (responsive mobile/desktop), US-009 (open public access, English-only, global audience, no login/payment).

**Related:** US-007, US-008, US-009

### EPIC-004 · draft · source: requirements:EPIC-004

Connects the app to OpenWeatherMap as the live source of current-weather and city-lookup data, including resilient handling when the service is slow, rate-limited, or unavailable.

Covers US-010 (serve live weather from OpenWeatherMap, API key dependency) and US-011 (stay resilient when weather service is degraded).

**Related:** US-010, US-011

### US-001 · draft · source: requirements:US-001

Critical story: a visitor can type a city name into a search box and submit it to look up current weather, with no account needed.

AC-001: Typing a city name and submitting it begins a lookup and shows results. AC-002: Submitting an empty search box does not perform a lookup and instead prompts the user to enter a city name. AC-003: The search box can be used freely with no login or registration required.

**Related:** EPIC-001, NFR-006

### US-002 · draft · source: requirements:US-002

High priority: when a search matches more than one city, the user picks the intended one from a disambiguated list; a single match goes straight to weather.

AC-004: When a search term matches multiple cities (e.g. same name, different country/region), the app shows the matches with enough detail (country, region/state) to tell them apart. AC-005: Selecting one of the listed cities shows its current weather. AC-006: When exactly one city matches, its weather is shown directly without a disambiguation step.

**Related:** EPIC-001

### US-003 · draft · source: requirements:US-003

High priority: clear, friendly messaging when a city can't be found or the search itself fails, instead of technical errors or a crash.

AC-007: A search matching no known city shows a friendly not-found message inviting the user to try a different spelling/name, with no technical error shown. AC-008: If the weather data service is unavailable or errors out during a search, the app shows a clear error message and lets the user retry, without crashing or exposing raw technical details.

**Related:** EPIC-001, NFR-005, NFR-006

### US-004 · draft · source: requirements:US-004

Critical story: once a city is selected, the app shows city name, current temperature, and a text condition with matching icon, with a loading state while data is fetched.

AC-009: After selecting a city, the app displays the city name, current temperature, and a text condition (e.g. sunny, rainy) with a matching weather icon. AC-010: While weather data for the selected city has not yet arrived, the app shows a loading indication rather than a blank or broken screen.

**Related:** EPIC-002, NFR-006

### US-005 · draft · source: requirements:US-005

High priority: alongside temperature, the app shows humidity, wind, and feels-like for a fuller picture of current conditions.

AC-011: Displayed weather includes humidity, wind, and feels-like values for the selected city. AC-012: If a specific detail (humidity, wind, or feels-like) is not provided by the weather source, it is omitted or clearly marked unavailable rather than shown blank or misleading.

**Related:** EPIC-002

### US-006 · draft · source: requirements:US-006

Low priority scope-confirmation story: the MVP intentionally has no multi-day forecast, no saved favourites, and no geolocation-based lookup.

AC-013: Reviewing available features on the weather display confirms there is no multi-day forecast, no saved favourites, and no geolocation-based lookup, consistent with the agreed current-weather-only scope.

**Related:** EPIC-002

### US-007 · draft · source: requirements:US-007

High priority: users can switch between Celsius and Fahrenheit, with all temperature values updating immediately and the choice persisting for the session.

AC-014: Toggling the unit switch updates all displayed temperature and feels-like values immediately. AC-015: The last-selected unit is carried over when searching for or selecting another city in the same session.

**Related:** EPIC-003, NFR-003

### US-008 · draft · source: requirements:US-008

High priority: the app adapts to mobile and desktop browser screen sizes as a responsive web app, with no native app install required.

AC-016: On a small mobile screen, search and weather results adapt with readable text and usable controls, no horizontal scrolling or overlapping elements. AC-017: On a desktop browser, the layout adapts to the larger screen and stays readable and usable. AC-018: The app is delivered as a responsive web app requiring no native mobile app installation.

**Related:** EPIC-003, NFR-007

### US-009 · draft · source: requirements:US-009

Medium priority: any visitor worldwide can open and use the app in English, free of charge, with no account, login, or payment step.

AC-019: A new visitor can immediately search for a city with no login, registration, payment, or billing step. AC-020: The UI is presented in English from any region, with no region-specific rules or restrictions. Assumption noted in requirements: audience is global with English-only UI and no localisation beyond the Celsius/Fahrenheit toggle.

**Related:** EPIC-003, NFR-002, NFR-008

### US-010 · draft · source: requirements:US-010

Critical story: weather shown to users is sourced live from OpenWeatherMap, authenticated server-side via a secret API key never exposed to the browser.

AC-021: Temperature, condition, icon, humidity, wind, and feels-like values are sourced from the live OpenWeatherMap API. Assumption noted: OpenWeatherMap is the chosen current-weather source for this version. AC-022: The app authenticates to the weather API using a configured WEATHER_API_KEY that is not exposed to end users. Assumption noted: a valid OpenWeatherMap API key is provisioned via WEATHER_API_KEY.

**Related:** EPIC-004, NFR-001

### US-011 · draft · source: requirements:US-011

Medium priority: when the weather provider is slow, unreachable, or rate-limited, the app informs the user clearly and allows retry rather than breaking.

AC-023: If the weather API is unreachable, times out, or errors, the app shows a clear, non-technical error message and lets the user retry. AC-024: If the weather API reports its request limit reached, the app communicates that weather data is temporarily unavailable and invites the user to try again later, rather than showing a raw error.

**Related:** EPIC-004, NFR-004, NFR-005, NFR-006

### NFR-001 · draft · source: requirements:NFR-001

Security requirement: the OpenWeatherMap API key must stay server-side only and never reach the browser.

The weather provider API key must be held only on the server and used to authenticate calls to OpenWeatherMap; it must never be sent to or exposed in the browser. Applies to US-010.

**Related:** US-010

### NFR-002 · draft · source: requirements:NFR-002

Privacy requirement: no accounts, no login, no stored personal data — anonymous use only.

The app requires no login, registration, payment or billing and stores no personal information about visitors; anyone can use it anonymously. Applies to US-009.

**Related:** US-009

### NFR-003 · draft · source: requirements:NFR-003

Performance requirement: unit toggle must update all temperature values instantly without a page reload.

When the user switches between Celsius and Fahrenheit, all displayed temperature and feels-like values must update immediately without reloading the page. Applies to US-007.

**Related:** US-007

### NFR-004 · draft · source: requirements:NFR-004

Performance requirement: cache recent lookups for a few minutes to stay fast and within provider rate limits.

Recent city and weather lookups must be cached for a few minutes so the app stays fast for popular searches and stays within the weather provider's request limits. Applies to US-010, US-011.

**Related:** US-010, US-011

### NFR-005 · draft · source: requirements:NFR-005

Availability requirement: app must keep working and show clear retry messaging when the weather service is degraded.

When the weather service is slow, unreachable, rate-limited or returns an error, the app must stay working, show a clear message and let the user retry, rather than crashing or leaving a broken page. Applies to US-003, US-011.

**Related:** US-003, US-011

### NFR-006 · draft · source: requirements:NFR-006

Usability requirement: messages must be clear, friendly, and non-technical; loading state shown while data is fetched.

Not-found results and failures must be shown as clear, friendly messages that invite the user to try again or try a different spelling, never showing raw technical details. While weather is loading, the app shows a loading indication rather than a blank or broken screen. Applies to US-003, US-004, US-011.

**Related:** US-003, US-004, US-011

### NFR-007 · draft · source: requirements:NFR-007

Compatibility requirement: responsive design for mobile and desktop with no native app install.

The app must adapt to small mobile and larger desktop browser screens with readable text and usable controls, no horizontal scrolling or overlapping elements, and must work as a web app with no native app installation. Applies to US-008.

**Related:** US-008

### NFR-008 · draft · source: requirements:NFR-008

Accepted-risk requirement: English-only interface, no localisation beyond the unit toggle, for a global audience.

The interface is presented in English only for a global audience, with no region-specific rules or localisation beyond the Celsius/Fahrenheit toggle; other languages and regional formats are deliberately left out of this version. Applies to US-009. Flagged in requirements as an accepted risk.

**Related:** US-009

### REQ-STACK · approved · source: requirements:tech-stack

Technology stack approved by the product owner for this lightweight-scope app: FastAPI backend, AWS cloud, PostgreSQL database, React frontend.

Backend: FastAPI 0.115 — thin proxy between browser and weather provider, keeps WEATHER_API_KEY secret, forwards city-search and weather lookups. Cloud: AWS — reliable, globally reachable hosting that scales to near-zero when quiet and absorbs spikes without server management; platform default. Database: PostgreSQL 16 — app stores no user data currently (no accounts, favourites, or history), so DB sits mostly idle; provisioned as the safe default for future use (e.g. remembered searches or logging). Frontend: React 19 — handles the single interactive screen (search box, city-picker, weather card with instant-updating Celsius/Fahrenheit toggle) and the responsive mobile/desktop layout.

**Related:** US-001, US-004, US-007, US-010

### REQ-SERVICES · approved · source: requirements:services

Runtime services approved by the product owner: OpenWeatherMap for weather/city data, Redis for caching.

Weather: OpenWeatherMap (custom, env WEATHER_API_KEY) — supplies current temperature, condition, icon, humidity, wind, feels-like, and the city geocoding powering search-and-disambiguate; assumed provider per project notes. Cache: Redis (container redis:7-alpine) — caches recent city/weather lookups for a few minutes to keep the app fast, reduce API cost, and protect against free-tier rate limits when many users search popular cities at once. Required API keys/env vars: REDIS_URL, WEATHER_API_KEY.

**Related:** US-002, US-010, US-011, NFR-004
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
