import { Page } from '@playwright/test';

export class BasePage {
  url = '';
  constructor(protected page: Page) {
    this.page = page;
  }

  async goto(parametrs = ''): Promise<void> {
    await this.page.goto(`${this.url}${parametrs}`);
  }

  async getTitle(): Promise<string> {
    await this.page.waitForLoadState();
    return await this.page.title();
  }

  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(`${this.url}*`);
  }
}
