import { randomUserData } from '../src/factories/user.factory';
import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUser;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = randomUserData();
    await registerPage.goto();
  });

  test('register with correct data and login @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    // Arrange
    const expectedAlertPopupText = 'User created';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    await registerPage.register(registerUserData);

    // Assert
    expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);

    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect(titleLogin).toContain('Login');

    // Assert test login
    await loginPage.loginNew({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });

  test('not register with incorrect data - non valid email @GAD_R03_04', async () => {
    // Arrange
    const expectedErrorText = 'Please provide a valid email address';
    registerUserData.userEmail = '#@1234';

    // Act
    await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.octavalidateEmailError).toHaveText(
      expectedErrorText,
    );
  });

  test('not register with incorrect data - email not provided @GAD_R03_04', async () => {
    // Arrange
    const expectedErrorText = 'This field is required';

    // Act
    registerPage.userFirstNameInput.fill(registerUserData.userFirstName);
    registerPage.userLastNameInput.fill(registerUserData.userLastName);
    registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    // Assert
    await expect(registerPage.octavalidateEmailError).toHaveText(
      expectedErrorText,
    );
  });
});
