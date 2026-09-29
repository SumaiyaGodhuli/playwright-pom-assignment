// tests/q3-e2e-search-checkout.spec.js
// Q3 (25 marks) - End to End:
// Product Search -> verify correct product appears in results -> open product
// -> increase quantity -> add to cart -> agree to terms -> checkout
// -> complete order -> confirm order -> see order details.

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { newUser } = require('../utils/testData');

const SEARCH_KEYWORD = 'computer';
const QUANTITY = 3;

test.describe('Q3 - E2E Search to Order Confirmation', () => {
  test('should search, add product, checkout and confirm order', async ({ page }) => {
    // A logged-in account keeps checkout simple (billing form is prefilled-able).
    // Each test run registers its own fresh user so the test is independently runnable.
    const user = newUser();
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Register (auto-logs-in on this site)', async () => {
      await homePage.goto();
      await homePage.goToRegisterPage();
      await registerPage.registerNewUser(user);
      await homePage.goto();
      expect(await homePage.isLoggedIn()).toBeTruthy();
    });

    let productName;

    await test.step('Search for a product and verify it appears in results', async () => {
      await homePage.searchProduct(SEARCH_KEYWORD);
      const isVisible = await searchResultsPage.productItems.first().isVisible();
      expect(isVisible).toBeTruthy();
      productName = (await searchResultsPage.getFirstProductName()).trim();
    });

    await test.step('Open the product and increase quantity', async () => {
      await searchResultsPage.openFirstProduct();
      await expect(page.locator('.product-name h1')).toHaveText(productName);
      await productPage.setQuantity(QUANTITY);
    });

    await test.step('Add product to cart', async () => {
      await productPage.addToCart();
    });

    await test.step('Go to cart, agree to terms, and checkout', async () => {
      await cartPage.goto();
      expect(await cartPage.isProductInCart(productName)).toBeTruthy();
      await cartPage.agreeToTermsAndCheckout();
      await expect(page).toHaveURL(/.*onepagecheckout|.*checkout/);
    });

    await test.step('Complete the checkout steps', async () => {
      await checkoutPage.completeCheckout(user);
    });

    await test.step('Verify order confirmation / order details are shown', async () => {
      const completed = await checkoutPage.isOrderCompleted();
      expect(completed).toBeTruthy();
    });

    await page.screenshot({ path: 'test-results/screenshots/q3-order-confirmed.png', fullPage: true });
  });
});