import { test, expect } from '@playwright/test';

test.describe('IT-02: Bottom-up Integration Testing with Driver', () => {

  test('Open inventory using driver and add two products', async ({ page, context }) => {

    // Step 1: เพิ่ม Cookie เพื่อจำลองสถานะผู้ใช้
    await context.addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);

    // Step 2: เปิดหน้า Inventory โดยตรง
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Step 3: ตรวจสอบว่ามีสินค้า 6 รายการ
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    // Step 4: เพิ่ม Sauce Labs Backpack ลงตะกร้า
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Step 5: เพิ่ม Sauce Labs Bike Light ลงตะกร้า
    await page.locator(
      '[data-test="add-to-cart-sauce-labs-bike-light"]'
    ).click();

    // Step 6: ตรวจสอบจำนวนสินค้าในตะกร้า
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Step 7: เปิดตะกร้าสินค้า
    await page.locator('.shopping_cart_link').click();

    // Step 8: ตรวจสอบว่ามีสินค้าทั้งสองรายการ
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true })
    ).toBeVisible();

  });

});