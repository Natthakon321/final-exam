import { test, expect } from '@playwright/test';

test.describe('ST-01: Complete Purchase', () => {

  test('Purchase Backpack and Bike Light successfully', async ({ page }) => {

    // Step 1: เปิดหน้า Login
    await page.goto('https://www.saucedemo.com/');

    // Step 2: เข้าสู่ระบบ
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 3: ตรวจสอบหน้า Inventory
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 4: เพิ่ม Backpack ลงตะกร้า
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Step 5: เพิ่ม Bike Light ลงตะกร้า
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    ).click();

    // Step 6: เปิดตะกร้าสินค้า
    await page.locator('.shopping_cart_link').click();

    // Step 7: ตรวจสอบสินค้าทั้งสองรายการ
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true })
    ).toBeVisible();

    // Step 8: เริ่ม Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Step 9: กรอกข้อมูลผู้ซื้อ
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('50000');

    // Step 10: ดำเนินการต่อ
    await page.getByRole('button', { name: 'Continue' }).click();

    // Step 11: ตรวจสอบหน้า Checkout Overview
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true })
    ).toBeVisible();

    // Step 12: ยืนยันการสั่งซื้อ
    await page.getByRole('button', { name: 'Finish' }).click();

    // Step 13: ตรวจสอบข้อความยืนยัน
    await expect(
      page.getByText('Thank you for your order!')
    ).toBeVisible();

  });

});
