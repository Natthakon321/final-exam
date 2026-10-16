import { test, expect } from '@playwright/test';

test.describe('UT-02: Product Button State', () => {

  test('Add to cart and Remove product', async ({ page }) => {

    // Step 1: เปิดหน้า Login
    await page.goto('https://www.saucedemo.com/');

    // Step 2: เข้าสู่ระบบ
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 3: ตรวจสอบว่าเข้าสู่หน้าสินค้าสำเร็จ
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 4: เลือกสินค้า Sauce Labs Backpack
    const backpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Step 5: เพิ่มสินค้าลงตะกร้า
    await backpack.click();

    // Step 6: ตรวจสอบว่าปุ่มเปลี่ยนเป็น Remove
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]')
    ).toBeVisible();

    // Step 7: ตรวจสอบจำนวนสินค้าในตะกร้า
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Step 8: นำสินค้าออกจากตะกร้า
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Step 9: ตรวจสอบว่าปุ่มกลับเป็น Add to cart
    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    ).toBeVisible();

    // Step 10: ตรวจสอบว่าจำนวนสินค้าในตะกร้าหายไป
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  });

});
