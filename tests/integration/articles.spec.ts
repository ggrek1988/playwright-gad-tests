import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.utils';

test.describe('Verify articlesn', () => {
  test('rejest creating article without title @GAD-R04-01 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange

    const expectedErrorMessage = 'Article was not created';
    const articleData = prepareRandomNewArticle();
    const expectedResponseCode = 422;
    articleData.title = '';

    const responsePromise = waitForResponse({
      page: page,
      url: '/api/articles',
    });
    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    // Assert
    await expect
      .soft(addArticleView.alertPopup)
      .toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseCode);
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
    page,
  }) => {
    // Arrange

    const articleData = prepareRandomNewArticle(128);
    const expectedStatusCode = 201;
    const responsePromise = waitForResponse({ page, url: '/api/articles' });
    //Act
    const articlePage = await addArticleView.createArticle(articleData);
    const response = await responsePromise;
    // Assert
    expect(response.status()).toBe(expectedStatusCode);

    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
  });

  test('should return created article from API @GAD-R07-04 @logged', async ({
    addArticleView,
    page,
  }) => {
    // Arrange
    const articleData = prepareRandomNewArticle();

    const waitParams = {
      page,
      url: '/api/articles',
      method: 'GET',
      text: articleData.title,
    };
    const responsePromise = waitForResponse(waitParams);

    //Act
    const articlePage = await addArticleView.createArticle(articleData);
    const response = await responsePromise;
    // Assert
    expect(response.ok()).toBeTruthy();

    await expect.soft(articlePage.articleTittle).toHaveText(articleData.title);
  });
});
