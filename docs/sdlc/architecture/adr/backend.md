<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Express
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because A thin proxy is needed to keep WEATHER_API_KEY off the browser and to forward geocoding and weather calls as clean JSON. FastAPI 0.115 is lightweight, async-friendly for calling an external API, and quick to build this small surface in.

## Consequences

Running a server adds an operational component versus calling the provider directly from the browser, but that is unavoidable to protect the API key (NFR-001) and to apply caching and error mapping centrally.
<!-- sdlc:auto:end adr -->