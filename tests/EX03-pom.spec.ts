import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Make Appointment Success Test', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // final update
  
  // 1. Navigate ไปยัง URL ที่กำหนดใน Environment Variable
  await page.goto('./');

  // 2. Login ผ่าน Page Object Model
  await loginPage.login();
  
  // ยืนยันว่าหน้าเปลี่ยนและรอให้โหลดข้อมูลเสร็จสิ้น
  await expect(page).toHaveURL(/.*#appointment/);
  await page.waitForLoadState('networkidle');

  // 3. ทำรายการจอง (Make Appointment)
  // ตรวจสอบว่าหัวข้อหน้าจองคิวแสดงผลแล้ว
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

  // เลือก Facility: Hongkong CURA Healthcare Center
  await page.selectOption('#combo_facility', 'Hongkong CURA Healthcare Center');
  
  // คลิก Checkbox: Apply for hospital readmission
  await page.getByLabel('Apply for hospital readmission').check();

  // เลือก Healthcare Program: Medicaid
  await page.getByLabel('Medicaid').check();

  // กรอกวันที่: ใช้ Placeholder และกด Enter เพื่อให้แน่ใจว่าปิด Date Picker
  const dateInput = page.getByPlaceholder('dd/mm/yyyy');
  await dateInput.fill('20/03/2026');
  await dateInput.press('Enter'); 
  
  // กรอก Comment
  await page.locator('#txt_comment').fill('Test appointment by Boss');
  
  // 4. กดปุ่ม Book และรอให้ URL เปลี่ยนไปยังหน้าสรุปผล
  await Promise.all([
    page.waitForURL(/.*appointment.php#summary/),
    page.getByRole('button', { name: 'Book Appointment' }).click(),
  ]);

  // 5. Assertion (หน้าสรุปผล)
  // ตรวจสอบว่าข้อความ 'Appointment Confirmation' ปรากฏขึ้นแล้ว
  const confirmationHeading = page.getByRole('heading', { name: 'Appointment Confirmation' });
  await expect(confirmationHeading).toBeVisible();
  await expect(confirmationHeading).toHaveText('Appointment Confirmation');
});