import { BasePage } from './base.page';
import { RegisterUserModal } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';

  userFirstNameInput = this.page.getByTestId('firstname-input');
  userLastNameInput = this.page.getByTestId('lastname-input');
  userEmailInput = this.page.getByTestId('email-input');
  userPasswordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');

  alertPopUp = this.page.getByTestId('alert-popup');
  octavalidateEmailError = this.page.locator('#octavalidate_email');

  constructor(page: Page) {
    super(page);
  }

  async register(registerUser: RegisterUserModal): Promise<LoginPage> {
    await this.userFirstNameInput.fill(registerUser.userFirstName);
    await this.userLastNameInput.fill(registerUser.userLastName);
    await this.userEmailInput.fill(registerUser.userEmail);
    await this.userPasswordInput.fill(registerUser.userPassword);
    await this.registerButton.click();

    return new LoginPage(this.page);
  }
}
