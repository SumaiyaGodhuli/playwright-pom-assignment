
# Demo Web Shop — UI Automation (Part A)

Playwright + Page Object Model (POM) automation for
[https://demowebshop.tricentis.com/](https://demowebshop.tricentis.com/), with
Allure and HTML reporting.

## 1. What's inside

```
demowebshop-automation/
├── pages/                      # Page Object classes (one per page)
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── SearchResultsPage.js
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── q1-invalid-login.spec.js          (Q1 - 10 marks)
│   ├── q2-register-add-to-cart.spec.js   (Q2 - 15 marks)
│   └── q3-e2e-search-checkout.spec.js    (Q3 - 25 marks, E2E)
├── utils/
│   └── testData.js             # generates a fresh random user each run
├── playwright.config.js
├── package.json
└── README.md
```

Each test file is fully independent (it creates its own random user with
`utils/testData.js`, so re-running never clashes with "email already
registered" errors), and all three run correctly one after another too.

## 2. Prerequisites

- Node.js 18 or newer installed on your PC ([nodejs.org](https://nodejs.org))
- Internet connection (tests run against the live demowebshop.tricentis.com site)

## 3. Setup (do this once)

```bash
# 1. Unzip the project, then open a terminal inside the folder
cd demowebshop-automation

# 2. Install dependencies
npm install

# 3. Install Playwright's browsers
npx playwright install
```

## 4. Running the tests

Run all 3 scenarios together (sequentially):
```bash
npm test
```

Run one scenario at a time:
```bash
npm run test:q1     # Invalid login
npm run test:q2     # Register + add to cart
npm run test:q3     # Full E2E: search -> cart -> checkout -> order confirmation
```

Run with the browser visible (useful while learning/debugging):
```bash
npm run test:headed
```

## 5. Generating reports

**Playwright's built-in HTML report** (auto-generated after every run in
`playwright-report/`):
```bash
npm run report:html
```
This opens a browser tab with pass/fail results, screenshots, and traces.

**Allure report:**
```bash
npm run allure:generate
npm run allure:open
```
- `allure-results/` is the raw data Playwright writes during the run
  (already configured in `playwright.config.js`).
- `allure:generate` turns it into a viewable static report in `allure-report/`.
- `allure:open` serves it in your browser.

> Allure needs Java installed on your machine (Allure commandline requires a
> JRE). If `npx allure` complains it can't find Java, install a JRE
> (e.g. Adoptium Temurin 17) and try again.

Screenshots are captured automatically for every test (`screenshot: 'on'` in
`playwright.config.js`), plus each spec file also takes one explicit
full-page screenshot at its final verification step
(saved under `test-results/screenshots/`). All of these show up embedded
inside both the HTML report and the Allure report automatically.

## 6. If a locator doesn't match on your run

The live demo site can occasionally change small details in its HTML. If a
test fails immediately on an element not found:
1. Run with `--headed` so you can see the browser.
2. Right-click the element in question → Inspect (DevTools) → check its
   `id`/`class`.
3. Update the matching locator inside the relevant file in `pages/`.

The test logic (steps/flow) will not need to change — only the selector.

## 7. Notes on Q3 (checkout)

Demo Web Shop's checkout is a multi-step "One Page Checkout" (Billing
Address → Shipping Address → Shipping Method → Payment Method → Payment
Info → Confirm Order), each step revealed after clicking its own
"Continue" button. `pages/CheckoutPage.js` walks through all of these in
`completeCheckout()`. If your account already has a saved address, the
billing-address form fields won't appear — the code detects this and
simply clicks Continue.

