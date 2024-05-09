import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { pageObjectTest } from '@_src/fixtures/page-object.fixtures';
import { AddArticleModel } from '@_src/models/articles.model';
import { ArticlePage } from '@_src/pages/article.page';

interface ArticleCreationContext {
  articlePage: ArticlePage;
  articleData: AddArticleModel;
}
interface ArticleFixtures {
  createRandomArticle: ArticleCreationContext;
}
// konstrukcja do fixtures extend class
export const articleTest = pageObjectTest.extend<ArticleFixtures>({
  createRandomArticle: async ({ addArticleView }, use) => {
    const articleData = prepareRandomNewArticle();
    const articlePage = await addArticleView.createArticle(articleData);
    await use({ articlePage, articleData });
  },
});
