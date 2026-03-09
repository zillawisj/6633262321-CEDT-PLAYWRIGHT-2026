import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// โหลดค่าจากไฟล์ .env
dotenv.config();

export default defineConfig({
  testDir: './tests',
  /* เพิ่ม Timeout ของแต่ละ Test เป็น 30 วินาที */
  timeout: 30000,
  /* ความเร็วในการตรวจสอบ Assertion */
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  /* ป้องกันการเผลอใส่ test.only ทิ้งไว้บน CI */
  forbidOnly: !!process.env.CI,
  /* รันซ้ำ 2 ครั้งหากล้มเหลวบน CI */
  retries: process.env.CI ? 2 : 0,
  /* บน CI ให้ใช้ 1 worker เพื่อความเสถียร */
  workers: process.env.CI ? 1 : undefined,
  /* เลือกใช้ HTML Reporter */
  reporter: 'html',
  
  use: {
    /* ดึง URL จาก Environment Variable ตามโจทย์ */
    baseURL: process.env.BASE_URL,

    /* ตั้งค่า Action และ Navigation Timeout */
    actionTimeout: 10000,
    navigationTimeout: 15000,

    /* เก็บ Trace และ Screenshot เมื่อ Test ล้มเหลวเพื่อช่วย Debug */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  /* ตั้งค่า Browser สำหรับการทดสอบ */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});