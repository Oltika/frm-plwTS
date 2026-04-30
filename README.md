# Spanish Word Flip Flash

A small React + Vite app that helps you learn essential Spanish words with flip cards. Includes unit tests (Vitest), end-to-end tests (Playwright), and a Jenkins pipeline using Docker.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS + shadcn UI
- Vitest (unit tests)
- Playwright (E2E tests)
- Jenkins (Docker agent)

## Requirements
- Node.js 20+ (Node 22 recommended)
- npm 9+

## Getting Started
1. Install dependencies:
   ```bash
   npm i
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   - Default dev URL: http://localhost:8080


## Scripts
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`
- Unit tests (Vitest): `npm run test:unit`
- E2E tests (Playwright):
  - Headless CI run: `npm run test:e2e`
  - Headed UI: `npm run test:e2e:ui`
  - Update snapshots: `npm run test:e2e:update`
  - Open last HTML report: `npm run test:e2e:report`

## End-to-End Testing (Playwright)
Playwright is configured in `playwright.config.ts`.
- Base URL: overridable via `E2E_BASE_URL` (defaults to `http://localhost:8080`).
- Dev server auto-starts/stops if `E2E_BASE_URL` is the default.
- Reports:
  - JUnit: `reports-e2e/junit.xml`
  - HTML: `reports-e2e/html`
- On failure: trace, screenshot, and video are retained in the HTML report.

Common commands:
```bash
# Run full e2e suite (all browsers) in headless CI mode
npm run test:e2e

# Only Chromium, headed (browser visible)
E2E_BASE_URL=http://localhost:8080 \
  npm run test:e2e -- --project=chromium --headed

# Slow motion (set once via env)
SLOW_MO=400 E2E_BASE_URL=http://localhost:8080 \
  npm run test:e2e -- --project=chromium --headed

# Open the last HTML report
npm run test:e2e:report
```

Data-test IDs are used throughout for stable selectors in E2E tests:
- `data-testid="card"`, `data-testid="card-inner"`
- `data-testid="prev-btn"`, `data-testid="next-btn"`, `data-testid="random-btn"`
- `data-testid="counter"`

## Unit Testing (Vitest)
- Config: `vitest.config.ts`
- Example test: `src/lib/utils.test.ts` for the `cn` helper.

Run:
```bash
npm run test:unit
```

## Jenkins (Docker) Pipeline
A `Jenkinsfile` is included with three stages using a Dockerized Node agent.
- Agent image: `node:22-alpine`
- Stages:
  1. build: `npm ci` + `npm run build`
  2. test: executes unit tests (Vitest)
  3. deploy: mocked, prints a success message

Environment variables for Jenkins:
- `E2E_BASE_URL=http://localhost:8080`

Note: If you wish to run E2E in Jenkins, add steps to install Playwright browsers and run `npm run test:e2e -- --project=chromium`, then archive `reports-e2e/**` and publish JUnit from `reports-e2e/junit.xml`.

## Build
```bash
npm run build
```
Outputs to `dist/`.

## Troubleshooting
- Port 8080 in use: kill existing dev server, e.g. `npx kill-port 8080`.
- Playwright slow-mo: set `SLOW_MO=400` (ms) env var.

## License
MIT
