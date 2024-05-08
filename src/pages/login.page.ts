import { BasePage } from './base.page';
import { LoginUserModal } from '@_src/models/user.model';
import { WelcomePage } from '@_src/pages/welcome.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';

  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  userPasswordInput = this.page.getByPlaceholder('Enter Password');
  LogInButton = this.page.getByRole('button', { name: 'LogIn' });

  loginError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }

  // zadeklarowanie w parametrze funckji interfejsów
  async loginNew(loginUser: LoginUserModal): Promise<WelcomePage> {
    await this.userEmailInput.fill(loginUser.userEmail);
    await this.userPasswordInput.fill(loginUser.userPassword);
    await this.LogInButton.click();

    return new WelcomePage(this.page)
  }
}
