import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {

  // Test Case 1: ไม่กรอก Username และ Password
  test('UT-01.1: Empty username and password', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');

    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  // Test Case 2: กรอก Username แต่ไม่กรอก Password
  test('UT-01.2: Missing password', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Password is required');

    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  // Test Case 3: กรอก Username และ Password ไม่ถูกต้อง
  test('UT-01.3: Invalid credentials', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]')
      .fill('invalid_user');

    await page.locator('[data-test="password"]')
      .fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username and password do not match');

    await expect(page).not.toHaveURL(/inventory\.html/);
  });

});