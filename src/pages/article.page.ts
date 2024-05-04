import { MainMenuComponent } from '../components/main-manu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu = new MainMenuComponent(this.page);

  articleTittle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');

  constructor(page: Page) {
    super(page);
  }

  

}
