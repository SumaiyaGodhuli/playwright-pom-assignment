// tests/q1-invalid-login.spec.js
// Q1 (10 marks): Attempt to log in using an invalid email/password
// combination. Verify that the appropriate error message is displayed
// and the user is NOT logged in.

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Q1 - Invalid Login', () => {
  test('should show error message and not log in with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await homePage.goto();
      await homePage.goToLoginPage();
      await expect(page).toHaveURL(/.*login/);
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login('invalid_user_qa@notreal.com', 'WrongPassword123');
    });

    await test.step('Verify error message is displayed', async () => {
      const errorText = await loginPage.getErrorText();
      // Demo Web Shop's actual message is "Login was unsuccessful... No customer account found"
      expect(errorText.toLowerCase()).toContain('unsuccessful');
    });

    await test.step('Verify user is NOT logged in', async () => {
      const loggedIn = await homePage.isLoggedIn();
      expect(loggedIn).toBeFalsy();
      // Login page should still be showing the login form, not the account page
      await expect(page).toHaveURL(/.*login/);
    });

    // Screenshot evidence for the report
    await page.screenshot({ path: 'test-results/screenshots/q1-invalid-login.png', fullPage: true });
  });
});
