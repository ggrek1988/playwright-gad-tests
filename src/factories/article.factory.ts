import { AddArticleModel } from '../models/articles.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(): AddArticleModel {
  // zmienna bazująca na interfejsie w article.model.ts
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(6);

  const newArticle:AddArticleModel= { title: title, body: body };

  return newArticle;
}
