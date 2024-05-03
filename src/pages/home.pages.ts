import { Page } from '@playwright/test';

export class HomePage {
  url = '/';
  constructor(private page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    await this.page.waitForLoadState();
    return await this.page.title();
  }
}
