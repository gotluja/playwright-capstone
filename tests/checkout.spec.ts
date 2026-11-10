import { test } from '../fixtures/test';
import { checkoutData } from '../testdata/checkout';
import { products } from '../testdata/products';
import { uniqueEmail } from '../utils/unique-email';

test('customer can place an order through guest checkout', async ({
  homePage,
  productPage,
  cartPage,
  checkoutPage,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Order placement mutates the shared demo inventory.');
  await homePage.open();
  await homePage.openProduct(products.available.name);
  await productPage.addToCart();
  await cartPage.open();
  await cartPage.proceedToSignIn();

  await checkoutPage.continueAsGuest({
    ...checkoutData.guest,
    email: uniqueEmail(),
  });
  await checkoutPage.enterBillingAddress(checkoutData.address);
  await checkoutPage.submitPayment(checkoutData.paymentMethod);
  await checkoutPage.confirmOrder();
});
