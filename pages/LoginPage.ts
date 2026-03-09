import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('#btn-make-appointment');
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.submitButton = page.locator('#btn-login');
  }

  async login() {
    await this.loginButton.click();
    
    // กรอกข้อมูล Login
    await this.usernameInput.fill('John Doe');
    await this.passwordInput.fill('ThisIsNotAPassword');
    await this.submitButton.click();


    await this.page.waitForURL(/.*#appointment/);
  }
}