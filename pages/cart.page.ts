import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/checkout');
    await expect(this.page.getByTestId('proceed-1')).toBeVisible();
  }

  productRow(name: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page.getByText(name, { exact: true }),
    });
  }

  async removeProduct(name: string): Promise<void> {
    await this.productRow(name).locator('a.btn-danger').click();
    await expect(this.productRow(name)).toHaveCount(0);
  }

  async proceedToSignIn(): Promise<void> {
    await this.page.getByTestId('proceed-1').click();
    await expect(this.page.getByRole('tab', { name: 'Continue as Guest' })).toBeVisible();
  }
}
