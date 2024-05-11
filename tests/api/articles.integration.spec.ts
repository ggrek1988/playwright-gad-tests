import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  getAuthorizationHeader,
  prepareArticlePayload,
} from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const articlesUrl = '/api/articles';
    const articleData = prepareArticlePayload();
    // Act
    const response = await request.post(articlesUrl, {
      data: articleData,
    });
    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test('should create an article with logged-in user', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 201;

    const headers = await getAuthorizationHeader(request);
    // Act
    const articlesUrl = '/api/articles';
    const articleData = prepareArticlePayload();

    const responseArticle = await request.post(articlesUrl, {
      headers,
      data: articleData,
    });
    // Assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `status code expected ${expectedStatusCode}, but received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);
    const article = await responseArticle.json();
    expect.soft(article.title).toEqual(articleData.title);
    expect.soft(article.body).toEqual(articleData.body);
  });
});
