import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comments.factory';
import { AddArticleModel } from '@_src/models/articles.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    const articlesPage = new ArticlesPage(page);

    articleData = prepareRandomNewArticle();

    await articlesPage.goto();

    const addArticleView = await articlesPage.clickAddArticleButtomLogged();
    articlePage = await addArticleView.createArticle(articleData);
  });
  test('operate on comment @GAD-R05-01 @GAD-R05-02 @logged', async () => {
    //Arrange
    const newCommentData = prepareRandomComment();
    const editCommentData = prepareRandomComment();

    // Act
    await test.step('create new comment', async () => {
      // Arrange
      const expectedAddCommnetHeader = 'Add New Comment';
      const expectedCommentCreatePopup = 'Comment was created';

      // Act
      // await articlePage.addCommentButton.click();
      const addCommnetView = await articlePage.clickAddCommentButton();
      await expect(addCommnetView.addNewHeader).toHaveText(
        expectedAddCommnetHeader,
      );
      articlePage = await addCommnetView.CreateComment(newCommentData);

      // Assert
      await expect(articlePage.alertPopup).toHaveText(
        expectedCommentCreatePopup,
      );
    });

    let commentPage = await test.step('verify comment @logged', async () => {
      // Arrange
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      // await articleComment.link.click();
      const commentPage = await articlePage.clickCommentLink(articleComment);

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);

      return commentPage;
    });

    await test.step('update comment @logged', async () => {
      // Arrange
      const expectedCommentUpdatePopup = 'Comment was updated';

      // Act
      const editCommentView = await commentPage.clickEditButton();
      commentPage = await editCommentView.updateComment(editCommentData);

      // Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatePopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('veryfy update comment in article page @logged', async () => {
      // Act
      const articlePage = await commentPage.clickReturnLink();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );

      // Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
  });

  test('user can add more than one comment @GAD-R05-03 @logged', async () => {
    await test.step('create ferst comment', async () => {
      // Arrange
      const expectedCommentCreatePopup = 'Comment was created';
      const newCommentData = prepareRandomComment();

      // Act
      // const addCommnetView = await articlePage.clickAddCommentButton()
      // to tak samo jak bysmy zapisali:
      // const addCommnetView = new AddCommentView(page)
      // await articlePage.addCommentButton.click();
      const addCommnetView = await articlePage.clickAddCommentButton();
      articlePage = await addCommnetView.CreateComment(newCommentData);

      // Assert
      await expect(articlePage.alertPopup).toHaveText(
        expectedCommentCreatePopup,
      );
    });
    await test.step('create and veryfy second comment @logged', async () => {
      const secondCommentData = await test.step('create comment', async () => {
        const secondCommentData = prepareRandomComment();
        const addCommnetView = await articlePage.clickAddCommentButton();
        articlePage = await addCommnetView.CreateComment(secondCommentData);
        return secondCommentData;
      });

      await test.step('vefify comment', async () => {
        const articleComment = articlePage.getArticleComment(
          secondCommentData.body,
        );
        await expect(articleComment.body).toHaveText(secondCommentData.body);
        const commentPage = await articlePage.clickCommentLink(articleComment);

        await expect(commentPage.commentBody).toHaveText(
          secondCommentData.body,
        );
      });
    });
  });
});
