import { randomUserData } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register with correct data and login @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    // Arrange
    const registerUserData = randomUserData();

    // Act
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(registerUserData);

    // Assert
    const expectedAlertPopupText = 'User created';
    expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect(titleLogin).toContain('Login');

    // Assert
    const welcomePage = new WelcomePage(page);
    await loginPage.loginNew({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });

  test('not register with incorrect data - non valid email @GAD_R03_04', async ({
    page,
  }) => {
    // Arrange
    const registerUserData = randomUserData();
    registerUserData.userEmail = '#@1234';
    // Act
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(registerUserData);

    // Assert
    const expectedErrorText = 'Please provide a valid email address';
    await expect(registerPage.octavalidateEmailError).toHaveText(
      expectedErrorText,
    );
  });

  test('not register with incorrect data - email not provided @GAD_R03_04', async ({
    page,
  }) => {
    // Arrange
    const registerUserData = randomUserData();
    const registerPage = new RegisterPage(page);
    registerPage.userFirstNameInput.fill(registerUserData.userFirstName);
    registerPage.userLastNameInput.fill(registerUserData.userLastName);
    registerPage.userPasswordInput.fill(registerUserData.userPassword);
    // Act

    await registerPage.goto();
    await registerPage.registerButton.click();

    // Assert
    const expectedErrorText = 'This field is required';
    await expect(registerPage.octavalidateEmailError).toHaveText(
      expectedErrorText,
    );
  });
});
