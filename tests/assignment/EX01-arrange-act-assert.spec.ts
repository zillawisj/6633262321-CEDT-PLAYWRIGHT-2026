import { test, expect } from '@playwright/test';

// Arrange - กำหนด URL พื้นฐาน
const URL = 'https://katalon-demo-cura.herokuapp.com/';

test.describe('Assignment 1 : Arrange Act Assert', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange: ไปที่หน้าเว็บและเข้าหน้า Login เตรียมไว้ทุก Test Case
        await page.goto(URL);
        await page.click('#btn-make-appointment');
    });

    test('Verify login pass with valid user', async ({ page }) => {
        // Act: กรอกข้อมูลที่ถูกต้อง
        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        // Assert: ตรวจสอบว่าเข้าหน้า Appointment ได้ (URL เปลี่ยน)
        await expect(page).toHaveURL(/.*#appointment/);
        await expect(page.locator('h2')).toHaveText('Make Appointment');
        await page.screenshot({ path: 'test-results/login-pass.png' });
    });

    test('Verify login fail with invalid password', async ({ page }) => {
        // Act: กรอก Password ผิด
        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'WrongPassword123');
        await page.click('#btn-login');

        // Assert: ตรวจสอบว่าแสดงข้อความเตือนความผิดพลาด
        const errorMessage = page.locator('.text-danger');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Login failed!');
        await page.screenshot({ path: 'test-results/login-fail-password.png' });
    });

    test('Verify login fail with invalid username', async ({ page }) => {
        // Act: กรอก Username ผิด
        await page.fill('#txt-username', 'InvalidUser');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        // Assert: ตรวจสอบว่าแสดงข้อความเตือนความผิดพลาด
        const errorMessage = page.locator('.text-danger');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Login failed!');
        await page.screenshot({ path: 'test-results/login-fail-username.png' });
    });
});