import { expect, type Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async expectProduct(name: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible();
  }

  async addToCart(quantity = 1): Promise<void> {
    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      throw new RangeError('Quantity must be a positive safe integer.');
    }

    if (quantity !== 1) {
      await this.page.getByRole('spinbutton', { name: 'Quantity' }).fill(String(quantity));
    }
    const addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();
    await expect(this.page.getByRole('alert')).toContainText('Product added to shopping cart');
  }
}
