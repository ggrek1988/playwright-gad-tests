import { expect, test } from '@_src/fixtures/merge.fixture';
test.describe('Verify comments API endpoint @GAD-R08-02 @api', () => {
  test.describe('verify each condition in separate test', () => {
    test('GET comments returns status code 200', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;
      const commentsUrl = '/api/comments';
      // Act
      const response = await request.get(commentsUrl);
      // Assert
      expect(response.status()).toBe(expectedStatusCode);
    });
    test('GET comments should return at least one comment @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedMinCommentsCount = 1;
      const commentsUrl = '/api/comments';
      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();
      // Assert
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinCommentsCount,
      );
    });
    test('GET comments return comment object @predefined_data', async ({
      request,
    }) => {
      // Arrange
      const expectedRequiredFields = [
        'id',
        'article_id',
        'user_id',
        'body',
        'date',
      ];
      const commentsUrl = '/api/comments';
      // Act
      const response = await request.get(commentsUrl);
      const responseJson = await response.json();
      const comment = responseJson[0];
      // Assert
      expectedRequiredFields.forEach((key) => {
        expect
          .soft(comment, `Expected key "${key}" should be in object`)
          .toHaveProperty(key);
      });
    });
  });
  test('GET comments should return an object with required fields @predefined_data', async ({
    request,
  }) => {
    // Arrange
    const commentsUrl = '/api/comments';
    const response = await request.get(commentsUrl);
    await test.step('GET comments returns status code 200', async () => {
      const expectedStatusCode = 200;
      expect(response.status()).toBe(expectedStatusCode);
    });
    const responseJson = await response.json();
    await test.step('GET comments should return at least one comment', async () => {
      const expectedMinArticlesCount = 1;
      expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinArticlesCount,
      );
    });
    const expectedRequiredFields = [
      'id',
      'article_id',
      'user_id',
      'body',
      'date',
    ];
    const comment = responseJson[0];
    expectedRequiredFields.forEach(async (key) => {
      await test.step(`response object contains required field: "${key}"`, async () => {
        expect.soft(comment).toHaveProperty(key);
      });
    });
  });
});