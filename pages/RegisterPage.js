// pages/RegisterPage.js

class RegisterPage {
  constructor(page) {
    this.page = page;

    this.genderMale = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');

    this.registerSuccessMessage = page.locator('.result');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async registerNewUser(user) {
    await this.genderMale.check();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }

  async getSuccessText() {
    await this.registerSuccessMessage.waitFor({ state: 'visible' });
    return this.registerSuccessMessage.innerText();
  }
}

module.exports = { RegisterPage };
