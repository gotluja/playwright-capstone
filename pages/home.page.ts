import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly heading: Locator;
  readonly searchInput: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Practice Software Testing - Toolshop' });
    this.searchInput = page.getByTestId('search-query');
  }

  async open(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.heading).toBeVisible();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.page.getByTestId('search-submit').click();
  }

  productCard(name: string): Locator {
    const productName = this.page.getByTestId('product-name').getByText(name, { exact: true });
    return this.page.locator('a[data-test^="product-"]').filter({ has: productName });
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).click();
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible();
  }
}
