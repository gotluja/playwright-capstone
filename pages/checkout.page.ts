import { expect, type Page } from '@playwright/test';

type GuestDetails = {
  email: string;
  firstName: string;
  lastName: string;
};

type BillingAddress = {
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
};

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async continueAsGuest(details: GuestDetails): Promise<void> {
    await this.page.getByRole('tab', { name: 'Continue as Guest' }).click();
    await this.page.getByTestId('guest-email').fill(details.email);
    await this.page.getByLabel('First name *').fill(details.firstName);
    await this.page.getByLabel('Last name *').fill(details.lastName);
    await this.page.getByRole('button', { name: 'Continue as Guest' }).click();
    await expect(
      this.page.getByText(`Continuing as guest: ${details.firstName} ${details.lastName}`, { exact: true }),
    ).toBeVisible();
    await this.page.getByTestId('proceed-2-guest').click();
    await expect(this.page.getByRole('heading', { name: 'Billing Address' })).toBeVisible();
  }

  async enterBillingAddress(address: BillingAddress): Promise<void> {
    await this.page.getByTestId('country').selectOption({ label: address.country });
    await this.page.getByTestId('postal_code').fill(address.postalCode);
    await this.page.getByTestId('house_number').fill(address.houseNumber);
    await this.page.getByTestId('street').fill(address.street);
    await this.page.getByTestId('city').fill(address.city);
    await this.page.getByTestId('state').fill(address.state);
    await this.page.getByTestId('proceed-3').click();
    await expect(this.page.getByTestId('payment-method')).toBeVisible();
  }

  async submitPayment(method: string): Promise<void> {
    await this.page.getByTestId('payment-method').selectOption({ label: method });
    const paymentCheck = this.page.waitForResponse(response =>
      response.url().endsWith('/payment/check') && response.request().method() === 'POST',
    );
    await this.page.getByTestId('finish').click();
    const response = await paymentCheck;
    if (!response.ok()) {
      throw new Error(`Payment check failed with HTTP ${response.status()}`);
    }
    await expect(this.page.getByText('Payment was successful')).toBeVisible();
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await expect(this.page.getByText(/Thanks for your order!/)).toBeVisible();
    await expect(this.page.getByText(/invoice number is INV-\d+/)).toBeVisible();
  }
}
