# Framework architecture — presentation notes

## Slide 1 — Outcome

- Validate retail journeys across Chromium, Firefox, and WebKit.
- Keep account, storefront, checkout, and contact workflows readable and repeatable.
- Produce actionable failure artifacts instead of relying on console-only output.

## Slide 2 — Test architecture

`tests` describe business behavior → `fixtures` inject typed page objects → `pages` model page-level locators/actions → `testdata` supplies reusable inputs.

Each test receives an isolated Playwright context. The environment URL and credentials are configured outside the source.

## Slide 3 — Reliability choices

- Prefer role/label selectors and stable app test IDs.
- Rely on Playwright auto-waiting and web-first assertions.
- Keep tests independent; avoid shared mutable accounts and fixed sleeps.
- Mock only controlled dependencies, and keep client API contracts explicit.
- Run order placement once against the shared demo; use an isolated tenant for parallel browser order tests.

## Slide 4 — Quality and diagnostics

- Chromium/Firefox/WebKit workflow runs.
- axe-core WCAG A/AA scan and reviewed Chromium visual baseline.
- HTML report, failure screenshot, retained trace, and video for diagnosis.
- CI artifacts make results available after each workflow run.

## Slide 5 — Extension plan

- Add client-specific API mocks and order confirmation checks when the test API contract is available.
- Add role-based data and isolated account provisioning for concurrent runs.
- Review accessibility and visual baselines with product owners before updating snapshots.
- Use Copilot for drafts, then manually review locator stability, privacy, and assertions.
