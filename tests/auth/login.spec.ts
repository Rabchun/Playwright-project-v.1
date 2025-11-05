import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', () => {
  test('Valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('valid_user@test.com', 'StrongPass123!');
    await expect(page).toHaveURL(/dashboard|home/); 
  });

  test('Invalid credentials show error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('invalid@test.com', 'wrongpass');
    await login.assertLoginError('Invalid credentials');
  });

  test('Empty fields show validation messages', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.signInButton.click();
    await expect(page.locator('text=Required')).toHaveCount(2);
  });

  test('OAuth buttons visible', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.assertOAuthButtonsVisible();
  });
});
