import { MainMenuComponent } from '../components/main-manu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu = new MainMenuComponent(this.page);

  articleTittle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');
  deleteIcon = this.page.getByTestId('delete');

  addCommentButton = this.page.locator('#add-new')
  alertPopup = this.page.getByTestId('alert-popup')
  

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

}
