import { expect, type Page } from '@playwright/test';

type NewCustomer = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
};

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Customer registration' })).toBeVisible();
  }

  async register(customer: NewCustomer): Promise<void> {
    await this.page.getByTestId('first-name').fill(customer.firstName);
    await this.page.getByTestId('last-name').fill(customer.lastName);
    await this.page.getByTestId('dob').fill(customer.dateOfBirth);
    await this.page.getByTestId('country').selectOption({ label: customer.country });
    await this.page.getByTestId('postal_code').fill(customer.postalCode);
    await this.page.getByTestId('house_number').fill(customer.houseNumber);
    await this.page.getByTestId('street').fill(customer.street);
    await this.page.getByTestId('city').fill(customer.city);
    await this.page.getByTestId('state').fill(customer.state);
    await this.page.getByTestId('phone').fill(customer.phone);
    await this.page.getByTestId('email').fill(customer.email);
    await this.page.getByTestId('password').fill(customer.password);
    await this.page.getByTestId('register-submit').click();
  }
}
