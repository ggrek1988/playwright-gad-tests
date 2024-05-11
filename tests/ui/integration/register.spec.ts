import { prepareRandomUser } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModal } from '@_src/models/user.model';

test.describe('Verify register', () => {
  let registerUserData: RegisterUserModal;

  test.beforeEach(async ({}) => {
    registerUserData = prepareRandomUser();
  });

  test('register with correct data and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    registerPage,
  }) => {
    // Arrange
    const expectedAlertPopupText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    const loginPage = await registerPage.register(registerUserData);

    // Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);

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

  test('not register with incorrect data - non valid email @GAD-R03-04', async ({
    registerPage,
  }) => {
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

  test('not register with incorrect data - email not provided @GAD-R03-04', async ({
    registerPage,
  }) => {
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
