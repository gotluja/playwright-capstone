export const accounts = {
  valid: {
    email: process.env.TEST_USER_EMAIL ?? 'customer@practicesoftwaretesting.com',
    password: process.env.TEST_USER_PASSWORD ?? 'welcome01',
    displayName: 'Jane Doe',
  },
} as const;
