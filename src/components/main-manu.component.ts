import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.pages';
import { Page } from '@playwright/test';

export class MainMenuComponent {
  constructor(private page: Page) {}

  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePageLink = this.page.getByRole('link', { name: 'GAD' });

  async clickCommentsButton():Promise<CommentsPage>{
    await this.commentsButton.click()

    return new CommentsPage(this.page)
  }

  async clickArticlesButton():Promise<ArticlesPage>{
    await this.articlesButton.click()

    return new ArticlesPage(this.page)
  }

  async clickHomeLink():Promise<HomePage>{
    await this.homePageLink.click()

    return new HomePage(this.page)
  }
}
