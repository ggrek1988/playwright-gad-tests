import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-manu.component';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}
export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu = new MainMenuComponent(this.page);

  articleTittle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');
  deleteIcon = this.page.getByTestId('delete');

  addCommentButton = this.page.locator('#add-new');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }

  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      console.log('dialog is on!');
      await dialog.accept();
    });

    this.deleteIcon.click();
  }

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
