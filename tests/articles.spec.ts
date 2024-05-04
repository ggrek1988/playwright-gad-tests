import { randomNewArticle } from '../src/factories/article.factory';
import { AddArticleModel } from '../src/models/articles.model';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.views';
import { expect, test } from '@playwright/test';

test.describe('Verify articlesn', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();

    await expect.soft(addArticleView.header).toBeVisible();
  });

 
  test('rejest creating article without title @GAD_R04_01', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('rejest creating article  without body @GAD_R04_01', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle();
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('rejest creating article without title exceeding 128 signs @GAD_R04_02', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = randomNewArticle(129);

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('create article without title with 128 signs @GAD_R04_02', async ({
    page,
  }) => {
    // Arrange

    const articlePage = new ArticlePage(page);
    const articleData = randomNewArticle(128);

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
  });
});
