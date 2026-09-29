// pages/ProductDetailsPage.js
// The single-product page where you set quantity and click "Add to cart".

class ProductDetailsPage {
  constructor(page) {
    this.page = page;

    this.productName = page.locator('.product-name h1');
    // The quantity input's id changes per product (e.g. addtocart_63_EnteredQuantity_1),
    // so we select it generically by class instead.
    this.quantityInput = page.locator('input.qty-input').first();
    this.addToCartButton = page.locator('input[id*="add-to-cart-button"]').first();

    // Small "Product has been added!" confirmation bar that slides in
    this.addedToCartNotification = page.locator('.bar-notification.success');
  }

  async getProductName() {
    return this.productName.innerText();
  }

  async setQuantity(qty) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    // wait for the confirmation bar so we know the add-to-cart AJAX call finished
    await this.addedToCartNotification.waitFor({ state: 'visible', timeout: 15000 });
  }
}

module.exports = { ProductDetailsPage };
