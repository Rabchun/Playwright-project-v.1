import { Page, expect } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput;
  readonly submitButton;
  readonly successMessage;
  readonly errorMessage;
  readonly backToLoginLink;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.submitButton = page.getByRole('button', { name: 'Send Recovery Link' });
    this.successMessage = page.locator('[data-test="success-message"]');
    this.errorMessage = page.locator('[data-test="error-message"]');
    this.backToLoginLink = page.getByRole('link', { name: /sign in/i });
  }

  async goto() {
    await this.page.goto('https://dev-repmove-enterprise.web.app/auth/forgot-password');
    await expect(this.page).toHaveURL(/forgot-password/);
  }

  async submitReset(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async assertErrorMessage(expected: string) {
    await expect(this.errorMessage).toContainText(expected);
  }

  async clickBackToLogin() {
    await this.backToLoginLink.click();
    await expect(this.page).toHaveURL(/sign-in/);
  }
}
