import { test, expect } from '../fixtures/test';
import { accounts } from '../testdata/accounts';
import { registrationData } from '../testdata/registration';
import { uniqueEmail } from '../utils/unique-email';

test('customer can sign in and sign out', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.login(accounts.valid.email, accounts.valid.password);

  await expect(page.getByRole('button', { name: accounts.valid.displayName })).toBeVisible();
  await expect(page).toHaveURL(/\/account/);
  await loginPage.logout(accounts.valid.displayName);
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
});

test('customer can register a new account', async ({ page, registrationPage }) => {
  await registrationPage.open();
  await registrationPage.register({
    ...registrationData,
    email: uniqueEmail('signup'),
  });

  await expect(page).toHaveURL(/\/auth\/login/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
