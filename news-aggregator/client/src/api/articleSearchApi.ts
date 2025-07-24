import axios from "axios";

export class ArticleSearchApi {
  static async searchArticles(keyword: string) {
    await new Promise((res) => setTimeout(res, 100));
    return axios.post("http://localhost:4000/api/articles/search", { keyword });
  }
}
