// pages/CartPage.js

class CartPage {
  constructor(page) {
    this.page = page;

    this.cartRows = page.locator('#cart-table tbody tr, .cart-item-row');
    this.productNameInRow = (name) =>
      page.locator('tr', { hasText: name });
    this.qtyInputInRow = (name) =>
      this.productNameInRow(name).locator('input.qty-input');

    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async getProductQuantity(productName) {
    return this.qtyInputInRow(productName).inputValue();
  }

  async isProductInCart(productName) {
    return this.productNameInRow(productName).isVisible();
  }

  async agreeToTermsAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
