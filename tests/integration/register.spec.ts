import { prepareRandomUser } from '@_src/factories/user.factory';
import { RegisterUserModal } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModal;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    await registerPage.goto();
  });

  test('register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    // Arrange
    const expectedAlertPopupText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    const loginPage = new LoginPage(page);
    await registerPage.register(registerUserData);

    // Assert
    expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);

    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect(titleLogin).toContain(expectedLoginTitle);

    // Assert test login
    const welcomePage = await loginPage.loginNew({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const title = await welcomePage.getTitle();
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('not register with incorrect data - non valid email @GAD-R03-04', async () => {
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

  test('not register with incorrect data - email not provided @GAD-R03-04', async () => {
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
