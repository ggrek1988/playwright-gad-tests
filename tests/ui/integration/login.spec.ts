import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModal } from '@_src/models/user.model';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify login', () => {
  test('login with correct credentials @GAD-R02-01', async ({ loginPage }) => {
    // Arrange
    const expectedWelcomeTitle = 'Welcome';
    // Act
    const welcomePage = await loginPage.loginNew(testUser1);
    const title = await welcomePage.getTitle();

    // Assert
    expect(title).toContain(expectedWelcomeTitle);
  });

  test('rejest with incorrect password @GAD-R02-01', async ({ loginPage }) => {
    // Arrange
    const expectedLoginTitle = 'Login';

    const loginUserData: LoginUserModal = {
      userEmail: testUser1.userEmail,
      userPassword: 'test2',
    };

    // Act
    await loginPage.loginNew(loginUserData);
    const title = await loginPage.getTitle();

    // Assert
    await expect
      .soft(loginPage.loginError)
      .toHaveText('Invalid username or password');
    expect.soft(title).toContain(expectedLoginTitle);
  });
});
