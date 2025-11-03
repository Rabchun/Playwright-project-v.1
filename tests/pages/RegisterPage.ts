import { Page, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly companyNameInput;
  readonly industryDropdown;
  readonly emailInput;
  readonly selectPhonePrefix;
  readonly phoneNumberInput;
  readonly passwordInput;
  readonly signUpButton;
  readonly successMessage;
  readonly errorMessage;

   public generatedEmail: string = '';

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('app-input[placeholder="First Name"] input');
    this.lastNameInput = page.locator('app-input[placeholder="Last Name"] input');
    this.companyNameInput = page.locator('app-input[placeholder="Company Name"] input');
    this.industryDropdown = page.locator('ng-select').filter({ hasText: 'Industry' }).getByRole('combobox');
    this.selectPhonePrefix = page.locator('app-phone-number').getByRole('combobox');
    this.phoneNumberInput = page.locator('app-input').filter({ hasText: 'Phone' }).locator('input[type="text"]');
    this.emailInput = page.locator('app-input[placeholder="Email"] input');
    this.passwordInput = page.locator('input[type="password"]');
    this.signUpButton = page.getByRole('button', { name: 'Sign Up', exact: true });
    this.successMessage = page.locator('[data-test="success-message"]');
    this.errorMessage = page.locator('[data-test="error-message"]');
  }

  async goto() {
    await this.page.goto('https://dev-repmove-enterprise.web.app/auth/sign-up');
    await expect(this.page).toHaveURL(/sign-up/);
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    companyName: string,
    phone: string,
    password: string
  ) {
    this.generatedEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

    await expect(this.firstNameInput).toBeVisible({ timeout: 10000 });
    await this.firstNameInput.fill(firstName);

    await expect(this.lastNameInput).toBeVisible({ timeout: 10000 });
    await this.lastNameInput.fill(lastName);

    await expect(this.companyNameInput).toBeVisible({ timeout: 10000 });
    await this.companyNameInput.fill(companyName);

    await this.selectFirstIndustry();

    await expect(this.emailInput).toBeVisible({ timeout: 10000 });
    await this.emailInput.fill(this.generatedEmail);

    await this.selectPhonePrefixByValue();

    await expect(this.phoneNumberInput).toBeVisible({ timeout: 10000 });
    await this.phoneNumberInput.fill(phone);

    await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
    await this.passwordInput.fill(password);
  }

  async selectFirstIndustry() {
    await expect(this.industryDropdown).toBeVisible({ timeout: 10000 });
    await this.industryDropdown.click();

    const option = this.page.locator('.ng-dropdown-panel .ng-option').first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
  }

  async selectPhonePrefixByValue() {
    await expect(this.selectPhonePrefix).toBeVisible({ timeout: 10000 });
    await this.selectPhonePrefix.click();

    const option = this.page.locator('.ng-dropdown-panel .ng-option').first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
  }

  async submit() {
    await expect(this.signUpButton).toBeVisible({ timeout: 10000 });
    await this.signUpButton.click();
  }

  async assertRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
  }

  async assertRegistrationError(expectedText: string) {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(this.errorMessage).toContainText(expectedText, { timeout: 10000 });
  }
}

