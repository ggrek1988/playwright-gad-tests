import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comments.factory';
import { AddArticleModel } from '@_src/models/articles.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentPage } from '@_src/pages/comment.page';
import { AddArticleView } from '@_src/views/add-article.views';
import { AddCommentView } from '@_src/views/add-comment.views';
import { EditCommentView } from '@_src/views/edit-comment.views';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommnetView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommnetView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomNewArticle();

    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();
    await addArticleView.createArticle(articleData);
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
      await articlePage.addCommentButton.click();
      await expect(addCommnetView.addNewHeader).toHaveText(
        expectedAddCommnetHeader,
      );
      await addCommnetView.CreateComment(newCommentData);

      // Assert
      await expect(articlePage.alertPopup).toHaveText(
        expectedCommentCreatePopup,
      );
    });

    await test.step('verify comment @logged' , async () => {
      // Arrange
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    await test.step('update comment @logged', async () => {
      // Arrange
      const expectedCommentUpdatePopup = 'Comment was updated';

      // Act
      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);

      // Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatePopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });

    await test.step('veryfy update comment in article page @logged', async () => {
      // Act
      commentPage.returnLink.click();
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
      await articlePage.addCommentButton.click();
      await addCommnetView.CreateComment(newCommentData);

      // Assert
      await expect(articlePage.alertPopup).toHaveText(
        expectedCommentCreatePopup,
      );
    });
    await test.step('create and veryfy second comment @logged', async () => {
      const secondCommentData = await test.step('create comment', async () => {
        const secondCommentData = prepareRandomComment();
        await articlePage.addCommentButton.click();
        await addCommnetView.CreateComment(secondCommentData);
        return secondCommentData;
      });

      await test.step('vefify comment', async () => {
        const articleComment = articlePage.getArticleComment(
          secondCommentData.body,
        );
        await expect(articleComment.body).toHaveText(secondCommentData.body);
        await articleComment.link.click();

        await expect(commentPage.commentBody).toHaveText(
          secondCommentData.body,
        );
      });
    });
  });
});
