import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

test.describe('Forgot Password Page', () => {
  test('Valid registered email shows success', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.submitReset('registered_user@test.com');
    await forgot.assertSuccessMessage();
  });

  test('Unregistered email shows error', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.submitReset('not_registered@test.com');
    await forgot.assertErrorMessage('Email not found');
  });

  test('Empty email shows validation message', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.submitButton.click();
    await expect(page.locator('text=Required')).toBeVisible();
  });

  test('Back to Login link navigates correctly', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.clickBackToLogin();
  });
});
