import { test, expect } from '@playwright/test';

const URL = 'https://katalon-demo-cura.herokuapp.com/';

test.describe('Assignment 2 : Assertion', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        await page.click('#btn-make-appointment');

        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        await expect(page.locator('h2')).toHaveText('Make Appointment');
    });

    test('Verify Appointment Form Elements', async ({ page }) => {
        const facilityCombo = page.locator('#combo_facility');
        await facilityCombo.selectOption('Tokyo CURA Healthcare Center');
        await expect(facilityCombo).toHaveValue('Tokyo CURA Healthcare Center');

        const readmissionCheckbox = page.locator('#chk_hospotal_readmission');
        await readmissionCheckbox.check();
        await expect(readmissionCheckbox).toBeChecked();

        const medicaidRadio = page.locator('#radio_program_medicaid');
        await medicaidRadio.check();
        await expect(medicaidRadio).toBeChecked();

        const currentDate = new Date().toLocaleDateString('en-GB'); 
        await page.fill('#txt_visit_date', currentDate);
        await expect(page.locator('#txt_visit_date')).toHaveValue(currentDate);

        const commentText = 'Gemini help me with this assignment!';
        await page.fill('#txt_comment', commentText);
        await expect(page.locator('#txt_comment')).toHaveValue(commentText);

        // --- แก้ไขจุดที่มีปัญหา: ลบชื่อโฟลเดอร์ test-results/ ออกเพื่อให้รันบน GitHub ได้ ---
        await page.screenshot({ path: 'assignment2-filled-form.png' }); 

        const bookButton = page.locator('#btn-book-appointment');
        await expect(bookButton).toBeVisible();
        await expect(bookButton).toBeEnabled();
        
        await page.screenshot({ path: 'assignment2-final-check.png' });
    });
});