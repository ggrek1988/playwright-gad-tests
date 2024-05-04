import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { faker } from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('Verify regoster', () => {
  test('register with correct data and login @GAD_R03_01 @GAD_R03_02 @GAD_R03_03', async ({
    page,
  }) => {
    // Arrange

    // zmienna bazująca na interfejsie w user.model.ts
    const registerUser: RegisterUser = {
      userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      userEmail: '',
      userPassword: faker.internet.password(),
    };

    registerUser.userEmail = faker.internet.email({
      firstName: registerUser.userFirstName,
      lastName: registerUser.userLastName,
    });

    // Act
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(registerUser);

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
      userEmail: registerUser.userEmail,
      userPassword: registerUser.userPassword,
    });
    const title = await welcomePage.title();
    expect(title).toContain('Welcome');
  });
});
