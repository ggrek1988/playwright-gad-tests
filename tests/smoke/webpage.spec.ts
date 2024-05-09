import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify service main pages', () => {
  test('home page title @GAD-R01-01', async ({ homePage }) => {
    // Arrange
    const expectedGadTitle = 'GAD';

    // Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedGadTitle);
  });

  test('articles page title @GAD-R01-02', async ({ articlesPage }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    // Act
    const title = await articlesPage.getTitle();
    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('comments page title @GAD-R01-02', async ({ commentsPage }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    // Act
    const title = await commentsPage.getTitle();

    // Assert
    expect(title).toContain(expectedCommentsTitle);
  });

  test('home page title simple', async ({ page }) => {
    // Act
    await page.goto('');
    await page.waitForLoadState();

    // Assert
    await expect(page).toHaveTitle(/GAD/);
  });
});
