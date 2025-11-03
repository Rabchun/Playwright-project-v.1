import { Page, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly confirmPasswordInput;
  readonly signUpButton;
  readonly successMessage;
  readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.confirmPasswordInput = page.getByPlaceholder(/confirm/i);
    this.signUpButton = page.getByRole('button', { name: /sign up/i });
    this.successMessage = page.locator('[data-test="success-message"]');
    this.errorMessage = page.locator('[data-test="error-message"]');
  }

  async goto() {
    await this.page.goto('https://dev-repmove-enterprise.web.app/auth/sign-up');
    await expect(this.page).toHaveURL(/sign-up/);
  }

  async register(email: string, password: string, confirmPassword: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.signUpButton.click();
  }

  async assertRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async assertRegistrationError(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
