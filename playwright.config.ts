import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // ตั้งเวลาสูงสุดของแต่ละ Test
  timeout: 30_000,

  // ไม่รันซ้ำเมื่อ Test ล้มเหลว
  retries: 0,

  // ใช้ Worker เดียว เพื่อให้ง่ายต่อการตรวจสอบผล
  workers: 1,

  // สร้างรายงานทั้ง List, HTML และ JSON
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',

    // บันทึกภาพหน้าจอเมื่อ Test ล้มเหลว
    screenshot: 'only-on-failure',

    // เก็บ Trace เมื่อ Test ล้มเหลว
    trace: 'retain-on-failure',

    // เก็บวิดีโอเมื่อ Test ล้มเหลว
    video: 'retain-on-failure',
  },

  // ใช้ Chromium ตัวเดียว
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});