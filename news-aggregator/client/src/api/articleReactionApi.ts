import axios from "axios";

export async function likeArticle(userId: number, articleId: number) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/article-reactions/like", { userId, articleId });
}

export async function dislikeArticle(userId: number, articleId: number) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/article-reactions/dislike", { userId, articleId });
}
