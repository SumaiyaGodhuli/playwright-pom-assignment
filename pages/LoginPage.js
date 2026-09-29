// pages/LoginPage.js

class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');

    // Error shown for wrong email/password combination
    this.errorMessage = page.locator('.message-error, .validation-summary-errors');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorText() {
    await this.errorMessage.first().waitFor({ state: 'visible' });
    return this.errorMessage.first().innerText();
  }
}

module.exports = { LoginPage };
