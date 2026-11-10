import { test, expect } from '../fixtures/test';
import { products } from '../testdata/products';

test('product search returns matching products', async ({ homePage }) => {
  await homePage.open();

  for (const query of products.searchTerms) {
    await homePage.search(query);
    await expect(homePage.productCard(query).first()).toBeVisible();
  }
});

test('customer can add and remove a product from the cart', async ({ homePage, productPage, cartPage }) => {
  await homePage.open();
  await homePage.openProduct(products.cart.name);
  await productPage.expectProduct(products.cart.name);
  await productPage.addToCart();

  await cartPage.open();
  await expect(cartPage.productRow(products.cart.name)).toContainText(products.cart.price);
  await cartPage.removeProduct(products.cart.name);
});
