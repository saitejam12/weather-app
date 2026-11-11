# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `13cb2c3` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated scaffold for a small weather app, built as two independent pieces in one repo: a Vite + React 19 single-page frontend with approved, reviewed screens (currently rendering seeded sample data, not live API calls), and a FastAPI 0.115 backend that currently exposes only a /health endpoint plus the plumbing (SQLAlchemy models/database session, CORS, router package) for future endpoints. The approved architecture targets PostgreSQL and Redis in production, but the backend defaults to a local SQLite file so it runs with no external services for local development.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm, Vite 6, TypeScript 5.6, Playwright)
- Python 3.12 (matches backend/Dockerfile)
- pip
- Docker and Docker Compose (optional, for Postgres/Redis via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in any values it defines
3. cd frontend && npm install
4. cd backend && pip install -r requirements.txt
5. (optional) from the repo root, run docker compose up -d to start Postgres and Redis if testing against real services
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `cd frontend && npm run preview` | Serves the built frontend locally |
| backend dev | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI service with auto-reload, creating SQLite tables on startup |
| docker compose | `docker compose up -d` | Starts Postgres 16 and Redis 7 containers defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | VS Code/devcontainer configuration |
| `.quorq` | Quorq platform metadata (handoff.json) |
| `backend` | FastAPI service: app code, tests, Dockerfile, dependency and lint config |
| `backend/app` | Application package: main entrypoint, database session, SQLAlchemy models, Pydantic schemas, routers package |
| `backend/tests` | Pytest tests (e.g. health check) with shared fixtures in conftest.py |
| `frontend` | Vite + React SPA: source, e2e tests, config |
| `frontend/src` | App source: entrypoint (main.tsx), shared lib (api client, UI components, icons, navigation), styles |
| `frontend/e2e` | Playwright acceptance tests run against the built app or a deployed URL |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one router per architecture component under app/routers, each stubbed route returning a typed StubResponse until implemented
- Backend: all SQLAlchemy models inherit app.database.Base; tables are created at app startup via the FastAPI lifespan handler, not migrations
- Backend: DATABASE_URL env var selects the database, defaulting to local SQLite; ALLOWED_ORIGINS env var (comma-separated) configures CORS, defaulting to the Vite dev server origins
- Backend: pytest.ini sets pythonpath = . so tests import the app package directly; linting/formatting via ruff (ruff.toml)
- Frontend: path alias @/* maps to src/*; screens are intended to live under src/screens/ with App.tsx as the route table (per frontend/README.md), using src/lib/ui.tsx and src/lib/icons.tsx as the shared component/icon vocabulary
- Frontend: all API access goes through src/lib/api.ts's apiFetch helper, which attaches a bearer token (session token if present, else the shared API secret) and reads VITE_API_BASE_URL
- Frontend: component tests sit beside the components they test and match src/**/*.{test,spec}.{ts,tsx}; Playwright specs live separately in e2e/ and match *.spec.ts
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests under src/ |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the frontend; this is the gate the platform runs during development |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit (not run by npm run build) |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests; builds/serves the backend and frontend locally unless E2E_BASE_URL is set. Run npm run test:e2e:install first to fetch Chromium |
| backend tests | `cd backend && pytest` | Runs the backend's pytest suite (e.g. health check) with coverage via pytest-cov |
| backend lint | `cd backend && ruff check .` | Lints the backend with ruff |
| backend format check | `cd backend && ruff format .` | Formats backend code with ruff |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend calls to the backend fail with a CORS error in the browser console | Set ALLOWED_ORIGINS on the backend to include the frontend's origin (defaults to http://localhost:5173 and http://127.0.0.1:5173 in dev) |
| npm run build succeeds but the app has type errors | npm run build does not typecheck; run npm run typecheck (tsc --noEmit) separately |
| Playwright e2e tests fail to start the backend | The e2e config expects a Python venv at backend/.venv with dependencies installed (python -m uvicorn app.main:app); ensure that venv exists before running npm run test:e2e |
| Backend fails to connect to a database | By default DATABASE_URL is unset and the app uses a local sqlite:///./app.db file with no server required; only set DATABASE_URL to point at Postgres if that server is actually running (e.g. via docker compose up -d) |
| pytest can't import app when run from an unexpected directory | Run pytest from the backend/ directory so pytest.ini's pythonpath = . applies |
<!-- sdlc:auto:end troubleshooting -->
