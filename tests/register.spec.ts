import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify regoster', () => {
  test('register with correct data and login @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    // Arrange
    const userFirstName = 'Janina';
    const userLastName = 'Nowak';
    const userEmail = `jntest${new Date().getTime()}@test.test1`;
    const userPassword = 'testtest234';

    // Act
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
    );

    // Assert
    const expectedAlertPopupText = 'User created';
    expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect(titleLogin).toContain('Login');

    // Assert
    const welcomePage = new WelcomePage(page);
    await loginPage.login(userEmail, userPassword);
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });
});
