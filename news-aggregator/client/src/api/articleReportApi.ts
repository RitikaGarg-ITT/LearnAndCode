import axios from "axios";

export async function reportArticle(userId: number, articleId: number, reason: string) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/article-reports/report", {
    userId,
    articleId,
    reason,
  });
}
