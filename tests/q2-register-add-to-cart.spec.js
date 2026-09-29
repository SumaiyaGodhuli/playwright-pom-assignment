// tests/q2-register-add-to-cart.spec.js
// Q2 (15 marks): Register a new customer -> log in -> navigate to a product
// category -> select a product -> add it to the shopping cart -> verify the
// correct product and quantity appear in the cart.

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');
const { CartPage } = require('../pages/CartPage');
const { newUser } = require('../utils/testData');

const CATEGORY = 'Books';
const QUANTITY = 2;

test.describe('Q2 - Register + Add Product to Cart', () => {
  test('should register, log in, add a product to cart with correct quantity', async ({ page }) => {
    const user = newUser();
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await test.step('Register a new customer', async () => {
      await homePage.goto();
      await homePage.goToRegisterPage();
      await registerPage.registerNewUser(user);
      const successText = await registerPage.getSuccessText();
      expect(successText).toContain('Your registration completed');
    });

    await test.step('Verify the account is already logged in (Demo Web Shop auto-logs-in after registration)', async () => {
      await homePage.goto();
      expect(await homePage.isLoggedIn()).toBeTruthy();
    });

    let productName;

    await test.step('Navigate to a product category and select a product', async () => {
      await homePage.openCategory(CATEGORY);
      productName = await searchResultsPage.getFirstProductName();
      await searchResultsPage.openFirstProduct();
      await expect(page.locator('.product-name h1')).toHaveText(productName.trim());
    });

    await test.step('Set quantity and add product to cart', async () => {
      await productPage.setQuantity(QUANTITY);
      await productPage.addToCart();
    });

    await test.step('Verify correct product and quantity appear in the cart', async () => {
      await cartPage.goto();
      expect(await cartPage.isProductInCart(productName.trim())).toBeTruthy();
      const qtyInCart = await cartPage.getProductQuantity(productName.trim());
      expect(Number(qtyInCart)).toBe(QUANTITY);
    });

    await page.screenshot({ path: 'test-results/screenshots/q2-cart-verified.png', fullPage: true });
  });
});
