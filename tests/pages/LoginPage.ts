import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly signInButton;
  readonly rememberMeCheckbox;
  readonly errorMessage;
  readonly googleButton;
  readonly appleButton;
  readonly microsoftButton;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: /sign in/i });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember/i });
    this.errorMessage = page.locator('[data-test="error-message"]');
    this.googleButton = page.getByRole('button', { name: /google/i });
    this.appleButton = page.getByRole('button', { name: /apple/i });
    this.microsoftButton = page.getByRole('button', { name: /microsoft/i });
  }

  async goto() {
    await this.page.goto('https://dev-repmove-enterprise.web.app/auth/sign-in');
    await expect(this.page).toHaveURL(/sign-in/);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async assertLoginError(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }

  async assertOAuthButtonsVisible() {
    await expect(this.googleButton).toBeVisible();
    await expect(this.appleButton).toBeVisible();
    await expect(this.microsoftButton).toBeVisible();
  }
}
