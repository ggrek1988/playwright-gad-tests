import { prepareRandomNewArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comments.factory';
import { AddArticleModel } from '../../src/models/articles.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.views';
import { AddCommentView } from '../../src/views/add-comment.views';
import { EditCommentView } from '../../src/views/edit-comment.views';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommnetView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommnetView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = prepareRandomNewArticle();

    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test('operate on comment @GAD-R05-01 @GAD-R05-02', async () => {
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

    await test.step('verify comment', async () => {
      // Arrange
      // Act
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      // Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    await test.step('update comment', async () => {
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

    await test.step('veryfy update comment in article page', async () => {
      // Act
      commentPage.returnLink.click();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );

      // Assert
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
  });

  test('user can add more than one comment @GAD-R05-03', async () => {
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
    await test.step('create and veryfy second comment', async () => {
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
