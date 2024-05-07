import { prepareRandomNewArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/articles.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.views';
import { expect, test } from '@playwright/test';
import * as fs from 'fs'

test.describe('Verify articlesn', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();

    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test('rejest creating article without title @GAD-R04-01 @logged', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('rejest creating article  without body @GAD-R04-01 @logged', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('rejest creating article without title exceeding 128 signs @GAD-R04-02 @logged', async () => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle(129);

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
  });

  test('create article without title with 128 signs @GAD-R04-02 @logged', async ({
    page,
  }) => {
    // Arrange

    const articlePage = new ArticlePage(page);
    const articleData = prepareRandomNewArticle(128);

    //Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
  });
});
