# Demo Web Shop Automation (Playwright + POM)

## Project Overview
UI automation for [Demo Web Shop](https://demowebshop.tricentis.com) using the Page Object Model (POM). The suite has 3 scenarios:

| Scenario | Description |
|---|---|
| Q1 | Login with invalid credentials and verify the error message |
| Q2 | Register a new user, verify login state, search a product and add it to cart |
| Q3 | Full end-to-end flow: search, add to cart and complete checkout |

Each test creates its own random user (`utils/testData.js`), so re-running never fails with "email already registered".

## Tech Stack
- Language: JavaScript (Node.js)
- Framework: Playwright Test (`@playwright/test`)
- Design pattern: Page Object Model
- Reporting: Playwright HTML report and Allure report
- Version control: Git and GitHub (one branch per question, merged into `main`)

## Prerequisites
- Node.js 18 or later
- Git
- Internet connection (tests run against the live demo site)
- Java 8 or later (only needed to generate the Allure report)

## Setup
```bash
git clone https://github.com/SumaiyaGodhuli/playwright-pom-assignment.git
cd playwright-pom-assignment/demowebshop-automation
npm install
npx playwright install
```

## Project Structure
```
demowebshop-automation/
├── pages/                  # Page Objects (Home, Login, Register, SearchResults,
│                           #   ProductDetails, Cart, Checkout)
├── tests/
│   ├── q1-invalid-login.spec.js
│   ├── q2-register-add-to-cart.spec.js
│   └── q3-e2e-search-checkout.spec.js
├── utils/ 
├── api-tests/              # Postman collection (Newman)                 # Test data generator
├── playwright.config.js    # Playwright configuration
└── package.json            # Dependencies and npm scripts
```

## Running the Scenarios

### Run each scenario individually
```bash
npm run test:q1
npm run test:q2
npm run test:q3
```

### Run all scenarios together
```bash
npm test
```

### Run in headed mode (visible browser)
```bash
npm run test:headed
```

## Generating the Report

### Playwright HTML report
```bash
npm test
npm run report:html
```

### Allure report
```bash
npm test
npm run allure:generate
npm run allure:open
```
Raw results are stored in `allure-results/` and the generated report in `allure-report/`. Screenshots are captured automatically and appear inside both reports.

## API Tests (Part C)

API automation is in the `api-tests/` folder. It is a Postman collection run from the command line with Newman, against https://jsonplaceholder.typicode.com/users.

The collection has 2 requests:
1. GET all users: validates status 200, non-empty array, and that each user has id, name and email. It saves one user ID.
2. PUT update user: uses the saved ID in `/users/{id}`, updates only name, email and company.name with dynamic data, and validates status 200, same ID, phone not empty and updated name.

### Run the API tests only
```bash
npm run test:api
```

### Run UI and API tests together (in sequence)
```bash
npm run test:all
```

### API reports
- HTML report: `api-tests/reports/api-report.html`
- Allure: API results are written to `allure-results/`, so UI and API show together:
```bash
npm run allure:generate
npm run allure:open
```


## Troubleshooting
If a test fails on "element not found", run `npm run test:headed`, inspect the element in DevTools, and update the locator in the matching file inside `pages/`.

## Branching Strategy
Each question was developed on its own branch and merged into `main` with `--no-ff`:
- `q1-invalid-login`
- `q2-register-cart`
- `q3-e2e-checkout`
- `feature/reporting`
- `docs/readme`

## Author
Sumaiya Godhuli - [GitHub](https://github.com/SumaiyaGodhuli)