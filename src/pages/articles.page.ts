import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-manu.component';
import { ArticlePage } from '@_src/pages/article.page';
import { AddArticleView } from '@_src/views/add-article.views';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  addArticleButtomLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  goSearchButton = this.page.getByTestId('search-button');
  noResultText = this.page.getByTestId('no-results');

  constructor(page: Page) {
    super(page);
  }

  async goToArticle(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();
    return new ArticlePage(this.page)
  }

  async searchArticle(phrase: string): Promise<ArticlesPage> {
    await this.searchInput.fill(phrase);
    await this.goSearchButton.click();

    // this dlatego ze zwracamy klase w której znajduje sie metoda, tnz ArticlesPage 
    return this
  }

  async clickAddArticleButtomLogged():Promise<AddArticleView>{
    await this.addArticleButtomLogged.click()
    return new AddArticleView(this.page)
  }
}
