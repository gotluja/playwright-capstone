import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.getByLabel('Email address *').fill(email);
    await this.page.getByLabel('Password *').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async logout(displayName: string): Promise<void> {
    await this.page.getByRole('button', { name: displayName }).click();
    await this.page.getByTestId('nav-sign-out').click();
  }
}
