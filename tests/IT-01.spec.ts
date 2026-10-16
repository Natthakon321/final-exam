import { test, expect } from '@playwright/test';

test.describe('IT-01: Top-down Integration Testing with Stub', () => {

  test('Display mock inventory using a stub', async ({ page }) => {

    // Step 1: เข้าสู่ระบบด้วยข้อมูลจริง
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    // Step 2: ตรวจสอบว่า Login สำเร็จ
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 3: จำลองหน้า Inventory ด้วย Stub
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mock Inventory</title>
        </head>
        <body>
          <h1>Mock Inventory Ready</h1>

          <div class="product">
            <h2>Mock Backpack</h2>
          </div>

          <div class="product">
            <h2>Mock Bike Light</h2>
          </div>
        </body>
      </html>
    `);

    // Step 4: ตรวจสอบผลลัพธ์จาก Stub
    await expect(
      page.getByRole('heading', { name: 'Mock Inventory Ready' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Mock Backpack' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Mock Bike Light' })
    ).toBeVisible();

  });

});