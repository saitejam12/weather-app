<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because The whole product is one interactive screen — search, city-picker, weather card and an instant C/F toggle. React 19 handles type-ahead and live client-side unit conversion with no reload, and makes the responsive mobile/desktop layout straightforward. Built as a Vite SPA served from its own origin, reading VITE_API_BASE_URL.

## Consequences

A full SPA framework is slightly heavier than a vanilla page, but gives clean state management for the toggle and loading/error states; keeping temperature in Celsius in state and converting in the UI makes the toggle instant.
<!-- sdlc:auto:end adr -->