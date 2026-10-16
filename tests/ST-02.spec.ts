import { test, expect } from '@playwright/test';

test.describe('ST-02: Checkout Validation', () => {

  test('Validate required fields and complete purchase', async ({ page }) => {

    // Step 1: เปิดเว็บไซต์และเข้าสู่ระบบ
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 2: เพิ่ม Backpack ลงตะกร้า
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Step 3: เปิดตะกร้าและเริ่ม Checkout
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Step 4: ไม่กรอกข้อมูล แล้วกด Continue
    await page.getByRole('button', { name: 'Continue' }).click();

    // ตรวจสอบ First Name is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');

    // Step 5: กรอก First Name แต่ไม่กรอก Last Name
    await page.locator('[data-test="firstName"]').fill('John');
    await page.getByRole('button', { name: 'Continue' }).click();

    // ตรวจสอบ Last Name is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');

    // Step 6: กรอก Last Name แต่ไม่กรอก Postal Code
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.getByRole('button', { name: 'Continue' }).click();

    // ตรวจสอบ Postal Code is required
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');

    // Step 7: กรอก Postal Code
    await page.locator('[data-test="postalCode"]').fill('50000');
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 8: ตรวจสอบหน้า Checkout Overview
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    // Step 9: ยืนยันการสั่งซื้อ
    await page.getByRole('button', { name: 'Finish' }).click();

    // Step 10: ตรวจสอบว่าสั่งซื้อสำเร็จ
    await expect(
      page.getByText('Thank you for your order!')
    ).toBeVisible();

  });

});