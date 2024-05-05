import { LoginUserModal } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ page }) => {
    // Arrange

    const expectedWelcomeTitle = 'Welcome';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    const title = await welcomePage.getTitle();

    // Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('rejest with incorrect password @GAD-R02-01', async ({ page }) => {
    // Arrange
    const expectedLoginTitle = 'Login';

    const loginUserData: LoginUserModal = {
      userEmail: testUser1.userEmail,
      userPassword: 'test2',
    };
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await loginPage.loginNew(loginUserData);
    const title = await loginPage.getTitle();

    // Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
