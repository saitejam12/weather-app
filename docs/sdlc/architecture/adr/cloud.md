<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-11

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because A free public weather page needs globally reachable hosting that scales down when quiet and absorbs spikes without managing servers. AWS (CloudFront/S3 for the SPA, a scale-to-near-zero container for the API, ElastiCache/RDS) covers this and is the platform default.

## Consequences

Serverless/containerised services can have cold-start latency when idle, mitigated by caching popular lookups in Redis.
<!-- sdlc:auto:end adr -->