<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- None (stateless)
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Provisioned as the approved safe default should remembered searches or logging be added later. In this scope it stores nothing and sits idle, consistent with no-accounts/no-personal-data.

## Consequences

Carries a small idle cost now, but avoids a later migration and keeps the stack consistent; the smallest instance is enough.
<!-- sdlc:auto:end adr -->