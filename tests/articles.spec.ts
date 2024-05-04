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

  let articleData: AddArticleModel
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();

    articleData = randomNewArticle();
    await expect.soft(addArticleView.header).toBeVisible();
  });

  test('create new articles @GAD_R04_01', async ({ page }) => {
    // Arrange

    const articlePage = new ArticlePage(page);

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('create new articles without title @GAD_R04_01', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('create new articles without body @GAD_R04_01', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });
});
