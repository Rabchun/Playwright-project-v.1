import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Registration Page', () => {
  test('Register new user successfully', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register(`user_${Date.now()}@test.com`, 'ValidPass123!', 'ValidPass123!');
    await register.assertRegistrationSuccess();
  });

  test('Password mismatch shows error', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register('test_user@test.com', 'ValidPass123!', 'InvalidPass');
    await register.assertRegistrationError('Passwords do not match');
  });

  test('Existing email shows error', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();
    await register.register('existing_user@test.com', 'ValidPass123!', 'ValidPass123!');
    await register.assertRegistrationError('Email already in use');
  });
});
