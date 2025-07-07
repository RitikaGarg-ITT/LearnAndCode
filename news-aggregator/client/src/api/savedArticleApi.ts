// api/savedArticleApi.ts
import axios from "axios";

export async function saveArticle(userId: number, articleId: number) {
  return axios.post("http://localhost:4000/api/saved-articles", { userId, articleId });
}

export async function fetchSavedArticles(userId: number) {
  return axios.get(`http://localhost:4000/api/saved-articles?userId=${userId}`);
}

export async function deleteSavedArticle(id: number) {
  return axios.delete(`http://localhost:4000/api/saved-articles/${id}`);
}
