import { expect, type Locator, type Page } from '@playwright/test';

export class ContactPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Contact' })).toBeVisible();
  }

  async submit(): Promise<void> {
    await this.page.getByRole('button', { name: 'Send' }).click();
  }

  get emailInput(): Locator {
    return this.page.getByTestId('email');
  }
}
