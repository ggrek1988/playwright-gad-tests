import { expect, test } from '@_src/fixtures/merge.fixture';
import { AddArticleModel } from '@_src/models/articles.model';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articleData: AddArticleModel;

  test('create new articles @GAD-R04-01 @logged', async ({
    createRandomArticle,
  }) => {
    // Arrange
    articleData = createRandomArticle.articleData;

    //Act
    const articlePage = createRandomArticle.articlePage;

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can access singe article @GAD-R04-03 @logged', async ({
    articlesPage,
  }) => {
    //Act
    const articlePage = await articlesPage.goToArticle(articleData.title);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can delete his article @GAD-R04-04 @logged', async ({
    articlesPage,
  }) => {
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
