import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD_R02_01', async ({ page }) => {
    // Arrange
    const userEmail = 'Moses.Armstrong@Feest.ca';
    const userPassword = 'test1';
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    // Act
    await loginPage.goto();
    await loginPage.login(userEmail, userPassword);
    const title = await welcomePage.title();

    // Assert
    expect(title).toContain('Welcome');
  });
});