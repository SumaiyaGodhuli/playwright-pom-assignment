// pages/CheckoutPage.js
// Demo Web Shop uses a "One Page Checkout" with collapsible sections:
// Billing Address -> Shipping Address -> Shipping Method -> Payment Method
// -> Payment Information -> Confirm Order.
// Each section reveals itself after you click its own "Continue" button.
//
// NOTE FOR STUDENT: if the site's markup differs slightly for you, open
// DevTools (F12) on the checkout page and adjust the selectors below —
// the overall flow/logic will stay the same.

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // --- Billing address step ---
    // Using labels instead of IDs: this old site can have hidden/duplicate
    // elements sharing the same ID, so we target fields by their visible
    // label text instead, which reliably resolves to the real live field.
    this.billingFirstName = page.getByLabel('First name:');
    this.billingLastName = page.getByLabel('Last name:');
    this.billingEmail = page.getByLabel('Email:', { exact: true });
    this.billingCountry = page.getByLabel('Country:');
    this.billingCity = page.getByLabel('City:');
    this.billingAddress1 = page.getByLabel('Address 1:');
    this.billingZip = page.getByLabel('Zip / postal code:');
    this.billingPhone = page.getByLabel('Phone number:');
    this.billingContinueButton = page.locator('#billing-buttons-container input.new-address-next-step-button');

    // --- Shipping address step (often just reuses billing via checkbox) ---
    this.shippingContinueButton = page.locator('#shipping-buttons-container input.new-address-next-step-button');

    // --- Shipping method step ---
    this.shippingMethodContinueButton = page.locator('#shipping-method-buttons-container input.shipping-method-next-step-button');

    // --- Payment method step ---
    this.paymentMethodContinueButton = page.locator('#payment-method-buttons-container input.payment-method-next-step-button');

    // --- Payment info step ---
    this.paymentInfoContinueButton = page.locator('#payment-info-buttons-container input.payment-info-next-step-button');

    // --- Confirm order step ---
    this.confirmOrderButton = page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button');

    // --- Order completed page ---
    this.orderCompletedTitle = page.locator('.order-completed .title');
    this.orderNumberText = page.locator('.order-number, .details a').first();
  }

  async fillBillingAddress(user) {
    // IMPORTANT: isVisible() checks INSTANTLY with no waiting - if the page
    // hasn't finished rendering the form yet, it wrongly returns false and
    // the whole fill gets skipped. waitFor() actively waits, which is what
    // we actually need here.
    const isNewAddressForm = await this.billingFirstName
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true)
      .catch(() => false);

    if (!isNewAddressForm) {
      await this.billingContinueButton.click();
      return;
    }

    await this.billingFirstName.fill(user.firstName);
    await this.billingLastName.fill(user.lastName);
    await this.billingEmail.fill(user.email);

    // Using Bangladesh (not United States) avoids a buggy AJAX reload
    // that this old demo site triggers for US/Canada state lists.
    await this.billingCountry.selectOption({ label: 'Bangladesh' });
    await this.page.waitForTimeout(500);

    await this.billingCity.fill('Dhaka');
    await this.billingAddress1.fill('123 QA Street');
    await this.billingZip.fill('1200');
    await this.billingPhone.fill('01700000000');

    await this.billingContinueButton.click();
  }

  async clickWhenVisible(locator, timeout = 30000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async continueShippingAddress() {
    // "Ship to the same address" is checked by default on this site, which
    // means the whole Shipping Address section is SKIPPED entirely and the
    // page jumps straight to Shipping Method. So we only click this button
    // if it actually appears within a short wait; otherwise we just move on.
    try {
      await this.shippingContinueButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.shippingContinueButton.scrollIntoViewIfNeeded();
      await this.shippingContinueButton.click();
    } catch (e) {
      // Section was skipped - nothing to do here.
    }
  }

  async continueShippingMethod() {
    await this.clickWhenVisible(this.shippingMethodContinueButton);
  }

  async continuePaymentMethod() {
    await this.clickWhenVisible(this.paymentMethodContinueButton);
  }

  async continuePaymentInfo() {
    await this.clickWhenVisible(this.paymentInfoContinueButton);
  }

  async confirmOrder() {
    await this.clickWhenVisible(this.confirmOrderButton);
  }

  async isOrderCompleted() {
    await this.orderCompletedTitle.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
    return this.orderCompletedTitle.isVisible();
  }

  async completeCheckout(user) {
    // Walk through all steps one by one. Each step waits for its own
    // "Continue" button to become visible (the site reveals the next
    // section via a slow jQuery/AJAX animation) instead of a fixed sleep.
    await this.fillBillingAddress(user);
    await this.continueShippingAddress();
    await this.continueShippingMethod();
    await this.continuePaymentMethod();
    await this.continuePaymentInfo();
    await this.confirmOrder();
  }
}

module.exports = { CheckoutPage };

