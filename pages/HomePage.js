// pages/HomePage.js
// Represents the home page + the header (search box, login/register links,
// cart icon) since those appear on every page of the site.

class HomePage {
  constructor(page) {
    this.page = page;

    // Header links
    this.registerLink = page.locator('.ico-register');
    this.loginLink = page.locator('.ico-login');
    this.logoutLink = page.locator('.ico-logout');
    this.miniCartLink = page.locator('.ico-cart');

    // Search box (top of every page)
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');

    // Top category menu
            this.categoryLink = (categoryName) =>
      page.locator('.top-menu').getByRole('link', { name: categoryName, exact: true });
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }

  async goToLoginPage() {
    await this.loginLink.click();
  }

  async searchProduct(keyword) {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async openCategory(categoryName) {
    await this.categoryLink(categoryName).click();
  }

  async isLoggedIn() {
    // When logged in, the header shows "LOG OUT" instead of "LOG IN"
    return this.logoutLink.isVisible();
  }
}

module.exports = { HomePage };
