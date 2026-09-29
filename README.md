# Demo Web Shop Automation (Playwright + POM)

## Project Overview
UI automation for [Demo Web Shop](https://demowebshop.tricentis.com) using the Page Object Model (POM). The suite has 3 scenarios:

| Scenario | Description |
|---|---|
| Q1 | Login with invalid credentials and verify the error message |
| Q2 | Register a new user, verify login state, search a product and add it to cart |
| Q3 | Full end-to-end flow: search, add to cart and complete checkout |

## Tech Stack
- Language: JavaScript (Node.js)
- Framework: Playwright Test (`@playwright/test`)
- Design pattern: Page Object Model
- Reporting: Playwright HTML report and Allure report
- Version control: Git and GitHub (one branch per question, merged into `main`)

## Prerequisites
- Node.js 18 or later
- Git
- Java 8 or later (needed only to generate the Allure report)

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
├── pages/                 # Page Objects
├── tests/                 # Test specs (Q1, Q2, Q3)
├── utils/                 # Test data and helpers
├── playwright.config.js   # Playwright configuration
└── package.json           # Dependencies and npm scripts
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
Raw results are stored in `allure-results/` and the generated report in `allure-report/`.

## Branching Strategy
Each question was developed on its own branch and merged into `main` with `--no-ff`:
- `q1-invalid-login`
- `q2-register-cart`
- `q3-e2e-checkout`
- `feature/reporting`
- `docs/readme`

## Author
Sumaiya Godhuli