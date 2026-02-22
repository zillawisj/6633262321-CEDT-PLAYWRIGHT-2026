import { test, expect } from '@playwright/test';

const URL = 'https://katalon-demo-cura.herokuapp.com/';

test.describe('Assignment 2 : Assertion', () => {

    // ใช้ BeforeEach เป็น Fixture ในการ Login เตรียมไว้ทุก Test Case
    test.beforeEach(async ({ page }) => {
        // 1. Navigate to URL
        await page.goto(URL);
        await page.click('#btn-make-appointment');

        // 2. Login with valid user
        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        // 3. Verify that make appointment text "Make Appointment" in h2
        await expect(page.locator('h2')).toHaveText('Make Appointment');
    });

    test('Verify Appointment Form Elements', async ({ page }) => {
        // 4. Verify that can select all facility combo boxes (เลือก Tokyo)
        const facilityCombo = page.locator('#combo_facility');
        await facilityCombo.selectOption('Tokyo CURA Healthcare Center');
        await expect(facilityCombo).toHaveValue('Tokyo CURA Healthcare Center');

        // 5. Verify that can select apply for hospital readmission checkbox
        const readmissionCheckbox = page.locator('#chk_hospotal_readmission');
        await readmissionCheckbox.check();
        await expect(readmissionCheckbox).toBeChecked();

        // 6. Verify that can select health care program radio button (เลือก Medicaid)
        const medicaidRadio = page.locator('#radio_program_medicaid');
        await medicaidRadio.check();
        await expect(medicaidRadio).toBeChecked();

        // 7. Verify that can input current date on Visit Date
        const currentDate = new Date().toLocaleDateString('en-GB'); // รูปแบบ DD/MM/YYYY
        await page.fill('#txt_visit_date', currentDate);
        await expect(page.locator('#txt_visit_date')).toHaveValue(currentDate);

        // 8. Verify that can input comment
        const commentText = 'Gemini help me with this assignment!';
        await page.fill('#txt_comment', commentText);
        await expect(page.locator('#txt_comment')).toHaveValue(commentText);

        // 9. Verify that book appointment button is displayed and enabled
        const bookButton = page.locator('#btn-book-appointment');
        await expect(bookButton).toBeVisible();
        await expect(bookButton).toBeEnabled();
    });
    test('Verify Appointment Form Elements', async ({ page }) => {

        await page.screenshot({ path: 'test-results/assignment2-filled-form.png' });

        // 9. Verify that book appointment button is displayed and enabled
        const bookButton = page.locator('#btn-book-appointment');
        await expect(bookButton).toBeVisible();
        await expect(bookButton).toBeEnabled();
        
        await page.screenshot({ path: 'test-results/assignment2-final-check.png' });
    });
});