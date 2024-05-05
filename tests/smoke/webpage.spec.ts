import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.pages';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title @GAD-R01-01', async ({ page }) => {
    // Arrange
    const expectedGadTitle = 'GAD';
    const homePage = new HomePage(page);
    // Act
    await homePage.goto();
    const title = await homePage.getTitle();
    // Assert
    expect(title).toContain(expectedGadTitle);
  });

  test('articles page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';

    const articlesPage = new ArticlesPage(page);
    // Act
    await articlesPage.goto();
    const title = await articlesPage.getTitle();
    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('comments page title @GAD-R01-02', async ({ page }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';

    const commentsPage = new CommentsPage(page);
    // Act
    await commentsPage.goto();
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
