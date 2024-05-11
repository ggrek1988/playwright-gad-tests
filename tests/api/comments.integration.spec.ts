import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  apiLinks,
  getAuthorizationHeader,
  prepareArticlePayload,
  prepareCommentPayload,
} from '@_src/utils/api.util';

test.describe('Verify comments CRUD operations @crud @GAD-R08-04', () => {
  let articleId: number;
  let headers: { [key: string]: string };
  test.beforeAll('create an article', async ({ request }) => {
    headers = await getAuthorizationHeader(request);

    const articleData = prepareArticlePayload();
    const responseArticle = await request.post(apiLinks.articlesUrl, {
      headers,
      data: articleData,
    });
    const article = await responseArticle.json();
    articleId = article.id;
  });
  test('should not create a comment without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;

    const commentData = prepareCommentPayload(articleId);
    // Arrange
    const response = await request.post(apiLinks.commentsUrl, {
      data: commentData,
    });
    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });
  test('should create a comment with logged-in user', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 201;
    // Act

    const commentData = prepareCommentPayload(articleId);
    // Arrange
    const response = await request.post(apiLinks.commentsUrl, {
      headers,
      data: commentData,
    });
    // Assert
    const actualResponseStatus = response.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);
    const comment = await response.json();
    expect.soft(comment.body).toEqual(commentData.body);
  });
});
