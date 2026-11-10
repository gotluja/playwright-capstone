import { test, expect } from '../fixtures/test';

test('contact form rejects an invalid email address', async ({ page, contactPage }) => {
  await contactPage.open();
  await page.getByLabel('First name').fill('Alex');
  await page.getByLabel('Last name').fill('Tester');
  await contactPage.emailInput.fill('not-an-email');
  await page.getByLabel('Subject').selectOption({ label: 'Customer service' });
  await page.getByLabel('Message *').fill('I need help with a recent order and would appreciate a status update.');
  await expect(contactPage.emailInput).toHaveClass(/ng-invalid/);
  await contactPage.submit();
});
