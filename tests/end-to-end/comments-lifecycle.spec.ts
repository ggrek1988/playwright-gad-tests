import { prepareRandomNewArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/articles.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.views';
import { AddCommentView } from '../../src/views/add-comment.views';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let commnetView: AddCommentView;
  let commentPage: CommentPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    commnetView = new AddCommentView(page);
    commentPage = new CommentPage(page)

    articleData = prepareRandomNewArticle();

    await loginPage.goto();
    await loginPage.loginNew(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtomLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test('create new comment @GAD-R05-01', async ({ page }) => {
    //Arrange
    const expectedAddCommnetHeader = 'Add New Comment';
    const expectedCommentCreatePopup = 'Comment was created';
    const commentText = 'hello!';

    // Act
    await articlePage.addCommentButton.click();
    await expect(commnetView.addNewHeader).toHaveText(expectedAddCommnetHeader);
    await commnetView.bodyInput.fill(commentText);
    await commnetView.saveButton.click();

    // Assert
    await expect(articlePage.alertPopup).toHaveText(expectedCommentCreatePopup);

    // Act
    const articleComment = articlePage.getArticleComment(commentText)
    
    // Assert
    await expect(articleComment.body).toHaveText(commentText)

    // Act
    await articleComment.link.click()

    // Assert
    await expect(commentPage.commentBody).toHaveText(commentText)
  });
});
