// playwright.config.js
// Central configuration for the whole project.
// - baseURL so tests can use relative paths like page.goto('/login')
// - two reporters: built-in HTML report + Allure report (assignment requirement)
// - screenshot/video/trace captured on failure so they land inside the reports

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },

  // Each spec file is independent, but we keep workers=1 so the 3 scenarios
  // can also be trusted to run one-after-another without clashing
  // (e.g. if you reuse the same test account). Increase if you make
  // each test use its own random data (already done below).
  fullyParallel: false,
  workers: 1,
  retries: 0,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
      detail: true,
      suiteTitle: true,
    }],
  ],

  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: true,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,

    // Attach evidence automatically -> shows up inside Allure & HTML report
    screenshot: 'on',            // screenshot after every test (pass or fail)
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
