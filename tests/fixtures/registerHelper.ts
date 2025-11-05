import { Page } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';


export async function registerUser(page: Page, email?: string) {
  const register = new RegisterPage(page);
  await register.goto();

  
  const userEmail = email ?? `${'TestFirst'.toLowerCase()}.${'TestLast'.toLowerCase()}@example.com`;

  await register.fillRegistrationForm(
    'TestFirst',
    'TestLast',
    'TestCompany',
    '323232323',
    'ValidPass123!',
    userEmail
  );

  try {
    await register.submit();
    await register.assertRegistrationSuccess();
  } catch (e) {
    
    try {
      const errorText = await register.errorMessage.textContent();
      if (errorText?.includes('Email already in use')) {
        console.log(`User ${userEmail} already exists, skipping registration.`);
      } else {
        throw e;
      }
    } catch {
      throw e;
    }
  }

  return register.generatedEmail;
}

