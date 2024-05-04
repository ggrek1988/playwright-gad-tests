import { MainMenuComponent } from '../components/main-manu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtomLogged = this.page.locator('#add-new');
  constructor(page: Page) {
    super(page);
  }

  async goToArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }
}
