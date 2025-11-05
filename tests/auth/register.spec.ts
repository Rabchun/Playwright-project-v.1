import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Registration Page', () => {
  let registeredEmail: string;

  test('Register new user successfully', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();

    await register.fillRegistrationForm(
      'TestFirst',
      'TestLast',
      'TestCompany',
      '323232323',
      'ValidPass123!'
    );

    await register.submit();
    await register.assertRegistrationSuccess();

    registeredEmail = register.generatedEmail;
    console.log('Registered user email:', registeredEmail);
  });

  test('Min password length', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();

    await register.fillRegistrationForm(
      'TestFirst',
      'TestLast',
      'TestCompany',
      '323232323',
      '1'
    );

    await register.submit();
    await register.assertRegistrationError('Min length for Password is 5');
  });

  test('Existing email shows error', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.goto();

    await register.fillRegistrationForm(
      'TestFirst',
      'TestLast',
      'TestCompany',
      '323232323',
      'ValidPass123!'
    );

    // Використовуємо email з попереднього тесту
    await register.emailInput.fill(registeredEmail);

    await register.submit();
    await register.assertRegistrationError('Email already in use');
  });
});

