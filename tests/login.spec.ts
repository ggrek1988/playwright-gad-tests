import { LoginUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange
    // implementacja obiektu który implementuje interfejs
    // const loginUserData: LoginUser = {
    //   userEmail: testUser1.userEmail,
    //   userPassword: testUser1.userPassword,
    // };
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    const title = await welcomePage.title();

    // Assert
    expect(title).toContain('Welcome');
  });

  test('rejest with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const loginUserData: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: 'test2',
    };
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginNew(loginUserData);
    const title = await loginPage.title();

    // Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
    expect.soft(title).toContain('Login');
  });
});
