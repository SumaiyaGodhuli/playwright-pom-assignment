// pages/SearchResultsPage.js
// The page shown after using the top search box, and also the page shown
// after clicking a category (both use the same product-grid layout).

class SearchResultsPage {
  constructor(page) {
    this.page = page;

    this.productItems = page.locator('.product-item');
    this.productTitleByName = (name) =>
      page.locator('.product-item', { hasText: name }).locator('h2.product-title a');
  }

  async isProductVisible(productName) {
    return this.productTitleByName(productName).first().isVisible();
  }

  async openProduct(productName) {
    await this.productTitleByName(productName).first().click();
  }

  async openFirstProduct() {
    await this.productItems.first().locator('h2.product-title a').click();
  }

  async getFirstProductName() {
    return this.productItems.first().locator('h2.product-title a').innerText();
  }
}

module.exports = { SearchResultsPage };
