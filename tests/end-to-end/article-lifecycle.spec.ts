import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/articles.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);


    await articlesPage.goto();
  });
  test('create new articles @GAD-R04-01 @logged', async () => {
    // Arrange
    articleData = prepareRandomNewArticle();

    //Act
    const addArticleView = await articlesPage.clickAddArticleButtomLogged();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    const articlePage = await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can access singe article @GAD-R04-03 @logged', async () => {
    //Act
    const articlePage = await articlesPage.goToArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can delete his article @GAD-R04-04 @logged', async () => {
    //Arrange
    const expectedArticlesTitle = 'Articles';
    const expectedNoDataText = 'No data';

    const articlePage = await articlesPage.goToArticle(articleData.title);
    //Act
    await articlePage.deleteArticle();

    // Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesTitle);

    articlesPage = await articlesPage.searchArticle(articleData.title);
    await expect(articlesPage.noResultText).toHaveText(expectedNoDataText);
  });
});
