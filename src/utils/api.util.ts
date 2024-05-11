import { prepareRandomNewArticle } from '@_src/factories/article.factory';
import { prepareRandomComment } from '@_src/factories/comments.factory';
import { testUser1 } from '@_src/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export const apiLinks = {
  articlesUrl: '/api/articles',
  commentsUrl: '/api/comments',
};

export interface Headers {
  [key: string]: string;
}
export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginUrl = '/api/login';
  const userData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };
  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();
  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}

export interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
}
export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomNewArticle();
  const articleData = {
    title: randomArticleData.title,
    body: randomArticleData.body,
    date: '2024-01-30T15:44:31Z',
    image:
      '.\\data\\images\\256\\tester-app_9f26eff6-2390-4460-8829-81a9cbe21751.jpg',
  };
  return articleData;
}

export interface CommentPayload {
  article_id: number;
  body: string;
  date: string;
}
export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomComment();
  const commentData = {
    article_id: articleId,
    body: randomCommentData.body,
    date: '2024-01-30T15:44:31Z',
  };
  return commentData;
}
