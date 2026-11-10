import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ContactPage } from '../pages/contact.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { RegistrationPage } from '../pages/registration.page';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactPage: ContactPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  contactPage: async ({ page }, use) => use(new ContactPage(page)),
});

export { expect };
