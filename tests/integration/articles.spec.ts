import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articlesn', () => {

  test('rejest creating article without title @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
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

  test('rejest creating article  without body @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
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

  test('rejest creating article without title exceeding 128 signs @GAD-R04-02 @logged', async ({
    addArticleView,
  }) => {
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
    addArticleView,
  }) => {
    // Arrange

    const articleData = prepareRandomNewArticle(128);

    //Act
    const articlePage = await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
  });
});
