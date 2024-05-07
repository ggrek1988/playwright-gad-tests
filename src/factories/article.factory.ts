import { AddArticleModel } from '@_src/models/articles.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomNewArticle(
  titleLenght?: number,
  bodyParagraphs = 5,
): AddArticleModel {
  let title: string;
  if (titleLenght) title = faker.string.alpha(titleLenght);
  else title = faker.lorem.sentence();

  const body = faker.lorem.paragraphs(bodyParagraphs);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
