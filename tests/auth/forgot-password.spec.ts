import { test } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { registerUser } from '../fixtures/registerHelper';

test.describe('Forgot Password Page', () => {
  test('Valid registered email shows success', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    const email = 'inomaliya13@gmail.com';

    // Створюємо користувача, якщо він ще не існує
    await registerUser(page, email);

    // Тепер перевіряємо Forgot Password
    await forgot.goto();
    await forgot.submitReset(email);
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
    await forgot.page.getByText('Please, enter your email address', { exact: true }).waitFor();
  });

  test('Back to Login link navigates correctly', async ({ page }) => {
    const forgot = new ForgotPasswordPage(page);
    await forgot.goto();
    await forgot.clickBackToLogin();
  });
});



