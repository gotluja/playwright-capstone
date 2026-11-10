# Retail Playwright Framework

A TypeScript Playwright framework for validating customer workflows on the Practice Software Testing Toolshop demo. The base URL is configurable, so teams can point the suite at a client test environment without changing test code.

## Requirements

- Node.js 20+
- npm
- Playwright browsers installed with `npx playwright install`

## Quick start

```bash
npm ci
npx playwright install
npm test
```

Run a single browser or use the interactive runner:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:ui
```

Set `BASE_URL` to use a different environment. Credentials can be overridden with `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`:

```powershell
$env:BASE_URL = "https://your-test-environment.example"
$env:TEST_USER_EMAIL = "qa@example.com"
$env:TEST_USER_PASSWORD = "your-test-password"
npm test
```

```bash
BASE_URL=https://your-test-environment.example TEST_USER_EMAIL=qa@example.com TEST_USER_PASSWORD=your-test-password npm test
```

## Framework map

| Directory | Responsibility |
| --- | --- |
| `pages/` | Page Object Model classes with locators and user-level actions |
| `fixtures/` | Typed Playwright fixture that provides page objects per test |
| `tests/` | Business workflow and quality checks |
| `testdata/` | Reusable products and account data, with secret overrides from environment variables |
| `config/` | Environment configuration |
| `utils/` | Reusable test helpers |
| `reports/` | Generated HTML report, traces, videos, and screenshots |

## Coverage

The eight tests cover:

1. Customer login and logout
2. Unique customer registration
3. Product search with multiple data inputs
4. Add and remove a product from the cart
5. Guest checkout, payment, and order confirmation
6. Contact form invalid-email validation
7. Intercepted and mocked API response
8. Accessibility scan and visual baseline

Workflow UI tests run on Chromium, Firefox, and WebKit. Visual comparison and the axe scan are limited to Chromium to keep rendering baselines consistent and avoid duplicate findings. Axe checks use WCAG 2.0/2.1 A/AA tags and fail on serious or critical findings. The current demo has a serious accessible-name mismatch on its language selector; the accessibility test intentionally reports it rather than suppressing a product defect.

The order-placement test runs on Chromium only because it mutates inventory in the shared public demo. Run it across browsers only after pointing `BASE_URL` to an isolated test tenant with disposable data.

## Engineering decisions

- **Locators:** prefer accessible roles and labels; use the application's `data-test` attributes for stable elements without a useful accessible name. Avoid positional selectors except where the page exposes repeated product cards.
- **Synchronization:** use Playwright's auto-waiting locators and web-first assertions. No fixed sleeps or network-idle assumptions.
- **POM and fixtures:** page classes own page-specific actions; a typed fixture constructs them for each test context.
- **Test data:** business data stays out of selectors and workflows. Runtime credentials are supplied through environment variables, not committed secrets.
- **Network mocking:** the isolated mock-response test demonstrates `page.route` without depending on the demo backend's internal API contract. Apply the same pattern to a known client API endpoint when that contract is available.
- **Debugging:** on failure, the HTML report links retained traces, screenshots, and videos. Open a trace with `npx playwright show-trace <trace.zip>`.
- **Visual testing:** commit reviewed snapshots as baselines. Update them intentionally with `npx playwright test --project=chromium --update-snapshots`.
- **AI assistance:** Copilot can draft page objects and test scaffolding; review generated selectors against the running app, replace sleeps with auto-waiting assertions, keep secrets out of prompts/source, and validate changes with type-checking and browser runs.

## Reporting and maintenance

```bash
npm run typecheck
npm test
npm run test:report
```

The HTML report is written to `reports/html`; raw test artifacts are in `reports/test-results`. Both are generated outputs and are git-ignored. CI uploads the HTML report as a build artifact.
